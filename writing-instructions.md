# Writing instructions

These rules now live in the project skill:

`.cursor/skills/seo-blog/SKILL.md`

Read that file, then `frontmatter.md`, `query-map.md`, `batch.md`, and `images.md` beside it. Brand strategy in `context/{brand}/` still wins when it conflicts with the skill.

`query-map.md` bands are floor–ceiling. A post under the floor is unfinished in every language. Do not ship 1–2 minute stubs.

`AGENTS.md` and `CLAUDE.md` keep only the repo contract. `TOOL_INSTRUCTIONS.md` is the spec for the local Express app, not the writing guide.

**Images:** Heroes and inline assets are WebP only in committed content. Image tools may output PNG/JPEG; run `npm run images:webp` to convert under `brands/` and rewrite MDX references, then `npm run check:images` before opening a PR.
