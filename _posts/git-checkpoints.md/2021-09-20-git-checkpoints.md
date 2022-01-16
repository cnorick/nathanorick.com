---
title: Git Checkpoints
tags: [git, dev environment, productivity]
description: Introducing Git Checkpoints - Git aliases that allow you to quickly save your work on the fly.
---

Pretty regularly as I'm writing code, I want to save the current state of my work, but I don't want the overhead of a full commit.
Usually when I find myself in this situation, I'll really like what I've written, but the code isn't quite yet compilable
(I prefer all my commits to at least build and run, so I can safely check them out later). In these situations, I want to be able to
safely experiment with changing code without having to worry about losing my place, so I created a set of git aliases that allow me to
do just that.

# Usage
Here's a quick example of how I use these git checkpoints:
```bash
$ git status
```
```git
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   file1.txt
        modified:   file2.txt
        modified:   file3.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
```bash
$ git checkpoint
```
```git
[main b2f15ab] SAVEPOINT - CHECKPOINT
 3 files changed, 43 insertions(+), 2 deletions(-)
```
```bash
$ git listCheckpoints
```
```git
checkpoint/2021_09_17_13_25_55
```
```bash
# After making new changes that you decide you no longer want
$ git status
```
```git
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   file1.txt
        modified:   file2.txt
        modified:   file3.txt
        modified:   file4.txt
        modified:   file5.txt

no changes added to commit (use "git add" and/or "git commit -a")
```
```bash
$ git loadCheckpoint 2021_09_17_13_25_55
```
```git
HEAD is now at b2f15ab SAVEPOINT - CHECKPOINT
```
```bash
$ git status
```
```git
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   file1.txt
        modified:   file2.txt
        modified:   file3.txt
```
```bash
$ git deleteCheckpoint 2021_09_17_13_25_55
```
```git
Deleted tag 'checkpoint/2021_09_17_13_25_55' (was b2f15ab)
```

# Get the Code
Just copy this to your .gitconfig to start using git checkpoints:
```bash
  # Checkpoints allow you to get a commit hash for a WIP.
  # It's intended for when you'd like to mark progress to return to later, but don't yet want a full commit.
  # See {{site.url}}{{page.url}} for more details.
  save = "!f() { git add -A && git commit --no-verify -m "\"SAVEPOINT - $@\""; }; f"
  undo = reset HEAD~1 --mixed
  checkpoint = "!f() { git save ${1-CHECKPOINT}; git tag "\"checkpoint/${1-`date +%Y_%m_%d_%H_%M_%S`}\""; git undo; }; f"
  listCheckpoints = tag -l "checkpoint/*"
  deleteCheckpoint = "!f() { git tag -d checkpoint/$1; }; f"
  loadCheckpoint = "!f() { git reset --hard checkpoint/$1 && git undo; }; f"
  cp = checkpoint
  cpls = listCheckpoints
  cpd = deleteCheckpoint
  cpld = loadCheckpoint
```
