---
title: How I Built My Halloween Candy Machine
tags:
 - [game, hardware, python]
description: I made a machine for dispensing candy to trick-or-treaters this Halloween
image:
published: false
---

Our neighborhood is very popular on Halloween. Last year, we found ourselves completely under-prepared when we ran out of candy within an hour. Of course, we couldn't stay at our house and face trick-or-treaters with no candy, so we decided to go for a walk.

At the time, we were still living in a pandemic, so one thing I saw a lot of was people sitting on their porches dropping candy to kids through PVC pipes. This sparked an idea for me: what if I automated that whole process? A year later, I finished this machine to do just that.

# The Hardware
As a software developer, the hardest part of this whole thing was the physical components, and not just the circuitry. The real challenge was to design a physical mechanism to consistently deliver the same amount of candy.

## Delivery Mechanism
For months, I pursued and idea that just didn't work out ([read more about it below](TODO:)).
Then right as I was about to give up for good, my wife gave me a great suggestion: use a fan. The idea is straight-forward. Load candy into a PVC pipe mounted at an angle and block the end with a fan blade that is moved by a motor. This is my first 3D-printed fan design in action:
![Gif of fan running to distribute candy](fan.gif)

{% include picture.html relative_path="fan-diagram.jpg" alt="Whiteboard drawing of the dimensions of the fan. It includes measurements in inches and degrees" preload=true%}

It was also important to get the angle of the PVC pipes just right. If they were too low, the candy couldn't overcome friction to slide past the fan, but if it was too high, too many pieces of candy would fall at once.
To speed up the process of finding the correct angle as well as to allow for adjustments in the future, I bought a pack of adjustable furniture feet on Amazon. I was able to mount the pipes on these feet, then adjust the heights of the pipes by turning a screw.
{% include picture.html relative_path="furniture-leg.jpg" alt="PVC pipe mounted on the furniture feet. The foot is glued to the side of the pipe with an extendible base extending downward. There is an allen wrench in the leg" %}

## Motors and Circuits
The entire system runs on a Raspberry PI 4. There are five main components:
1. The monitor -- just connected to the rpi via HDMI
1. The button -- a switch connected to a single GPIO input pin and a PWM light connected to a GPIO output
1. The motors -- four (only three are used) stepper motors connected to drivers connected to GPIO on the rpi
1. The microswitches -- Attached to each fan to determine the fan's position; attached to GPIO inputs
1. The speaker -- a small horn speaker connected to an amplifier on a separate power source connected to the rpi 3.5mm pin

## Button
I found this button on [adafruit](https://www.adafruit.com/product/1185) and it's fantastic. It was super simple to wire up, and I think it really catches the eye when you first look at the machine

## Motors / Microswitches
The hard thing about stepper motors is you have no way of knowing what position they are in at any given time. You can control how far they spin and keep track of the angle that way, but if something blocks them from spinning,
your number will be off.

To fix this, I redesigned my fan to have bumps on it and mounted a microswitch under the fan. Now, when the fan spins, the bumps activate the microswitch, telling the Raspberry PI when one of the blades is blocking the pipe.
![Gif of fan running and activating the microswitch mounted under it](microswitch.gif)

## Hardware Circuit
I'm certainly not a expert at circuit design, but this project was complicated enough that I drew up a simple diagram before I soldered everything together on a perfboard.
{% include picture.html relative_path="circuit-diagram.jpg" alt="A circuit diagram including the button, the motors, and the rpi" %}

{% include picture.html relative_path="hand-drawn-circuit.jpg" alt="A hand-drawn circuit diagram to help lay the circuit out on the perfboard" %}

{% include picture.html relative_path="perfboard.jpg" alt="The finished perfboard" %}

After finishing the perfboard and testing all of the hardware, I created a stand out of scrap wood, mounted the monitor to the stand, then hid all off the electronics behind the monitor.
{% include picture.html relative_path="mounted-hardware.jpg" alt="The jumble of wires and electronics glued to the back of a monitor that is mounted on a wooden stand" %}

# Software
Now, this part came much more naturally to me. As I was originally researching for the project, I found out that Raspberry Pis have pygame already installed for game development. Admittedly, there's not much "game" to the machine.
But I did need a way to control the screen, and pygame's api was pretty straight-forward.

TODO: publish code

# Finishing Touches
After a ton of testing and tweaking, I set out to make the thing look a little prettier. I mounted both the monitor stand and the PVC holder to a single piece of plywood, then started cutting some cardboard.
I created a facade with a cut-out for the screen and the button to hide all of the internals. Then, I started painting everything black.
{% include picture.html relative_path="facade.jpg" alt="The front of the machine covered with a black piece of cardboard with cutouts for the button and the screen" %}

With the facade finished, I made a small wooden frame for the back, and covered everything else up with black fabric, leaving myself a flap to open if something were to go wrong with the hardware on Halloween night.
{% include picture.html relative_path="fabric.jpg" alt="The facade has now been removed, and the rest of the machine is covered with black fabric" %}

# Resources
- TODO: diagrams, 3d files, image gallery?