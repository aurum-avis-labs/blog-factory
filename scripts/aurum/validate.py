#!/usr/bin/env python3
"""Validate Aurum security-blog MDX files.

    python3 scripts/aurum/validate.py
    python3 scripts/aurum/validate.py KEY [KEY ...]
    python3 scripts/aurum/validate.py --owner A1
"""
import json, re, sys, subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
PLAN = REPO / "context" / "aurum" / "batches" / "security-2026-09-30"


def load_plan(plan_dir):
    global PLAN, CAL, BYKEY, SLUG
    PLAN = Path(plan_dir)
    CAL = json.load(open(PLAN / "calendar.json", encoding="utf-8"))
    BYKEY = {c["translationKey"]: c for c in CAL}
    SLUG = {"en": {c["en_slug"]: c for c in CAL}, "de": {c["de_slug"]: c for c in CAL}}


load_plan(PLAN)
ORDER_BASE = ["title", "description", "pubDate", "author", "tags", "funnelStage",
              "translationKey", "relatedPosts", "draft", "site"]
PAGES = {
    "de": {"/de/security", "/de/security/security-awareness", "/de/security/datenschutz"},
    "en": {"/security", "/security/security-awareness", "/security/datenschutz"},
}
BLOCKS = {"blog-facts", "blog-kicker", "blog-stat", "blog-steps", "blog-flow", "blog-callout",
          "blog-callout--limit", "blog-pair", "blog-checklist", "blog-scenarios", "blog-faq",
          "blog-faq-q", "blog-lede", "blog-pull", "blog-terms"}
PC_PREFIX = {"de": "/de/prozess-check/blog/", "en": "/prozess-check/blog/"}


def pc_dates():
    out = {"en": {}, "de": {}}
    for lang in ("en", "de"):
        for path in (REPO / "brands" / "aurum" / lang).glob("*.mdx"):
            text = path.read_text(encoding="utf-8")
            if not re.search(r"^site:\s*prozess-check\s*$", text, re.M):
                continue
            pub = re.search(r"^pubDate:\s*(\S+)", text, re.M)
            if pub:
                out[lang][path.stem] = pub.group(1)
    return out


PC = pc_dates()


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
    keys = fm["_keys"]
    without = [k for k in keys if k != "image"]
    if without != ORDER_BASE:
        errs.append(f"frontmatter keys/order {keys} (expected {ORDER_BASE}, optional image before draft)")
    if "image" in keys and keys[keys.index("image") + 1] != "draft":
        errs.append("image line must sit directly before draft")
    if "image" in keys:
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
    if fm.get("pubDate") != cal["pubDate"]:
        errs.append(f"pubDate {fm.get('pubDate')} != calendar {cal['pubDate']}")
    if unq(fm.get("funnelStage", "")) != cal["funnelStage"]:
        errs.append(f"funnelStage {fm.get('funnelStage')} != {cal['funnelStage']}")
    if unq(fm.get("author", "")) != "Aurum Avis Labs":
        errs.append('author must be "Aurum Avis Labs"')
    if fm.get("draft") != "false":
        errs.append("draft must be false")
    if unq(fm.get("site", "")) != "security":
        errs.append(f"site {fm.get('site')} != security")
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
    if "!" in re.sub(r"<[^>]+>|\]\([^)]*\)", "", body):
        warns.append("exclamation mark in body")
    if lang == "de":
        du = re.findall(r"\b(ihr|euch|euer|eure|euren|eurem|eurer|du|dich|dir|dein\w*|habt|seid|wollt|könnt|müsst)\b", body)
        if du:
            warns.append(f"possible du/ihr: {sorted(set(du))}")
    links = re.findall(r"\]\((/[^)\s]*)\)", body) + re.findall(r'href="(/[^"]*)"', body)
    prefix = "/de/security/blog/" if lang == "de" else "/security/blog/"
    pc = PC_PREFIX[lang]
    for l in links:
        l0 = l.split("#")[0].rstrip("/") or "/"
        if l0.startswith(prefix):
            t = SLUG[lang].get(l0[len(prefix):])
            if not t:
                errs.append(f"blog link to a slug outside the cluster: {l0}")
            elif t["seq"] > cal["seq"]:
                errs.append(f"body link to {l0} (seq {t['seq']}) goes live after this post (seq {cal['seq']})")
        elif l0.startswith(pc):
            slug_pc = l0[len(pc):]
            pub = PC[lang].get(slug_pc)
            if not pub:
                errs.append(f"prozess-check link unknown: {l0}")
            elif pub > cal["pubDate"]:
                errs.append(f"prozess-check link {l0} is dated {pub}, after this post {cal['pubDate']}")
        elif l0 not in PAGES[lang]:
            errs.append(f"internal link not allowed: {l0}")
    if lang == "en" and any(l.startswith("/de/") for l in links):
        errs.append("EN post links to a /de/ path")
    return errs, warns, words(body)


STUDIO_PAGES = {
    "en": {
        "/services/mvp-validation",
        "/services/vibe-code-review",
        "/services/landing-page-package",
        "/contact",
        *(f"/portfolio/{s}" for s in (
            "citysage", "holist-iq", "do4me", "postology", "kitchencrew", "inklets", "vemoir")),
    },
    "de": {
        "/de/services/mvp-validation",
        "/de/services/vibe-code-review",
        "/de/services/landing-page-package",
        "/de/contact",
        *(f"/de/portfolio/{s}" for s in (
            "citysage", "holist-iq", "do4me", "postology", "kitchencrew", "inklets", "vemoir")),
    },
}


def live_studio_slugs(lang):
    out = set()
    for path in (REPO / "brands" / "aurum" / lang).glob("*.mdx"):
        text = path.read_text(encoding="utf-8")
        if not re.search(r"^site:\s*studio\s*$", text, re.M):
            continue
        key = re.search(r'^translationKey:\s*"?([^"\n]+)"?\s*$', text, re.M)
        if key and key.group(1).strip() in BYKEY:
            continue
        out.add(path.stem)
    return out


def check_studio(path, lang):
    errs, warns = [], []
    fm, body, raw = parse(path)
    if fm is None:
        return ["no frontmatter"], [], 0
    keys = fm["_keys"]
    if keys != ORDER_BASE:
        errs.append(f"frontmatter keys/order {keys} (expected {ORDER_BASE}, no image line)")
    key = unq(fm.get("translationKey", ""))
    cal = BYKEY.get(key)
    slug = Path(path).stem
    if not cal:
        return [f"translationKey {key} not in calendar.json"], warns, 0
    exp = cal["en_slug"] if lang == "en" else cal["de_slug"]
    if slug != exp:
        errs.append(f"slug {slug} != {exp}")
    if fm.get("pubDate") != cal["pubDate"]:
        errs.append(f"pubDate {fm.get('pubDate')} != calendar {cal['pubDate']}")
    if unq(fm.get("funnelStage", "")) != cal["funnelStage"]:
        errs.append(f"funnelStage {fm.get('funnelStage')} != {cal['funnelStage']}")
    if unq(fm.get("author", "")) != "Aurum Avis Labs":
        errs.append('author must be "Aurum Avis Labs"')
    if fm.get("draft") != "true":
        errs.append("draft must be true")
    if unq(fm.get("site", "")) != "studio":
        errs.append(f"site {fm.get('site')} != studio")
    desc = unq(fm.get("description", ""))
    if not desc or len(desc) >= 160:
        errs.append(f"description length {len(desc)} (must be 1-159)")
    try:
        tags = json.loads(fm.get("tags", "[]"))
        if not (3 <= len(tags) <= 5):
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
    expect_rel = cal["relatedPosts_en" if lang == "en" else "relatedPosts_de"]
    if rel != expect_rel:
        errs.append(f"relatedPosts {rel} != calendar {expect_rel}")
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
    headings = [l for l in body.split("\n") if re.match(r"^#{1,6} ", l)]
    if not headings or not headings[0].startswith("## "):
        sample = headings[0][:50] if headings else "(no heading)"
        errs.append(f"first heading is not H2: {sample!r}")
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
    if "{" in body or "}" in body:
        errs.append("raw brace in body (breaks MDX)")
    for m in re.finditer(r'class="([^"]+)"', body):
        for cl in m.group(1).split():
            if cl not in BLOCKS:
                errs.append(f"unknown block class {cl}")
    if re.search(r"<img|!\[", body):
        errs.append("inline image")
    if "!" in re.sub(r"<[^>]+>|\]\([^)]*\)", "", body):
        warns.append("exclamation mark in body")
    if lang == "de":
        du = re.findall(r"\b(ihr|euch|euer|eure|euren|eurem|eurer|du|dich|dir|dein\w*|habt|seid|wollt|könnt|müsst)\b", body)
        if du:
            warns.append(f"possible du/ihr: {sorted(set(du))}")
    q = cal["query_en" if lang == "en" else "query_de"].lower()
    title = unq(fm.get("title", "")).lower()
    if q not in title:
        errs.append(f"title does not contain query {q!r}")
    if q not in body.lower():
        errs.append("query missing from body")
    links = re.findall(r"\]\((/[^)\s]*)\)", body) + re.findall(r'href="(/[^"]*)"', body)
    prefix = "/de/blog/" if lang == "de" else "/blog/"
    allowed = set(STUDIO_PAGES[lang])
    allowed.update(cal.get("crossLinks_en" if lang == "en" else "crossLinks_de", []))
    allowed.update(cal.get("portfolio_en" if lang == "en" else "portfolio_de", []))
    allowed.update(cal.get("bodyAlso_en" if lang == "en" else "bodyAlso_de", []))
    live = live_studio_slugs(lang)
    for l in links:
        l0 = l.split("#")[0].rstrip("/") or "/"
        if l0 in allowed:
            continue
        if l0.startswith(prefix):
            stem = l0[len(prefix):]
            t = SLUG[lang].get(stem)
            if t:
                if t["seq"] >= cal["seq"]:
                    errs.append(f"body link to {l0} (seq {t['seq']}) is not an earlier post (seq {cal['seq']})")
            elif stem not in live:
                errs.append(f"blog link not in this cluster or the live studio posts: {l0}")
        else:
            errs.append(f"internal link not allowed: {l0}")
    if lang == "en" and any(l.startswith("/de/") for l in links):
        errs.append("EN post links to a /de/ path")
    wc = words(body)
    if wc < 700 or wc > 1500:
        warns.append(f"word count {wc} outside 700-1500")
    return errs, warns, wc


def main():
    args = sys.argv[1:]
    if args[:1] == ["--plan"]:
        load_plan(REPO / "context" / "aurum" / "batches" / args[1])
        args = args[2:]
    owner = None
    if args[:1] == ["--owner"]:
        owner, args = args[1], args[2:]
    keys = set(args)
    files = []
    missing = 0
    for c in sorted(CAL, key=lambda c: c["seq"]):
        if keys and c["translationKey"] not in keys:
            continue
        if owner and c.get("owner") != owner:
            continue
        for lang in ("en", "de"):
            f = REPO / "brands" / "aurum" / lang / f"{c['en_slug' if lang == 'en' else 'de_slug']}.mdx"
            if f.exists():
                files.append((str(f), lang))
            else:
                missing += 1
                print(f"ERR {lang} {f.name}: file missing")
    studio = bool(CAL) and CAL[0].get("site") == "studio"
    total = missing
    for f, lang in files:
        e, w, wc = check_studio(f, lang) if studio else check(f, lang)
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
    print(f"files={len(files)} missing={missing} errors={total}")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
