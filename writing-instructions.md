# Writing instructions

These rules now live in the project skill:

`.cursor/skills/seo-blog/SKILL.md`

Read that file, then `frontmatter.md`, `query-map.md`, `batch.md`, and `images.md` beside it. Brand strategy in `context/{brand}/` still wins when it conflicts with the skill.

`query-map.md` bands are floor–ceiling. A post under the floor is unfinished in every language. Do not ship 1–2 minute stubs.

`AGENTS.md` and `CLAUDE.md` keep only the repo contract. `TOOL_INSTRUCTIONS.md` is the spec for the local Express app, not the writing guide.

Blog images may be generated or downloaded as PNG/JPEG, but must be converted to WebP (max 1600px wide, quality ~80) before commit; only `.webp` paths may appear in MDX. Use `npm run images:webp -- <path>` and confirm with `npm run check:images`.
