# Syakoo Lab

A personal website run by syakoo, built around the motto "interests that widen, deepen, and lead to discovery."

**Visit the site: https://syakoo-lab.com**

## What's on the site

- **Writings**: articles.
- **Creations**: arts, games, and web apps.
- **Profile**: a short introduction to the author on the home page.

## Architecture

Contents are plain files in the repository. A build step turns them into a static site.

```mermaid
flowchart LR
  C["Contents<br/>writings (MDX), arts, games, web apps"] --> B["Build<br/>OG images, SEO files, static pages (Waku)"]
  B --> S["syakoo-lab.com<br/>Home, Writings, Creations"]
```

The site is built with [Waku](https://waku.gg), React, Tailwind CSS, and TypeScript. The code layout is described in the [`project-structure` skill](.claude/skills/project-structure/SKILL.md).

## Author

[syakoo](https://github.com/syakoo)
