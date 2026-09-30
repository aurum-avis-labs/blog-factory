# Backlinks

Process, tooling and (locally) the data for listing Aurum Avis Labs products on free directories and launch sites.

- **Story and lessons:** [PLAYBOOK.md](PLAYBOOK.md)
- **How Claude does it:** the skill [`.cursor/skills/backlink-directories/SKILL.md`](../.cursor/skills/backlink-directories/SKILL.md) (workflow, hard rules) with reference files for platforms, browser techniques, badges and the register
- **Templates:** [templates/](templates/) (register header, product kit, dev badge task file, open items)

## New product in one line

Tell Claude: "New product X: list it on the free directories (backlink-directories skill)." It asks for name, URL, copy, assets and the dev/repo, then creates the kit and register rows, submits platform by platform, writes the badge task file for the dev, verifies, and reports.

## Public vs private

This repository is public. Only process documents, scripts and templates are committed.

Everything product-specific lives in `backlinks/data/` on the machine that runs the work. That folder is listed in `.gitignore`, so it is stored next to the repo but never pushed:

```
backlinks/data/
  register/   aal-directory-backlinks.csv (source of truth) + .xlsx, master-platforms.tsv, overview-*.xlsx, backup/
  brands/     <slug>/product-kit.md, inventory.md, ICP.md, assets/ (logos, covers, screenshots)
  tasks/      BADGE-TASKS-WAVE-*.md, running status notes
  shared/     sign-in lanes per platform (no passwords), handoff text
  icp/        company / ICP overview
```

Never commit anything from `backlinks/data/` (no `git add -f`), and never put passwords, tokens or account emails into committed files. The private data is not backed up by GitHub: keep a copy elsewhere (for example a private repository or your normal backup) if you want history.

## Scripts (in the skill folder)

```bash
S=.cursor/skills/backlink-directories/scripts
python3 $S/add_product.py "NewProduct"                 # planned row per platform
python3 $S/update_register.py changes.json --dry-run   # then without --dry-run
python3 $S/build_overview.py                           # overview workbook (needs openpyxl)
# $S/check_badges.js: paste into the browser's JavaScript tool on a product page
```

The scripts find the register through their own location (`backlinks/data/register/`); set `BACKLINKS_REGISTER_DIR` to use another folder.
