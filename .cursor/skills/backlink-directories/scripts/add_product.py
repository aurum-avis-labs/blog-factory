#!/usr/bin/env python3
"""Add a new product to the register: one 'planned' row per platform.

Usage
  python3 add_product.py "NewProduct" [--platforms "Daily Pings,findly.tools,aat.ee"] [--dry-run]

Without --platforms the platform list is taken from backlinks/data/register/master-platforms.tsv
(column 'platform', rows whose 'master' column is yes/trial) plus every platform already in the register.
Existing (product, platform) pairs are never touched. Run update_register.py afterwards to record real results.
"""
import csv, datetime, os, shutil, sys
from pathlib import Path

CSV_NAME = "aal-directory-backlinks.csv"
XLSX_NAME = "aal-directory-backlinks.xlsx"


def register_dir() -> Path:
    env = os.environ.get("BACKLINKS_REGISTER_DIR")
    return Path(env).expanduser() if env else Path(__file__).resolve().parents[4] / "backlinks" / "data" / "register"


def main(argv):
    dry = "--dry-run" in argv
    args = [a for a in argv if a != "--dry-run"]
    if not args:
        raise SystemExit(__doc__)
    product = args[0]
    platforms = None
    if "--platforms" in args:
        platforms = [p.strip() for p in args[args.index("--platforms") + 1].split(",") if p.strip()]
    d = register_dir()
    csv_path = d / CSV_NAME
    with open(csv_path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    fields = list(rows[0].keys())
    if platforms is None:
        platforms = []
        tsv = d / "master-platforms.tsv"
        if tsv.exists():
            with open(tsv, newline="", encoding="utf-8") as f:
                for r in csv.DictReader(f, delimiter="\t"):
                    if r.get("master", "").lower() in ("yes", "trial"):
                        platforms.append(r["platform"])
        for r in rows:
            if r["Platform"] not in platforms:
                platforms.append(r["Platform"])
    have = {(r["Product"].lower(), r["Platform"].lower()) for r in rows}
    today = datetime.date.today().isoformat()
    added = []
    for p in platforms:
        if (product.lower(), p.lower()) in have:
            continue
        r = {k: "" for k in fields}
        r.update({"Product": product, "Platform": p, "Status": "planned", "Last update": today,
                  "Notes": f"Agent {today}: added for new product, not started."})
        rows.append(r)
        added.append(p)
    print(f"{len(added)} new row(s) for {product}: {', '.join(added) or '-'}")
    if dry or not added:
        print("nothing written" if dry else "nothing to add")
        return
    backup = d / "backup"
    backup.mkdir(exist_ok=True)
    stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    shutil.copy2(csv_path, backup / f"{CSV_NAME}.{stamp}.bak")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)
    xlsx = d / XLSX_NAME
    xlsx_done = xlsx.exists()
    if xlsx_done:
        import openpyxl
        shutil.copy2(xlsx, backup / f"{XLSX_NAME}.{stamp}.bak")
        wb = openpyxl.load_workbook(xlsx)
        ws = wb.active
        header = [c.value for c in ws[1]]
        for r in rows[len(rows) - len(added):]:
            ws.append([r.get(h, "") for h in header])
        wb.save(xlsx)
    print("written (csv + xlsx)" if xlsx_done else "written (csv only; no xlsx found)")


if __name__ == "__main__":
    main(sys.argv[1:])
