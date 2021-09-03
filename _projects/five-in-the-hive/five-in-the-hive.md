---
title: Five in the Hive
subtitle: Fantasy Sports Web App
date: 2019-05-01
modified: 2021-09-02
tags: [project, angular, pwa, web]
description: An angular web app for fantasy sports.
image: "./image.png"
---
My roommate, [Kane](http://kanepenley.com/) loves football! For years, he and his friends have played a fantasy football game with a bit of a twist. Each week during the season, each person chooses five NFL teams that they think will win against the Vegas spread for a specific game. In the past, everyone shared their picks in a group message, and calculated a leaderboard at the end of each week and again at the end of the season, but all that was a ton of work, so we made it easier!

Five in the Hive is Kane's game as a web app. The app is hosted completely on AWS. The front-end is in Angular, hosted in S3, and distributed with CloudFront. The API is written in node, and hosted as a Lambda Function. The data-updating scripts are also hosted with Lambda but written in C#. We use DynamoDB as the database.

Click below to play! It's a PWA, so if you love it, you can install it to your phone.

<div class="link-row"><a href="https://fiveinthehive.net/">Open the App</a></div>