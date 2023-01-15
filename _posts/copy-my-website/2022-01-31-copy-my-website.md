---
title: Copy My Website
tags:
 - jekyll
 - blog
 - website
description:
image:
published: false
---
This is a guide for setting up a personal website/blog. If you've ever considered creating a personal website
or a blog, but have been daunted by the amount of initial work or the cost, this guide is for you. I'll explain
exactly how I created this website, and how I host it on AWS for less than $1 a month (there are even cheaper options).

This is a follow up to my last post, {% include post_link.html postId="/you-need-a-blog" %}, so if you'd like a
reason for creating your own blog, check that one out first.

Outline
1. Git Fork
    1. Change the name of the repo
    1. git clone
1. Why I like Jekyll
1. How to run locally
1. How to customize it for your needs
1. How to host it
1. How to add content
    1. Don't talk about how I host drafts
1. CI

# Git Fork
I actually started this website by forking someone else's work

# Steps Summary
1. Fork the project
    1. Rename you repo on GitHub
    1. Clone it locally: `git clone https://github.com/<your username>/<your repo name>.git`
1. Run it
    1. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
    1. [Install Jekyll](https://jekyllrb.com/docs/installation/)
    1. In the root folder of the repo, run `./scripts/serve.sh`
    1. Open your browser to the url the command gives you and see the website
1. Customize it
    1. Delete everything in the `_posts` folder
    1. Delete everything in the `_projects` folder
    1. Delete or update the following files that support analytics/ads:
        * `_includes/addsenense
    1. Add your own projects or posts by adding sub-folders under `_posts` or `_projects`
       * Each of those pages can be written in markdown or html 