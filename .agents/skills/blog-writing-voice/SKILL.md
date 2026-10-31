---
name: blog-writing-voice
description: >-
  Guides the writing style, tone, structure, and formatting for blog posts and project pages on Nathan Orick's personal blog (nathanorick.com). Use this skill whenever drafting, editing, outlining, or reviewing blog posts in `_posts/` or project pages in `_projects/`.
---

# Nathan Orick's Blog Writing Voice & Style Guide

Use this guide whenever writing or editing posts for `nathanorick.com` so the content sounds authentically like Nathan without needing to re-read the entire archive first.

## 1. Core Voice & Persona

- **Conversational & First-Person**: Write like you're explaining a cool project to a developer friend over coffee. Use natural contractions (`I've`, `it's`, `didn't`, `who'd`) and direct address (`you`).
- **Humble, Honest, & Lightly Self-Deprecating**:
  - Be upfront about trial-and-error, failed iterations, or areas outside your day-to-day expertise.
  - Examples from past posts:
    - *"I'm certainly not an expert at circuit design, so don't judge my work."*
    - *"With about half a day's work, I created the most impractical way to control your smart home."*
    - *"Every October, I think I'm just going to pull it out of storage, dust it off, and plug it in. And every October, I end up spending weeks adding completely unnecessary features to it."*
- **Enthusiastic about Neat Solutions**: Let genuine excitement show when a clever hack, tool, or physical mechanism comes together:
  - *"I just want to pause to think about how exciting this actually is!"*
  - *"(it's super neat, btw!)"*
  - *"(which is a game-changer for the smart home, btw)"*
- **Credit Inspiration & Help**: Always shout out where ideas came from (e.g., *"right as I was about to give up for good, my wife gave me a great suggestion: use a fan"*, or linking to another maker's video/open-source model that inspired a build).

## 2. Post Structure & Pacing

### The Opening Hook
- Start immediately with the **real-world problem, story, or catalyst** that sparked the project—never a dry definition or generic intro.
  - *Good*: *"Our neighborhood is very popular on Halloween, so last year, we found ourselves completely under-prepared when we ran out of candy within an hour."*
  - *Good*: *"Do you remember that scene from Willy Wonka and the Chocolate Factory where Wonka opens a door with a little organ in the wall?"*
- Follow the hook with a quick, high-level summary of what you built (or a `**tldr;**` if it's a short utility post).
- If there's a demo video or gallery, surface it right away and offer a quick jump link:
  - *"If you're interested in the details of how it works (it's super neat, btw!), read on. But if you like visuals better, **[skip to the gallery](#gallery)**..."*
- If the post is part of a series or has updates, place a `<div class="alert alert-primary">` box near the top before the first `-----` divider using `{% include post_link.html postId="/slug" %}`.

### Body Sections: Pragmatic Depth (Don't Ramble!)
- **Focus on the "Why" and the Flow, Not Exhaustive Spec Sheets**:
  - Explain the interesting problem, the physical or architectural tradeoff, and how the pieces talk to each other.
  - Avoid reading like a corporate changelog or academic paper. Translate dry engineering terms into plain English (e.g., instead of *"Implemented a 4-band proportional-integral-derivative state machine"*, write *"When the scale is far from the target weight, the hopper spins faster; when it's close, it nudges the turntable a tiny bit at a time"*).
- **Use Numbered Flows for System Logic**:
  - When explaining how a system or automation works end-to-end, break it down into a clean numbered sequence (`1. ... 2. ... 3. ...`) before diving into specific steps.
- **Pair Explanations with Visuals**:
  - Introduce a mechanism or concept in 2–4 sentences, then immediately drop in the GIF or photo (`{% include picture.html relative_path="..." alt="..." %}`) so the reader can *see* what you mean.
- **Keep Code Focused**:
  - For hardware/IoT showcase posts, skip the boilerplate and link to GitHub (`I won't go into detail here about how the code works, but if you're interested, definitely check out the project on github.`).
  - For software/Home Assistant tutorial posts, show the "meat" of the business logic in a clean code block and briefly walk through the key parts.

### The Wrap-Up
- Keep conclusions brief (`# Final Thoughts` or `# Conclusion`): 1–2 short paragraphs reflecting on what you learned or how it performed in the real world, plus an invitation to comment (*"If you have any ideas of what I should add for next year, let me know in the comments at the bottom of the page."*).
- End with a `# Resources` bullet list (linking to the GitHub repo, 3D models, spreadsheets, or related posts) and, if applicable, `{% include gallery.html relative_folder=page.gallery_folder %}`.

## 3. Formatting & Typography Habits

- **Spoken Emphasis**: Use `_italics_` or `*italics*` and `**bold**` the way you would stress words out loud (*"that's _all_ the physical parts, not just the circuitry"*, *"our line gets *long* on Halloween night"*).
- **Parenthetical Asides**: Use conversational parentheticals for quick tangents, jokes, or tips—`(it's going up!)`, `(don't judge my work)`, `(if I can just find the time to finish it)`.
- **Headings**: Notice that `_config.yml` sets `header_offset: 1` for Kramdown, so top-level sections in Markdown use `# Heading` (which renders as `<h2>`), subsections use `## Subheading` (`<h3>`), etc.
- **Jekyll Includes**:
  - Images/GIFs: `{% include picture.html relative_path="file.gif" alt=" descriptive alt text" %}`
  - YouTube embeds: `{% include video.html src="https://www.youtube.com/embed/..." %}`
  - Internal post links: `{% include post_link.html postId="/post-slug" %}`
  - Callout boxes: `<div class="alert alert-primary">` or `<div class="alert alert-warning">`
  - Galleries: `{% include gallery.html relative_folder=page.gallery_folder %}`
- **Cross-Linking Series Posts**: When publishing a follow-up to an existing project (like the Halloween candy machine or Home Assistant guest mode), always link the new post back to the earlier posts *and* update the earlier posts + `_projects/` entry to point forward to the new one.
