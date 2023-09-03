---
title: Cultivator
subtitle: A Mobile Companion for Tiller
date: 2023-09-03
tags: [project, angular, pwa, web, budgeting]
description: To help my wife and me mark our transactions on the go, I created a fully-frontend app that works with a Tiller Google Sheet.
image: assets/img/transaction.png
---

I really love the power that [Tiller](https://www.tillerhq.com/) gives you. If you're a spreadsheet nerd like me, it's so nice to be able to do whatever you can imagine with your transaction data.

The problem with Tiller, however, is their lack of a mobile application. My wife and I have a few automated categorization rules set up for the most common reoccurring transactions, but the majority of our spending can't
be categorized automatically. Once every couple weeks, we used to have to gather around the PC, open the spreadsheet, and go through transactions line by line to manually assign categories to our spending.
What we really wanted was a way to check in on our spending individually and on the go.

That's why I built [Cultivator](https://cultivator.nathanorick.com). There are so many moments of down time in our lives that we can now use to quickly add a category or a note to our transactions. Then, when we finally gather around the PC to look at our
budget, we don't have to spend so much time trudging through transactions, but can focus on more important topics.

Cultivator is written in Angular and is a PWA so that it can be installed locally on your phone. The best part, however, is that it doesn't require a bespoke backend. All the work happens between your browser and Google.
When you first open the app, you're prompted to authorize with Google to allow Cultivator to see your Tiller spreadsheet. Once you've granted permission and select your spreadsheet, the app automatically pulls in all your transactions and categories.
From there, you can filter transactions down to only the ones that have not yet been categorized, and quickly click through them to add categories or notes.

All of this is happening locally! The browser requests the data directly from Google Sheets and writes the updates directly back to Google Sheets. I think this concept of BYOD (bring your own database) could prove really powerful for other applications as well.
There's no concern for scaling since each user is mapped to exactly one database (i.e. spreadsheet), privacy is strong since we're not processing any user data outside of the browser, and costs are low since hosting static web files is cheap.

If you don't use Tiller, I strongly suggest you check it out! And if you do already use it, try out Cultivator. It'll make your budgeting go much more smoothly.

<div style="display: flex; flex-direction: row; justify-content: space-evenly">
  <div style="width: 200px;">
    {% include picture.html path="/assets/img/category.png" alt="" %}
  </div>
  <div style="width: 200px;">
    {% include picture.html path="/assets/img/transaction.png" alt="" %}
  </div>
</div>

<br />

<div class="link-row"><a href="https://cultivator.nathanorick.com">Open the App</a></div>