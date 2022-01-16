---
title: Get RxJS Updates Every Time an Object's Properties Change
tags: [rxjs, typescript, javascript, rxjs operator]
description: How to get notified every time a Javascript object's properties change.
image: sample-use.png
---

RxJS comes packed with tons of operators that make developers' lives easier, but sometimes they just don't have exactly the right tool for the job.

That happened to be just the case for me recently. The code I was working in was creating an object and immediately handing it off to another part of the application that was responsible for manipulating
that object. A new feature I was adding required that I make the code that was creating the object respond to changes that were being made by the object-manipulator that it handed that object off to.
That's fine and dandy, except for two problems:
1. The manipulators were manipulating the object's properties in place
2. I didn't have control over those bits of code, and their API had no way to let me know when they were changing that object.

Now, you may be saying, "There
are much more maintainable ways to handle this problem," and you'd be right. Of course, one of the most obvious ways to fix this is make the object immutable
and have the object manipulators give me a brand new, updated object every time they make a change. I would have done exactly this if only I could update the APIs of
those things manipulating the object.

Another, slightly more naive, way to do this is to just continually poll the object properties on a timer, and respond  to changes when I pick them up. The problem with this
is that it's a polling operation, and not very efficient. It either over-checks the object's properties when they're not changing, or it reports too slowly when the object's
properties are changing a lot.

So the question is this: how can we keep track of when an object's properties change without 1. having control over the changer of the properties, or 2. having to poll the object?

# ObserveObject
I created a new creational Observable operator called `observeObject` that does exactly what you'd expect it to do. It takes an object as its parameter, and returns an Observable
that emits the object's current value every time that object's properties change. Following is an example of how you can use it:

```typescript
const sharedObject = { foo: { bar: 'baz' } };
const [observedObject, observedObjectChange$] = observeObject(sharedObject);

// Log every time the object changes.
observedObjectChange$.subscribe(changes => console.log(changes));

observedObject.foo.bar = 'qux'; // Logs: { foo: { bar: 'qux' } }
observedObject.a = 'b'; // Logs: { a: 'b', foo: { bar: 'qux' } }
delete observedObject.foo; // Logs: { a: 'b' };
observedObject.a = { b: 'c' }; // Logs: { a: { b: 'c' } }
```

# How it Works
If you're the kind of person who'd rather look at the code instead of read about it, check out the [stackblitz](https://stackblitz.com/edit/rxjs-observed-object?devtoolsheight=33&file=observe-object.ts).
Otherwise, read on for a more in-depth explanation.

## Proxy Object
`observeObject` hinges on the Javascript `Proxy` object. Proxy is basically just a way to change the how a Javascript `Object`'s internals work. You can re-define most of the operations for an object.
Specifically for us, we're able to intercept property setters and do some extra work before actually setting the property value. If you're not already familiar with Proxy, I would highly recommend 
[reading up on it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), because you can do so many cool things with it!

## Our Proxy
Let's start with the meat of the implementation. We're going to create a Proxy object that will be used to intercept property setters, and fire an Observable every time that happens.

Here's the skeleton for any Proxy:
```typescript
const proxy = new Proxy(target, {
  apply?(target: T, thisArg: any, argArray: any[]): any;
  construct?(target: T, argArray: any[], newTarget: Function): object;
  defineProperty?(target: T, p: string | symbol, attributes: PropertyDescriptor): boolean;
  deleteProperty?(target: T, p: string | symbol): boolean;
  get?(target: T, p: string | symbol, receiver: any): any;
  getOwnPropertyDescriptor?(target: T, p: string | symbol): PropertyDescriptor | undefined;
  getPrototypeOf?(target: T): object | null;
  has?(target: T, p: string | symbol): boolean;
  isExtensible?(target: T): boolean;
  ownKeys?(target: T): ArrayLike<string | symbol>;
  preventExtensions?(target: T): boolean;
  set?(target: T, p: string | symbol, value: any, receiver: any): boolean;
  setPrototypeOf?(target: T, v: object | null): boolean;
});
```

As you can see, you can override a ton of `Object` functionality. The only two things we care about here are `set` and `deleteProperty`. Those are the events that we need to emit to listeners to the observedObject.

### Set
Following is our set implementation. This method fires every time a property on our observed object is set, both initially and when its value is changed.
```typescript
...
set: (target, prop, value, receiver) => {
  // If property is changed TO an object.
  if (typeof value === 'object' && !propertySubscriptions.has(prop)) {
    value = observeChildObject(target, prop, value);
  }
  // If property is changed FROM an object.
  else if (typeof value !== 'object' && propertySubscriptions.has(prop)) {
    stopObservingChildObject(prop);
  }
  const returnVal = Reflect.set(target, prop, value, receiver);
  changes$.next(target);
  return returnVal;
}
...
```

First, let's talk about the parameters:
```typescript
set: (target, prop, value, receiver) => {
```
`target` is the object that we're setting a property on, `prop` is the name of the property we're setting,
and `value` is the value that we're setting the property to. We don't care so much about `receiver`, but you can check out the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)
to learn more about it if you like.

Now, we'll move on to the first `if` block, which will execute when a property is initially set to an instance of Object:
```typescript
if (typeof value === 'object' && !propertySubscriptions.has(prop)) {
  value = observeChildObject(target, prop, value);
}
```

What's happening here is actually pretty straightforward. As you can see, we check to see if the property is itself an object. If it is, we want to recursively observe it and all its properties,
so that we can notify listeners of changes no matter how deeply nested the object is.

After checking that we are indeed dealing with a child object, we then check to make sure that object has not already been observed (`propertySubscriptions` is a `Map` that keeps track of that for us).
If it has, we don't do anything. If it hasn't, we call a helper function, `observeChildObject`, that takes care of observing child objects. We'll look at it in more detail later.

`observeChildObject` returns us an observed version of the child object, and we assign that to the value parameter, which we will ultimately pass to the default `set` implementation later.

Next, let's look at the `else if` block that takes care of the case where the value of a property is changed from an object to something else:
```typescript
else if (typeof value !== 'object' && propertySubscriptions.has(prop)) {
  stopObservingChildObject(prop);
}
```

In this case, we use another helper function, `stopObservingChildObject`, that takes care of stopping the observation of child objects as well as removing those from our `propertySubscriptions` map.

We only call this function if the new value of the property is not an object, and its old value was an object (again, we can tell by looking at the `propertySubscriptions` map).

Finally, the last chunk of the `set` function:
```typescript
const returnVal = Reflect.set(target, prop, value, receiver);
changes$.next(target);
return returnVal;
```
Regardless of the type of the value, we need to call the default `set` implementation using `Reflect.set` so that the object property actually changes. Then, we also need to emit a change event for the object,
so that any listeners can react to the change.
We emit the updated `target` object after it's property has been set. Then, to stay consistent with the default `set` implementation, we just return the value given to us by `Reflect.set`.

### DeleteProperty
`deleteProperty` is simpler than the `set` function. For it, we just need to clean up any lingering children subscriptions when a property is deleted. Here's the implementation:
```typescript
deleteProperty: (target, prop) => {
  const returnVal = Reflect.deleteProperty(target, prop);
  if (propertySubscriptions.has(prop)) {
    stopObservingChildObject(prop);
  }
  changes$.next(proxy);
  return returnVal;
}
```
First, we call the default `deleteProperty` implementation using `Reflect.deleteProperty`. Then, we check to see if the property we're deleting is an object itself. If so, we call `stopObservingChildObject` to clean up any lingering subscriptions.
Regardless of the type of the property, we emit the updated target, and return the value of the default `deleteProperty` function.

### Helper Functions and Variables
```typescript
/// Variables
const changes$ = new Subject<T>();
const propertySubscriptions = new Map<PropertyKey, Subscription>();
```
`changes$` is simply a `Subject` that we use to emit any time our observed object changes. This is ultimately what listeners will subscribe to.

`propertySubscriptions` keeps track of subscriptions to the child objects we observe.

```typescript
const observeChildObject = <U extends {}>(
  target: T,
  prop: PropertyKey,
  childVal: U
): U => {
  const [childProxy, childChanges$] = observeObject(childVal);
  const sub = childChanges$.subscribe(childObj => changes$.next(target));
  propertySubscriptions.set(prop, sub);
  return childProxy;
};
```
`observeChildObject` does exactly what its name suggests. It takes in a child object, recursively calls `observeObject`, and sets up a subscription to the child object's `changes$` stream. Then, when that child
object emits a change, we re-emit a change on the top-level `changes$` stream. It also stores that subscription in the `propertySubscriptions` map so that we can unsubscribe from the child when the property is deleted
or set to another value.

```typescript
const stopObservingChildObject = prop => {
  propertySubscriptions.get(prop).unsubscribe();
  propertySubscriptions.delete(prop);
};
```
`stopObservingChildObject` is the counterpart to `observeChildObject`. We use it to unsubscribe from the child's `changes$` event as well as remove the subscription from the `propertySubscriptions` map.

### Initialization
The last thing to talk about for `observeObject` is how we initialize its `Proxy` object:
```typescript
const proxy = new Proxy({} as T, {
  ...
});

for (let key of Object.keys(obj)) {
  proxy[key] = obj[key];
}

return [proxy, changes$];
```

You'll notice we call the `Proxy` constructor with the empty object (`{}`) as the first argument. So really, we're not proxying the exiting object, but rather creating a new object that we can proxy.
Then, after redefining the property setter of the proxy, we loop through all the existing keys of the object we're going to observe, and set the property on the proxy like normal (`proxy[key] = obj[key]`). Underneath though, we're actually 
setting up the child observedObjects using our custom `set` method.

Finally, we return a tuple containing the proxy and the `changes$` stream so that consumers can send the object where it needs to go, while also being able to subscribe to the stream to get notified when the object changes.


# Full Implementation
```typescript
import { Subject, Observable, Subscription } from 'rxjs';

export function observeObject<T extends Object>(obj: T): [T, Observable<T>] {
  /// Variables
  const changes$ = new Subject<T>();
  const propertySubscriptions = new Map<PropertyKey, Subscription>();

  /// Helper Functions
  const observeChildObject = <U extends {}>(
    target: T,
    prop: PropertyKey,
    childVal: U
  ): U => {
    const [childProxy, childChanges$] = observeObject(childVal);
    const sub = childChanges$.subscribe(childObj => changes$.next(target));
    propertySubscriptions.set(prop, sub);
    return childProxy;
  };
  const stopObservingChildObject = prop => {
    propertySubscriptions.get(prop).unsubscribe();
    propertySubscriptions.delete(prop);
  };

  /// Proxy Creation
  const proxy = new Proxy({} as T, {
    set: (target, prop, value, receiver) => {
      // If property is changed TO an object.
      if (typeof value === 'object' && !propertySubscriptions.has(prop)) {
        value = observeChildObject(target, prop, value);
      }
      // If property is changed FROM an object.
      else if (typeof value !== 'object' && propertySubscriptions.has(prop)) {
        stopObservingChildObject(prop);
      }
      const returnVal = Reflect.set(target, prop, value, receiver);
      changes$.next(target);
      return returnVal;
    },
    deleteProperty: (target, prop) => {
      const returnVal = Reflect.deleteProperty(target, prop);
      if (propertySubscriptions.has(prop)) {
        stopObservingChildObject(prop);
      }
      changes$.next(proxy);
      return returnVal;
    }
  });

  /// Initialization
  for (let key of Object.keys(obj)) {
    proxy[key] = obj[key];
  }

  return [proxy, changes$];
}
```

# Conclusion and Stackblitz
With `observeObject`, I'm still able to let the object manipulators do what they need to with the object, while also getting notified every time they
make a change to the object's property.

<div class="link-row"><a href="https://stackblitz.com/edit/rxjs-observed-object">View on Stackblitz</a></div>
<br/>
<iframe style="width: 100%; height: 1000px" src="https://stackblitz.com/edit/rxjs-observed-object?devtoolsheight=33&embed=1&file=observe-object.ts"></iframe>

