# AGENTS.md

## Repository Overview
Personal technical blog and portfolio for Nathan Orick ([nathanorick.com](https://nathanorick.com)). Built with Jekyll 4 using a customized Klisé theme, focusing on web development, IoT/Home Assistant, and interactive hardware projects.

## Tech Stack & Dependencies
- **Engine**: Jekyll ~4.1, Ruby 3.1.x, Bundler
- **System Dependencies**: `vips` / `libvips` (required by `jekyll_picture_tag` for image processing)
- **Styling & Highlighting**: Sass (compressed), Rouge syntax highlighter

## Common Commands
- **Local Dev Server**: `./scripts/serve.sh` (runs with `--livereload --unpublished --future --drafts`)
- **Production Serve**: `./scripts/serve.prod.sh` (runs with `JEKYLL_ENV=production --livereload`)
- **Build**: `bundle exec jekyll build`
- **Create Post**: `bundle exec thor jekyll:new "Post Title"` (scaffolds directory + front matter)
- **Install Gems**: `bundle install`

## Content Architecture & Conventions
- **Posts (`_posts/`)**: Handled via `jekyll-postfiles`. Each post lives in its own directory: `_posts/<title-slug>/YYYY-MM-DD-<slug>.md`. Co-locate post-specific images, GIFs, and media within that same directory.
- **Front Matter**:
  ```yaml
  ---
  title: "Title Here"
  tags: [tag1, tag2]
  description: "Short description"
  image: "relative-image.jpg"
  published: true # set false for draft; future date will schedule
  ---
  ```
- **Media & Includes**:
  - Responsive image: `{% include picture.html relative_path="image.jpg" alt="..." %}`
  - Responsive video: `{% include video.html src="https://www.youtube.com/embed/..." %}`
  - Internal post link: `{% include post_link.html postId="/slug" %}`
- **Projects (`_projects/`)**: Collection pages output to `/projects/:title/` (e.g. `_projects/<slug>/<slug>.md`).
- **Static Pages**: Root `.md` / `.html` files (`about.md`, `contact.md`, `presentations.md`, `projects.html`) represent standalone site pages.

## Deployment & CI/CD
- **Production (`.github/workflows/main.yml`)**: On push to `main`, builds with `JEKYLL_ENV=production`, syncs `_site/` to AWS S3, and invalidates AWS CloudFront cache.
- **Drafts (`publish-drafts.yml`)**: Builds unpublished/drafts to a separate staging S3 bucket.
- **Scheduled Posts (`schedule-posts.yml`)**: Daily GitHub Action cron at 06:00 UTC builds and deploys posts when their date is reached (`future: false`).

## Critical Rules for Agents
- **`_config.yml` Exclude List**: Non-site markdown or repo root files (like `AGENTS.md`, `CLAUDE.md`, etc.) MUST be added to `exclude:` in `_config.yml`, otherwise Jekyll will compile and publish them as public pages.
- **Preserve Postfile Structure**: Do not flatten post subfolders into loose files when images or assets belong to the post.
- **Do Not Edit `_site/` Directly**: `_site/` is generated output.
