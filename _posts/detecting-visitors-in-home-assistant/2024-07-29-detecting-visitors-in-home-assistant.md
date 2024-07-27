---
title: "Detecting Visitors with Home Assistant by Counting Devices on the Guest Network"
tags:
 - home assistant
 - visitors
 - smart home
 - raspberry pi
description: How I use Guest Networks, a Raspberry Pi, and MQTT to enable Visitor Mode in Home Assistant
image: device-page.png
published: true
---

My Home Assistant instance has grown pretty complex over the years. Many of the automations that run regularly are great when it's just my wife and me, but they are less than perfect when people are visiting. I created a `Visitor Mode` `input_boolean` to turn off automations unfriendly to visitors, but up until now, it's been hard to remember to turn that on when someone comes over.

Now, my guests just have to join the WiFi network and Home Assistant can automatically turn on `Visitor Mode`.

**tldr;** I created a custom service on a Raspberry Pi to query my router and get a count of devices connected to the guest network. The service publishes the count to an MQTT topic that Home Assistant can read, then Home Assistant can run automations based on that count. Only guests use the guest network. All my devices are on a separate one.

## Historical Solutions

I've attempted to handle automatic guest mode in many different ways in the past. All of which have fallen short in one way or another.

### Known MACs

My first solution to the visitor problem was pretty straightforward. I used Home Assistant's [Device Tracker](https://www.home-assistant.io/integrations/device_tracker/) along with my router to see if any "Known Visitors" were online. I kept a list `Device Tracker`s made with friends devices' MAC address that I pulled from my router once they logged in the first time. Then, any time one my friends joined the wifi network, their `Device Tracker` changed location, and `Visitor Mode` was activated in HA.

Unfortunately for me (but fortunately for peoples' privacy), iOS 14 turned on [MAC address randomization by default](https://en.wikipedia.org/wiki/IOS_14#Wi-Fi_MAC_address_randomization) in 2020. This caused my friends' phones to provide the router a brand new MAC address every time they joined the network. This solution no longer worked.

### Visitor Events on Google Calendar

I've also added my Google Calendar to Home Assistant, and in the past, I've added special calendar events when I knew visitors were coming over. But the problem with this is that I don't always know ahead of time when people are visiting or remember to add to the calendar at all. It has the same manual intervention problem as finding and flipping the `Visitor Mode` switch.

### Automatic Guest Login

I actually still use this solution along with my new one. I wrote a blog post about it a while back: {% include post_link.html postId="/ha-automatic-guest-login" %}. The post goes into much more detail, but in summary, the benefit that it has over the new solution is that it also logs the guest into Home Assistant so that they can access things they need like public lights or the thermostat.

## How it Works

Now, I have a new MQTT sensor that tells me the number of guests at my house.

{% include picture.html relative_path="device-page.png" alt="Device Page" %}

Basically here is the flow for knowing that I have guests at my house:

1. Guests log in to a special WiFi SSID that is only for guests (none my devices use this network)
2. The `Omada-Checker` service running on a Raspberry Pi polls my [Omada Software Controller](https://www.tp-link.com/us/support/download/omada-software-controller/) API for the number of devices on the guest network
3. The `Omada-Checker` service updates an MQTT topic with the new number of guests
4. A Home Assistant automation sees that number change, and sends a notification to my wife and me
5. We have the option to click an [actionable notification](https://companion.home-assistant.io/docs/notifications/actionable-notifications/) to turn on `Visitor Mode` (sometimes if someone drops by for just a second, we don't want it to turn on automatically)
6. When the person leaves, we get another notification that the guest count has dropped back to zero along with another actionable notification to turn of `Visitor Mode`

There, of course, is the (mostly boilerplate) MQTT client code as well as the Omada client code, but the main business logic is simply this:

```javascript
async function getData() {
  const clients = await omada.getAllClients(siteId);
  const numGuests = clients.filter((c) => c.ssid === guestSsidName).length;
  return { numGuests };
}
```

## Get the Code

Most people probably don't use Omada in their home network, but many other routers/access points expose similar APIs that can be used. I've published the [Omada-Checker code to Github](https://github.com/cnorick/omada-guest-network-checker) for others to copy or to get ideas from. At the least, the MQTT code would be pretty easily reusable.