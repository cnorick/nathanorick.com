---
title: Auto Guest Login
subtitle: A Home Assistant Add-On
date: 2023-01-15
tags: [project, home assistant, add-on, smart home]
description: An Add-On for Home Assistant that makes your smart home much more accessible to guests by automatically logging them into a guest account
image: assets/img/halloween-machine.jpg
exclude_from_homepage: false
published: true
---

This is a Home Assistant Add-On that allows guests in your home to get logged into a guest account by visiting a url (maybe by simply scanning a QR code).

I originally created this project as a stand-alone node server that could be run on a Raspberry Pi in your house, then shared the idea as a blog post:
{% include post_link.html postId="/ha-automatic-guest-login" %}.
But as the guest-login server started getting
picked up by other Home Assistant users, I turned it into an Add-On that can be added to your Home Assistant host machine with just a couple button clicks.

Now it's just as easy for those running a Home Assistant instance to get up and running as it is for their guests. Actually, if you use Home Assistant, you can get started
by just clicking this button:

[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fcnorick%2Fha-auto-guest-login)
{: class="centered"}

<br/>

<div class="link-row">
  <a href="https://github.com/cnorick/ha-auto-guest-login">Repo</a>
  <a href="{% post_url ha-automatic-guest-login/2021-12-22-ha-automatic-guest-login %}">Original Blog Post</a>
</div>