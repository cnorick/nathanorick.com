---
title: Halloween Candy Machine
subtitle: A hardware project
date: 2022-10-30
tags: [project, hardware, python]
description: A machine I created to dispense candy to trick-or-treaters
image: assets/img/halloween-machine.jpg
exclude_from_homepage: true
published: true
---

I created a machine to dispense Halloween candy to trick-or-treaters. When you walk up to the machine, you're presented with a spinner on screen and a big, red, glowing, physical button to spin the wheel. Then, given a random distribution based on the amount of candy and the expected number of trick-or-treaters, you will receive prizes of varying sizes from a single mini snickers to a full-sized candy bar.

The entire system is run on a Raspberry PI 4. The software is written in python and uses the [pygame library](https://www.pygame.org) to operate the spinner on screen. After the user presses the button and the prize is selected, and array of stepper motors spin fans mounted in front of PVC pipes to dispense the prize.

Click below to see a video of the machine in action, or to read more about how it works.

<div class="link-row">
  <a href="https://www.youtube.com/shorts/fchGsu-fy-E">Video</a>
  <a href="{% post_url how-i-built-my-halloween-candy-machine/2022-10-30-how-i-built-my-halloween-candy-machine %}">Blog Post</a>
</div>