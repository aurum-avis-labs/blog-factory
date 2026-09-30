#!/usr/bin/env python3
"""Validate Aurum SME-cluster MDX files (waves 1-3) against the cluster rules.

    python3 context/aurum/batches/2026-09-30-wave-3/tools/validate.py              # every cluster post that exists
    python3 .../validate.py KEY [KEY ...]                                           # only these translationKeys
    python3 .../validate.py --wave 3                                                # only one wave
    python3 .../validate.py --owner "Writer A"                                      # only one writer's topics

Exit code 1 if any ERROR. Warnings need a human look but do not fail.
MDX compile uses @mdx-js/mdx from preview/node_modules (run `cd preview && npm ci` once).
"""
import json, re, sys, glob, os, subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
PLAN = HERE.parent
REPO = HERE.parents[4]
CAL = json.load(open(PLAN / "calendar.json", encoding="utf-8"))
BYKEY = {c["translationKey"]: c for c in CAL}
SLUG = {"en": {c["en_slug"]: c for c in CAL}, "de": {c["de_slug"]: c for c in CAL}}
ORDER_BASE = ["title", "description", "pubDate", "author", "tags", "funnelStage",
              "translationKey", "relatedPosts", "draft"]
PAGES = {
    "de": {"/de/prozess-check", "/de/prozess-check/buchen", "/de/services/ai-in-business",
           "/de/services/ai-implementation-consulting", "/de/portfolio/kitchencrew",
           "/de/services/agentic-coding", "/de/contact"},
    "en": {"/prozess-check", "/prozess-check/buchen", "/services/ai-in-business",
           "/services/ai-implementation-consulting", "/portfolio/kitchencrew",
           "/services/agentic-coding", "/contact"},
}
# Tool pages get added here once they exist (see HANDOFF.md, "Free tools").
BLOCKS = {"blog-facts", "blog-kicker", "blog-stat", "blog-steps", "blog-flow", "blog-callout",
          "blog-callout--limit", "blog-pair", "blog-checklist", "blog-scenarios", "blog-faq",
          "blog-faq-q"}


def parse(path):
    t = open(path, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", t, re.S)
    if not m:
        return None, None, t
    fm, keys = {}, []
    for line in m.group(1).split("\n"):
        mm = re.match(r"^(\w+):\s*(.*)$", line)
        if mm:
            keys.append(mm.group(1))
            fm[mm.group(1)] = mm.group(2).strip()
    fm["_keys"] = keys
    return fm, m.group(2), t


def unq(s):
    s = s.strip()
    return s[1:-1] if len(s) >= 2 and s[0] == s[-1] and s[0] in "\"'" else s


def words(body):
    b = re.sub(r"<[^>]+>", " ", body)
    b = re.sub(r"\]\([^)]*\)", "]", b)
    b = re.sub(r"[#*_>|`\[\]]", " ", b)
    return len(re.findall(r"[\wÀ-ÿ'’-]+", b))


def check(path, lang):
    errs, warns = [], []
    fm, body, raw = parse(path)
    if fm is None:
        return ["no frontmatter"], [], 0
    keys = [k for k in fm["_keys"] if k != "image"]
    if keys != ORDER_BASE:
        errs.append(f"frontmatter keys/order {fm['_keys']} (expected {ORDER_BASE}, optional image before draft)")
    if "image" in fm["_keys"] and fm["_keys"].index("image") != fm["_keys"].index("draft") - 1:
        errs.append("image line must sit directly before draft")
    if "image" in fm["_keys"]:
        img = unq(fm["image"]).replace("@/assets/blog/", "")
        if not (REPO / "brands" / "aurum" / "images" / img).exists():
            errs.append(f"image file missing: brands/aurum/images/{img}")
    key = unq(fm.get("translationKey", ""))
    cal = BYKEY.get(key)
    slug = Path(path).stem
    if not cal:
        return [f"translationKey {key} not in calendar.json"], warns, 0
    exp = cal["en_slug"] if lang == "en" else cal["de_slug"]
    if slug != exp:
        errs.append(f"slug {slug} != {exp}")
    if cal.get("pubDate") and fm.get("pubDate") != cal["pubDate"]:
        errs.append(f"pubDate {fm.get('pubDate')} != calendar {cal['pubDate']} (run reschedule.py --apply)")
    if unq(fm.get("funnelStage", "")) != cal["funnelStage"]:
        errs.append(f"funnelStage {fm.get('funnelStage')} != {cal['funnelStage']}")
    if unq(fm.get("author", "")) != "Aurum Avis Labs":
        errs.append("author must be \"Aurum Avis Labs\"")
    if fm.get("draft") != "false":
        errs.append("draft must be false")
    desc = unq(fm.get("description", ""))
    if not desc or len(desc) >= 160:
        errs.append(f"description length {len(desc)} (must be 1-159)")
    try:
        tags = json.loads(fm.get("tags", "[]"))
        if not (2 <= len(tags) <= 5):
            errs.append(f"tags count {len(tags)}")
    except Exception:
        errs.append("tags not a JSON-style list")
    try:
        rel = json.loads(fm.get("relatedPosts", "[]"))
    except Exception:
        rel = []
        errs.append("relatedPosts not a JSON-style list")
    if not (1 <= len(rel) <= 3):
        errs.append(f"relatedPosts count {len(rel)}")
    for r in rel:
        t = SLUG[lang].get(r)
        if not t:
            errs.append(f"relatedPost {r} is not a {lang} slug of this cluster")
            continue
        a, b = cal["funnelStage"], t["funnelStage"]
        if a == "interest" and b == "awareness":
            errs.append(f"interest -> awareness related {r}")
        if a == "consideration" and b != "consideration":
            errs.append(f"consideration -> {b} related {r}")
        if r == slug:
            errs.append("relatedPosts contains itself")
    first = next((l for l in body.split("\n") if l.strip()), "")
    if not first.startswith("## "):
        errs.append(f"body does not start at H2: {first[:50]!r}")
    if re.search(r"^# ", body, re.M):
        errs.append("H1 in body")
    if re.search(r"^---\s*$", body, re.M):
        errs.append("--- line in body")
    if "—" in raw:
        errs.append("em dash U+2014")
    if lang == "de" and "ß" in raw:
        errs.append("ß (de-CH uses ss)")
    if "<!--" in body:
        errs.append("HTML comment (breaks MDX)")
    for m in re.finditer(r'class="([^"]+)"', body):
        for cl in m.group(1).split():
            if cl not in BLOCKS:
                errs.append(f"unknown block class {cl}")
    if re.search(r"<img|!\[", body):
        errs.append("inline image")
    if re.search(r"\]\(http://", body):
        warns.append("http:// link")
    if "!" in re.sub(r"<[^>]+>|\]\([^)]*\)", "", body):
        warns.append("exclamation mark in body")
    if lang == "de":
        du = re.findall(r"\b(ihr|euch|euer|eure|euren|eurem|eurer|du|dich|dir|dein\w*|habt|seid|wollt|könnt|müsst)\b", body)
        if du:
            warns.append(f"possible du/ihr: {sorted(set(du))} (third-person «ihr» is fine)")
        for w in ["Call", "Calls", "Setup", "Game-Changer"]:
            if re.search(rf"\b{w}\b", body):
                warns.append(f"word «{w}» in DE body")
    links = re.findall(r"\]\((/[^)\s]*)\)", body) + re.findall(r'href="(/[^"]*)"', body)
    prefix = "/de/blog/" if lang == "de" else "/blog/"
    for l in links:
        l0 = l.split("#")[0].rstrip("/") or "/"
        if l0.startswith(prefix):
            t = SLUG[lang].get(l0[len(prefix):])
            if not t:
                errs.append(f"blog link to a slug outside the cluster: {l0}")
            elif t["seq"] > cal["seq"]:
                errs.append(f"body link to {l0} (seq {t['seq']}) goes live after this post (seq {cal['seq']})")
        elif l0 not in PAGES[lang]:
            errs.append(f"internal link not allowed: {l0}")
    if lang == "en" and any(l.startswith("/de/") for l in links):
        errs.append("EN post links to a /de/ path")
    wc = words(body)
    if cal.get("floor"):
        if wc < cal["floor"]:
            errs.append(f"words {wc} < floor {cal['floor']}")
        if wc > cal["ceiling"] * 1.1:
            warns.append(f"words {wc} > ceiling {cal['ceiling']}")
    return errs, warns, wc


def main():
    args = sys.argv[1:]
    wave = owner = None
    if args[:1] == ["--wave"]:
        wave, args = int(args[1]), args[2:]
    elif args[:1] == ["--owner"]:
        owner, args = args[1], args[2:]
    keys = set(args)
    files = []
    for c in sorted(CAL, key=lambda c: c["seq"]):
        if keys and c["translationKey"] not in keys:
            continue
        if wave and c["wave"] != wave:
            continue
        if owner and c.get("owner") != owner:
            continue
        for lang in ("en", "de"):
            f = REPO / "brands" / "aurum" / lang / f"{c['en_slug' if lang == 'en' else 'de_slug']}.mdx"
            if f.exists():
                files.append((str(f), lang))
            elif c["status"] != "planned":
                print(f"ERR {lang} {f.name}: file missing for a written topic")
    total = 0
    for f, lang in files:
        e, w, wc = check(f, lang)
        total += len(e)
        print(f"{'OK ' if not e else 'ERR'} {lang} {Path(f).name} words={wc}")
        for x in e:
            print("   ERROR:", x)
        for x in w:
            print("   warn :", x)
    if files:
        r = subprocess.run(["node", str(HERE / "mdxcheck.mjs")] + [f for f, _ in files],
                           capture_output=True, text=True, cwd=REPO)
        out = (r.stdout + r.stderr).strip()
        print(out)
        if r.returncode != 0 or "MDX-ERROR" in out:
            total += 1
    print(f"files={len(files)} errors={total}")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
