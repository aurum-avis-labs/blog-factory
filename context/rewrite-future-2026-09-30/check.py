#!/usr/bin/env python3
"""Spot-check rewritten future posts against the rewrite brief."""
import json, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
MANIFEST = json.loads((Path(__file__).parent / "manifest.json").read_text())
BYID = {a["id"]: a for a in MANIFEST["articles"]}
SEC_BLOCKS = {
    "blog-facts", "blog-kicker", "blog-stat", "blog-steps", "blog-flow",
    "blog-callout", "blog-callout--limit", "blog-pair", "blog-checklist",
    "blog-scenarios", "blog-faq", "blog-faq-q",
}
BOILER = ("Praxis im Schweizer KMU ohne CISO", "Fragen von VR und Versicherung")

def words(body):
    b = re.sub(r"<[^>]+>", " ", body)
    b = re.sub(r"\]\([^)]*\)", "]", b)
    b = re.sub(r"[#*_>|`\[\]]", " ", b)
    return len(re.findall(r"[\wÀ-ÿ'’-]+", b))

def check_file(path, lang, site, old):
    issues = []
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        return ["no frontmatter"], 0
    fm, body = m.group(1), m.group(2)
    w = words(body)
    if "\u2014" in text:
        issues.append("em dash")
    if lang == "de" and "ß" in text:
        issues.append("eszett")
    for phrase in BOILER:
        if phrase in body:
            issues.append(f"boilerplate: {phrase}")
    if re.search(r"^Die\s*$", body, re.M):
        issues.append("stranded Die")
    first = next((l for l in body.split("\n") if l.strip()), "")
    if not first.startswith("## "):
        issues.append(f"body starts {first[:40]!r}")
    if site == "security" and re.search(r"^updatedDate:", fm, re.M):
        issues.append("security has updatedDate")
    if site == "security":
        for cl in re.findall(r'class="([^"]+)"', body):
            for c in cl.split():
                if c not in SEC_BLOCKS:
                    issues.append(f"class {c}")
    if w < old:
        issues.append(f"shorter {old}->{w}")
    return issues, w

def main():
    ids = sys.argv[1:]
    if not ids:
        ids = [a["id"] for a in MANIFEST["articles"] if (REPO / "context/rewrite-future-2026-09-30/done" / f"{a['brand']}--{a['translationKey']}.md").exists()]
    fails = 0
    for id in ids:
        a = BYID[id]
        print(f"\n{id}  {a['pubDate']}  {a['site'] or a['brand']}")
        for lang, rel in sorted(a["files"].items()):
            issues, w = check_file(REPO / rel, lang, a["site"], a["words"][lang])
            flag = "OK " if not issues else "ERR"
            if issues:
                fails += 1
            print(f"  {flag} {lang} {a['words'][lang]}->{w}  {', '.join(issues)}")
    print(f"\nfailing files: {fails}")
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()
