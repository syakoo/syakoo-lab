# README for visitors

- Date: 2026-11-02
- Status: agreed
- Issue: #380

## Why

The repository is public, but `README.md` is written for developers (setup, quality checks, VRT). The only developer is the owner, who does not need it there. A visitor who lands on the repository cannot tell what the project is: the README has one English line about it.

## Goal

A first-time visitor can learn from `README.md` alone what Syakoo Lab is, what is on the site, how it is built at a high level, and where to open it. Developer-only content leaves the README.

## Out of scope

- Changing the site, its copy, or its design.
- Contribution guides, setup instructions, or a developer section in the README. Developer docs stay in `CLAUDE.md`, `.claude/rules/`, and the skills.
- Screenshots (they add upkeep and would need VRT-like refreshing).
- Translations: the README is English only.
- Licensing and hosting information: the README mentions neither.

## Experience

A visitor opening the repository on GitHub can:

- Read what the site is and its motto, and open https://syakoo-lab.com.
- See what the site offers: writings, creations (arts, games, web apps), and the About me page.
- See a diagram of how the site is built (architecture overview).
- Follow a link to the author's GitHub profile.

## Contents of the README

| Section | Content |
| --- | --- |
| Title and summary | Name, one-line description, link to the live site |
| What's on the site | Writings, Creations (arts / games / web apps), About me |
| Architecture | Diagram and a few lines on the tech stack (Waku, React, Tailwind CSS, TypeScript) and the layered layout |
| Author | syakoo, link to GitHub |

## Acceptance examples

1. When a visitor opens the README, the first screen states what the site is and links to https://syakoo-lab.com.
2. When a visitor reads the README, it lists what the site offers (writings, creations, About me), matching the current top-level pages.
3. When a visitor reads the Architecture section, a diagram renders on GitHub (Mermaid) showing the main parts of the site, with no text-only fallback required.
4. While the README is read, it contains no setup commands, quality-check commands, or VRT instructions.
5. The README is written in English.
6. The README does not restate rules owned by other artifacts (layer direction, slice rules). It names `project-structure` as the owner and links to it (`single-source-of-truth`).
7. If the site adds or removes a top-level section later, the README may become outdated; no automated check is required (accepted).

## Decisions and open questions

Decisions:

- Language: English (owner's choice).
- Architecture diagram: required (owner's choice).
- Developer sections removed rather than shortened. Reason: nobody but the owner uses them, and the owner is served by `CLAUDE.md` and the rules. VRT steps already live in the `coding-guide` skill. (Default proposed; owner did not object.)
- Branch: the session branch `ccr-d7cf56d1-wan009` is used instead of `claude/<slug>`, per the session setup.

- Diagram scope: a high-level picture for visitors, not the FSD layer rules. Content (`src/contents`: writings, arts, games, webapps) and the build (static site generation, OG images, SEO files) flow into pages (Waku, React) published at syakoo-lab.com. (Owner's choice.)
- License: the README says nothing about license or reuse. (Owner's choice.)
- Hosting: the README does not mention where the site is hosted. (Owner's choice.)

Open questions: none.
