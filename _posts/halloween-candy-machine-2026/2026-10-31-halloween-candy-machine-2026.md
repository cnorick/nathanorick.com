---
title: The Candy Machine Goes Full Arcade (2026 Update)
tags:
  - game
  - hardware
  - python
  - home assistant
description: Five years in, the Halloween candy machine now features five different games, a fog machine, a second screen for the line, Home Assistant operator dashboards, and Monte Carlo simulations.
image: new_sign_2026.jpg
published: true
---

We're now in year five of the Halloween candy machine! Every October, I think I'm just going to pull it out of storage, dust it off, and plug it in. And every October, I end up spending weeks adding completely unnecessary features to it.

If you haven't seen the machine before, the short version is: a trick-or-treater walks up, hits a big glowing arcade button, plays a game on screen, and a weight-based hopper/dropper contraption inside dumps that exact amount of candy down a chute into their bucket.

{% include picture.html relative_path="booth_setup_2026.jpg" alt="The 2026 candy machine booth under a tent covered in glowing green cobwebs" %}

<div class="alert alert-primary">
  <b>Previous Updates</b>
  <br/>
  This is the third post in the candy machine series. Check out the older posts to see how it started and how the internals work:
  <ul>
    <li>{% include post_link.html postId="/how-i-built-my-halloween-candy-machine" %} (2022)</li>
    <li>{% include post_link.html postId="/updated-halloween-candy-machine" %} (2025)</li>
  </ul>
</div>

In past years, the machine only had one game (a classic spinning wheel), the crowd waiting in the driveway couldn't see what was happening up at the booth, and I still had to hover nearby in case the candy jammed or ran low. This year, I went all-in on turning the whole porch into an arcade and making the machine smart enough to run itself.

I also got some awesome help with the art this year! Huge shoutout to [Sarah Nelson](https://www.facebook.com/share/1C9isFQJfH/?mibextid=wwXIfr) for building our new physical "Spin to Win" sign above the machine—it looks so much cleaner than my old hand-painted cardboard sign from 2022:

{% include picture.html relative_path="new_sign_2026.jpg" alt="Close-up of the candy machine featuring the new Happy Halloween Spin to Win sign built by Sarah Nelson" %}

And another huge shoutout to my good friend [Jacob Allen](https://www.linkedin.com/in/jacobscottallen) for designing the new Candy Corn Spinner! It's so much easier to understand at a glance compared to our old legacy spinner, which was way too complicated to read quickly while the wheel was spinning.

Here are the highlights of what else is new for 2026.

-----

# 1. Five New Game Modes (Plus Subwoofers!)

For the first four years, every trick-or-treater saw the exact same spinning wheel. Repeat visitors knew the routine by heart, so this year I refactored the display code so I could hot-swap between five different reveal games on the fly—either with a keyboard shortcut or right from my phone.

I also added a subwoofer inside the cabinet with a dedicated low-frequency haptic audio pipeline. Now, when kids rest their hands on the console and hit the button, they physically feel the machine cranking up, the reels clunking into place, and a deep sub-bass rumble when they hit a jackpot.

## Candy Corn Spinner

This is the new flagship game for 2026 that Jacob designed. It's a 4-slice potion wheel shaped like a giant piece of candy corn, surrounded by chasing marquee bulbs.

{% include picture.html relative_path="candycorn_jackpot_thumb.png" alt="Candy Corn Spinner breaking at the top and swinging down like a pendulum" %}

Because the prize weight is already weighed out before you press the button, the game knows ahead of time where the needle needs to land—which let me program in some fun fakeouts.

My favorite is the **"Broken Motor" gag** when someone rolls the smallest prize (`xxxs`). The needle slowly crawls up toward the top jackpot as the suspense music peaks, freezes at the top for a split second, and then "breaks" with a loud metallic snap. The needle goes limp like an unpowered pendulum, swinging back and forth until it settles at the very bottom on the tiny prize while a crowd-groan sound effect plays:

{% include picture.html relative_path="candycorn_broken_motor_gag.gif" alt="Candy Corn Spinner breaking at the top and swinging down like a pendulum" %}

Even better: if you *actually* win the top jackpot, there's a 25% chance of a **double-fakeout**. It does the exact same broken-motor drop, swings all the way through the bottom, and carries just enough momentum up the other side to snap back into the jackpot slot at the top!

{% include picture.html relative_path="candycorn_jackpot.gif" alt="Candy Corn Spinner landing on the 100g jackpot" %}

## Pumpkin Plinko

Who doesn't love Plinko? Since the winning bin at the bottom is predetermined by the candy already sitting on the scale, the game solves the physics path backward so the pumpkin bounces off the pegs, plays little acoustic peg-clacks on every hit, and stages a few near-misses before dropping into the right slot.

{% include picture.html relative_path="pumpkin_plinko.gif" alt="Pumpkin Plinko bouncing down the pegboard into the jackpot bin" %}

## Haunted Slot Machine

A three-reel gothic slot machine. The first two reels lock in with a heavy mechanical thud, and if you're rolling for a jackpot (or a tease), the background music ducks out and the third reel spins extra long with a rising suspense tone before slamming into place.

{% include picture.html relative_path="haunted_slot_machine.gif" alt="Haunted Slot Machine locking in three pumpkins" %}

## Occult Tarot Cards of Fate

Eight tarot cards laid out on an altar with a glowing pendulum gliding back and forth over them. When you hit the button, the pendulum snaps onto a card with an electric crack, and the card levitates and flips over in 3D to reveal your prize.

{% include picture.html relative_path="occult_tarot_cards.gif" alt="Occult Tarot Cards flipping over a chosen card" %}

## The Classic Wheel

And of course, I kept the original 360-degree spinning wheel around for nostalgia—complete with a candy rain celebration at the end.

{% include picture.html relative_path="classic_wheel.gif" alt="The classic prize wheel spinning and raining candy" %}

-----

# 2. A Second Screen for the Line

As I mentioned in my {% include post_link.html postId="/updated-halloween-candy-machine" %}, our line gets *long* on Halloween night. The problem is that when you're standing 20 feet back in the driveway, you can't see the screen on the machine to know what people are winning.

To fix that, I dug up an old 5th-gen Amazon Fire 7 tablet I had laying around and enlisted a plastic skeleton along the walkway railing to hold it up facing the line. Because that tablet is ancient, I wrote a lightweight web app in plain old ES5 Javascript and CSS that connects to the main Raspberry Pi over Server-Sent Events (SSE).

{% include picture.html relative_path="skeleton_line_tablet.jpg" alt="A plastic skeleton standing by the walkway steps holding up the Amazon Fire 7 tablet displaying a QR code for the line" %}

While people wait in line, the tablet cycles through:
- **Live stats**: Total pounds of candy dispensed so far and total trick-or-treaters served.
- **How to play**: A quick 3-step guide so kids know what to do before they walk up.
- **Behind the scenes**: A QR code for curious parents that links right to this blog.

The best part is that because it's hooked up via SSE, the tablet reacts in real time (under 10ms) to what's happening at the machine. When someone up front hits a jackpot, the line tablet flashes with screen-shaking lightning bolts and announces the win to the whole driveway. Every once in a while, it also throws up a spooky SVG jumpscare just to keep the line on their toes.

-----

# 3. Fog Machine & Porch Lights

Why stop at the cabinet when you can automate the whole porch?

This year I hooked a ground fog machine (with a chiller so the fog stays low to the ground) and our Govee roof eave lights into the game via Home Assistant.

- **Ambient puffs**: Every 60 seconds while the machine is idle, the fog machine fires a quick 1.5-second puff to keep a layer of mist rolling across the porch.
- **Button anticipation blast**: Remember how the machine already knows what you won the moment you press the button? If it sees that you're about to hit a huge jackpot (or the broken-motor gag), it immediately fires a 3-second blast of fog *before the wheel even finishes spinning*, covering your feet in mist right as the suspense audio builds.
- **Synchronized eave lights**: Alongside the NeoPixel strips on the cabinet itself, the house eave lights dim down to an eerie purple during suspense moments, strobe white like lightning on big wins, and cascade rainbow waves while the candy dumps down the chute.

-----

# 4. Operationalizing with Home Assistant

In previous years, I had to babysit the machine pretty closely from a camp chair behind the curtain. If fun-size candy bars formed a bridge inside the bucket, or if the hopper ran completely dry, I wouldn't know until a kid pressed the button and nothing came out.

{% include picture.html relative_path="behind_the_curtain_2026.jpg" alt="Behind the curtain inside the candy machine tent showing the blue hopper bucket, wooden frame, electronics, and an empty camp chair" %}

This year, I exposed the whole machine to **Home Assistant over MQTT** (using MQTT auto-discovery) and built a dedicated "Candy Booth" operations dashboard for my phone.

Now, while I'm hanging out in the driveway talking to neighbors, I can pull up Home Assistant to see:
- **Candy Remaining**: How many pounds are left in the evening budget.
- **Projected Runout Time**: Based on the current pace of trick-or-treaters, the exact clock time we're projected to run out of candy.
- **Dispense Accuracy & Prep Times**: How long the hopper is taking to weigh out each prize and its average error percentage.
- **Live Overrides**: Buttons to switch the active game mode on the fly, trigger a manual fog blast, tare the scale, run an unclog cycle, or force-dispense candy—all without touching the wireless keyboard.

I also set up **push and SMS alerts**. If a single hopper prep cycle takes longer than 15 seconds, my phone gets a `Hopper Warning` notification that candy is starting to bridge so I can give the bucket a quick stir before the next kid walks up. And if it actually runs out of candy, the screen switches to a friendly frowny-face pumpkin ("taking a short restock nap") and texts me to come refill the bucket.

-----

# 5. Monte Carlo Simulations & Tuning the Dropper

Two of the biggest headaches with a weight-based candy machine are:
1. Making sure you don't run out of candy at 7:30 PM while kids are still lined up down the block (or end the night with 20 pounds left over).
2. Getting an auger in a bucket of irregularly shaped candy bars to quickly and accurately drop *just* enough candy to hit a target weight without jamming or causing an avalanche.

Instead of guessing at prize odds or testing motor speeds by hand on Halloween afternoon, I built an experimentation suite to do the math for me.

## Monte Carlo Prize Budgeting

To dial in the prize distribution, I wrote a script that runs **Monte Carlo simulations** of Halloween night. Given our total candy inventory and expected foot traffic, it simulates thousands of Halloweens across different probability profiles (`default`, `balanced_9pm`, `conservative_9pm`, and `aggressive`) and spits out burn-down charts showing when we'll run out of candy. If it's a busy year, I can flip to a more conservative profile so every kid still gets a good handful of candy and the bucket lasts right until 9:00 PM.

## Dropper Tournament & Precision Metering

On the hardware side, candy isn't a continuous fluid—a single fun-size chocolate bar weighs around 18–22 grams, and they love to wedge themselves against the hopper wall.

To figure out the best motor programming for the ESP32 controller, I built a calibration harness that runs automated tournaments between different stepper motor pulse profiles across all eight prize tiers, scoring them on speed and accuracy.

Coming out of those experiments, I completely rewrote the hopper firmware:
- **High-torque half-stepping & net-negative unclogs**: Switching the stepper motor to half-stepping gave it enough torque that jams dropped to **0%** across 500+ test cycles. And if candy ever does bridge up, the new unclog routine backs the motor up *more* than it steps forward, pulling the bridge apart without accidentally pushing an avalanche of candy over the ledge.
- **4-stage proportional metering**: When the scale is far from the target weight (>35g away), it uses fast, coarse strokes. As it gets closer, it shifts down through gentle strokes, creep mode, and finally a "nano-creep" trickle mode that nudges the turntable by just 1.7mm at a time to coax a single piece of candy off the ledge.
- **No more "phantom drops"**: We used to have a weird bug where a piece of candy would sit balanced on the very edge of the ledge after a vend, and vibrations from the next kid walking up would shake it loose into the chute early. Moving the motor's anti-binding relaxation retreat to the *start* of the next prep cycle (before taring the scale) solved it completely.

Between the tournament tuning and the new metering zones, our dispensing accuracy (landing within ±5g of the target) jumped from **~72% last year to 96.8% this year**.

-----

# Bonus: A Full Virtual Cabinet Simulator

One last quality-of-life upgrade for myself: testing code changes used to mean hauling the physical machine out or sitting on the floor next to the Raspberry Pi and ESP32s. This year, I built a `--cabinet` simulator mode in Pygame that mocks the entire hardware setup on my laptop—complete with virtual NeoPixel strips, 2D candy particle physics falling down the chute, and a simulated load cell bucket.

# Resources

As always, all the code, Home Assistant configs, and simulation scripts are open source:
- [Code on GitHub](https://github.com/cnorick/halloween_dispenser_public)
- {% include post_link.html postId="/how-i-built-my-halloween-candy-machine" %} (2022 Original Build)
- {% include post_link.html postId="/updated-halloween-candy-machine" %} (2025 Internal Redesign)
