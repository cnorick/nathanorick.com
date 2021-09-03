---
title: Random Restaurant
subtitle: Amazon Alexa Skill
date: 2017-07-08
modified: 2021-09-02
tags: [project, alexa, aws]
description: An Amazon Alexa Skill that helps you decide where to eat.
image: assets/img/random-restaurant.png
---
Random Restaurant is an Alexa Skill that helps people decide where to eat. Often, friends may disagree on what to have for dinner, or if someone is new to an area, they may not be aware of all the nearby food options. Users can simply say "Alexa, ask Random Restaurant for a place to eat", and the app will give them a restaurant recommendation that is nearby and currently open.


The Skill is hosted on AWS as a node.js lambda function. It works by collecting the user's address from the device that makes the request. It then passes that information to the Yelp public API, which returns a list of nearby and open restaurants. From that list, one restaurant is randomly chosen and suggested to the user. Users can also request a specific type of food or limit the price range of the suggested restaurant.

<div class="link-row"><a href="https://alexa-skills.amazon.com/apis/custom/skills/amzn1.ask.skill.4a0f1551-2ef7-4e03-9b76-a5a4793cc7fa/launch">Try Skill</a><a href="https://github.com/cnorick/randomRestaurant">Source</a></div>