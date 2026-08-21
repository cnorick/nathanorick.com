---
title: The Neighbours - Venice Biennale 2024
subtitle: IoT & Media Automation for an Art Installation
date: 2024-05-15
tags: [project, home assistant, hardware, python, iot, raspberry pi]
description: The orchestration layer and custom Raspberry Pi media streaming software for the Bulgarian Pavilion at the 60th Venice Art Biennale.
image: assets/img/the-neighbours.jpg
exclude_from_homepage: false
published: true
---

I engineered the physical tech orchestration layer and custom media streaming software for [*The Neighbours*](https://theneighbours.org/about), an interactive multimedia installation representing Bulgaria at the 60th International Art Exhibition – La Biennale di Venezia (2024). Created by artist-researchers Krasimira Butseva, Julian Chehirian, and Lilia Topouzova (curated by Vasil Elenov), the exhibition excavates silenced memories of survivors of state violence from Bulgaria's socialist era (1945–1989).

The installation spans three recreated domestic spaces (Living Room, Bedroom, and Kitchen), combining video projections, ambient audio, lighting, and physical props—such as sewing machines, record players, and vintage CRT TVs—with material objects recovered from former sites of forced labor camps.

To operate this complex, multi-device physical installation reliably from thousands of miles away, I built:
- **Custom Raspberry Pi Media Streamers**: A dedicated Python application using VLC bindings (`libvlc`) that syncs and pre-caches media from a local Nginx server directly to local SD card storage, keeping playback completely immune to venue Wi-Fi drops and network congestion.
- **Custom Home Assistant Integration**: A native integration (`rpi_streamer`) registering each Pi as a `media_player` entity for centralized status tracking, volume management, and remote playback control.
- **Failsafe Event-Driven Orchestration**: High-reliability Home Assistant automation sequences, watchdog monitoring scripts, and automated alerts to guarantee zero-downtime operation throughout the exhibition.

Click below to visit the official installation website, inspect the open-source code on GitHub, or read the full technical blog post detailing how it was built.

<div class="link-row">
  <a href="https://theneighbours.org/about">Official Site</a>
  <a href="https://github.com/cnorick/the-neighbours-automation">GitHub Repo</a>
  <a href="{% post_url the-neighbours/2024-05-15-automating-the-neighbours-venice-biennale %}">Blog Post</a>
</div>
