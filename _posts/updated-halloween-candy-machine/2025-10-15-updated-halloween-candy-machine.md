---
title: What's Inside the Candy Machine
tags:
  - game
  - hardware
  - python
description: I made a machine for dispensing candy to trick-or-treaters for Halloween. Here are the updates over the last 3 years.
image: out-of-candy.jpg
gallery_folder: gallery
published: true
---

{% include video.html src="https://www.youtube.com/embed/FbSGkrY9YVs"%}

# We're SOOO Popular!

Since its debut in 2022, the candy wheel has been spun over **1200 times**, and then machine has given out nearly **200lbs of candy**! Our line gets so long on Halloween, I've started work on a second machine (if I can just find the time to finish it).

{% include picture.html relative_path="lines.jpg" alt="line on Halloween night" %}

Since the first year, I've made a lot of changes to the machine. Each year, I find new problems and try to make the machine as reliable as possible.

Since the last post, much of the machine has been redesigned. It now features a hopper mechanism that weighs out the candy before dispensing, and all of the electronics/mechanics have been modularized, allowing me to swap out broken parts in a blink.

[Skip to the gallery](#gallery) to see pictures and videos of the machine's innards, or read on for more details on how it all works.

<div class="alert alert-primary">
  <b>Note</b>
  <br/>
  This is an update on the machine I originally posted about in 2022. You can read the original post to see what version 1.0 of the candy machine looked liked.
  {% include post_link.html postId="/how-i-built-my-halloween-candy-machine" %}
</div>

-----

# New Delivery Mechanism

For the first couple years, the candy machine worked by dropping candy out of a PVC pipe with a rotating fan at the bottom, but there were multiple problems with that that design. It was really hard to get the timing of the fan just right to drop only one piece of candy, we could only have a couple different sizes of candies, and we had to constantly stand around and refill the pipes with candy.

{% include picture.html relative_path="fan.gif" alt="The Fan" %}

After year two, I finally got fed up with dealing with the PVC pipe design, so I turned to the Internet for inspiration.

I found a much better design from [Brankly](https://www.youtube.com/watch?v=NNeSOPg2tVk): a Lowes bucket that acts as a hopper and drops candy down a chute. Thankfully, Brankly made all of his 3D models open source, and I was able to copy the design verbatim and just 3D print the parts.

One thing that I wanted to change about his design, though, was that I wanted to dispense more than one piece of candy at a time. In fact, I needed my machine to dispense a wide variety of sizes of candy depending on the prize the trick-or-treater won. So building off Brankly's design, I also added another part to my machine which I called the dropper.

{% include picture.html relative_path="dropper.jpg" alt="The Dropper" %}

The dropper is simply a small bucket with one side cut out of it and attached at the bottom to a stepper motor. That whole contraption is then set on top of a scale. The hopper drops candy into the dropper which then reports back its current weight. When it's time for the candy to be dispensed, the motor attached to the dropper just turns the bucket over and dumps out the candy.

It didn't take a lot of work to start with Brankly's design, add the dropper, and write some new code to operate the whole thing as a unit.

# Weight-Based Game Logic

With the addition of the hopper and dropper, I was able to program much more precision into the system. Now, instead of just hoping that the right amount of candy gets dispensed, I can weigh out the precise amount that I want to give away.

Here are all the steps of the game logic:

1. [Choose A Prize](#1-choose-a-prize)
1. [Hopper Adds Candy to the Dropper](#2-hopper-adds-candy-to-the-dropper)
1. [Wait for the Button](#3-wait-for-the-button)
1. [Dump the Candy](#4-dump-the-candy)

## 1. Choose A Prize

Well before the person presses the button, the game logic randomly decides on one of eight prizes based on a preset distribution.

**Weight Distributions:**

Each year, I tweak the prize weights and the odds of winning any given prize based on how much candy I bought and how many trick-or-treaters we expect to have. That way, I make sure the candy lasts for the whole night and that every kid gets a good pile of candy after waiting so long in line.

Just for example, in 2024, we had 319 trick-or-treaters (lower than previous years), and these were our prize weights and odds of winning each:

| Prize | Weight | Odds |
| ----- | ------ | ---- |
| xxxs  | 10g    | 3%   |
| xxs   | 20g    | 20%  |
| xs    | 30g    | 15%  |
| sm    | 40g    | 20%  |
| md    | 50g    | 20%  |
| lg    | 60g    | 10%  |
| xl    | 70g    | 10%  |
| xxl   | 100g   | 5%   |

## 2. Hopper Adds Candy to the Dropper

{% include picture.html relative_path="bucket-spinning.gif" alt="Turntable at the bottom of the bucket" %}

Next, the hopper jumps into action, spinning the turntable in the bottom and dropping candy into the dropper. Every time the turntable moves, the dropper weighs how much candy is already in it and reports back to the controller.

- If the current weight is far from the target weight, the hopper spins faster
- If it's close to the target weight, the hopper spins very slowly, dropping only a few pieces at a time

{% include picture.html relative_path="candy-loading.gif" alt="Candy loading into the dropper" %}

## 3. Wait for the Button

Once the target weight is reached, the hopper stops, and the game waits for the button to be pressed. When the trick-or-treater finally presses the button, the wheel spins, but lands on the already-decided random prize. There is a little variance programmed in so that the wheel doesn't always land square in the middle of a segment, adding a little suspense when the wheel barely turns enough to make it into the next segment.

{% include picture.html relative_path="wheel-spinning.gif" alt="Wheel spinning on screen" %}

## 4. Dump the Candy

After the screen performs its little show, the light turns on in the chute so that the trick-or-treaters can be ready with their bucket. Finally, the dropper motor flips over the dropper bucket and dumps the candy down the chute and out to the waiting trick-or-treater.

The dropper shakes back and forth a couple times to make sure all the candy is out, then moves back into position. The whole process immediately starts over as the next prize is chosen and the candy is prepped in the dropper.

{% include picture.html relative_path="candy-dropping-inside.gif" alt="Candy getting dumped from the dropper" %}
<br/>
{% include picture.html relative_path="candy-dropping-outside.gif" alt="Candy getting dumped from the dropper - another view" %}

# Candy Prices

A fun little side-effect of this project is that I have a running spreadsheet of the price of candy each year (it's going up!). But in case you've ever wondered, Tootsie Rolls are the cheapest candy by weight (that I have found), plus it's a bonus that their size is really great for keeping the bucket unclogged when mixed in with bigger candy.

For those interested in tracking candy prices, here is my [candy price spreadsheet](https://docs.google.com/spreadsheets/d/1Q2SJouzUs1yUfimDHbYZHr0RAJ5kKu-y-w4hNrqS_fI/edit?usp=sharing).

# Modular Design

Another thing I learned after the first year: _don't solder everything to one control board!_ Right after Halloween, I started taking the machine apart and realized I had to desolder nearly every connection to add the new bucket.

This time around, I have multiple microcontrollers connected to the main Raspberry Pi via USB. This is actually one of things I'm proudest of on this new build! The hopper/dropper combo has it's own little programming language that is sent over a serial connection from the main controller. The hopper microcontroller can parse the command, and perform all the actions necessary.

## The Hopper/Dropper Controller

Where the main game controller is written in Python and runs on a Raspberry Pi, this module is powered by an ESP32 and written in C++. The setup function empties the dropper and tares the scale, and the main loop listens for messages coming through the serial bus and responds accordingly. The game controller can then send a few basic commands:

1. Prep `x` grams of candy, or
2. Dispense what is currently prepped

The module also supports some debugging commands like:

1. Tare the scale
2. Unclog the hopper
3. Get current weight
4. Set scale for voltage divider measurement, or
5. Run custom hopper command

\#5 is particularly useful for fine-tuning how fast or slowly the hopper spins its turntable. I'm able to connect to the controller directly from my laptop and send hopper commands with different stepper speeds, microsteps, pauses, direction changes, etc. Then, I can observe as I work to the particular movements just right.

## LED controller

This one is also on an ESP32, but instead of programming it directly, I used [ESPHome](https://esphome.io/) (which is a game-changer for the smart home, btw) to quickly configure some scenes with my string LEDs on the front of the machine.

The game controller sends commands to this module to sync the lights with the game sounds and player actions.

## Final Thoughts

As we get the machine ready for its fourth Halloween, I'm proud of how far it has come in that time! I look forward to seeing how excited all the neighborhood kids are when the candy drops magically into their buckets, and I'm excited for getting to make even more modifications next year!

# Resources

- [Code on Github](https://github.com/cnorick/halloween_dispenser_public)
- [Brankly's video that inspired me](https://www.youtube.com/watch?v=NNeSOPg2tVk)
- [Candy Prices Spreadsheet](https://docs.google.com/spreadsheets/d/1Q2SJouzUs1yUfimDHbYZHr0RAJ5kKu-y-w4hNrqS_fI/edit?usp=sharing)

{% include gallery.html relative_folder=page.gallery_folder %}
