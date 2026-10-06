#!/usr/bin/env python3
"""Add de/fr/it for all LIVE Postology translationKeys on main."""
import json
import re
import subprocess
from pathlib import Path

REPO = Path("/workspace")
REG = json.loads((REPO / "scripts/postology/live-slug-registry.json").read_text())
TOP3_BRANCH = "origin/cursor/postology-top3-locales-49cb"

FAQ = {"de": "Häufige Fragen", "fr": "Questions fréquentes", "it": "Domande frequenti"}
CTA = {
    "de": ("[Postology](https://postology.ai) Waitlist.", "**Nächster Schritt:** [Waitlist](https://postology.ai)."),
    "fr": ("Waitlist [Postology](https://postology.ai).", "**Prochaine étape :** [Waitlist Postology](https://postology.ai)."),
    "it": ("Waitlist [Postology](https://postology.ai).", "**Prossimo passo:** [Waitlist Postology](https://postology.ai)."),
}

COPY = {
    "multi-platform-social-without-enterprise-team": {
        "de": (
            "Multi-Platform Social ohne Enterprise-Team",
            "Multi-Platform-Strategie für kleine Teams ohne Governance-Bloat: Formate, ein Review, realistische Kanäle.",
            "**Multi-Platform Social Strategie** ohne Enterprise-Team heißt: weniger Kanäle, klarere Formate, ein Review-Schritt.",
        ),
        "fr": (
            "Stratégie multi-plateforme sans équipe enterprise",
            "Stratégie social pour petites équipes : formats répétables, une revue, canaux réalistes.",
            "Une **stratégie multi-plateforme** sans équipe enterprise évite la gouvernance lourde.",
        ),
        "it": (
            "Strategia multi-piattaforma senza team enterprise",
            "Strategia social per team piccoli: format ripetibili, una review, canali realistici.",
            "Una **strategia multi-piattaforma** senza team enterprise evita governance pesante.",
        ),
    },
    "reduce-clicks-social-media-workflow-audit": {
        "de": (
            "Praxis-Audit: Klicks im Social-Workflow reduzieren",
            "Zähle Handoffs von Idee bis Publish und streiche doppelte Klicks, ohne ein weiteres Einzeltool.",
            "Ein **Social-Media-Workflow-Audit** macht sichtbar, wo du dieselbe Datei zweimal hochlädst.",
        ),
        "fr": (
            "Audit pratique : réduire les clics dans le workflow social",
            "Comptez les handoffs de l'idée à la publication et supprimez les clics redondants.",
            "Un **audit workflow social** montre où vous uploadez deux fois le même fichier.",
        ),
        "it": (
            "Audit pratico: ridurre i clic nel workflow social",
            "Conta i handoff dall'idea al publish e taglia clic ridondanti.",
            "Un **audit workflow social** mostra dove carichi due volte lo stesso file.",
        ),
    },
}


def run(cmd):
    subprocess.run(cmd, cwd=REPO, check=True, capture_output=True)


def parse_en(key: str) -> dict:
    en_slug = REG[key]["slugs"]["en"]
    text = (REPO / f"brands/postology/en/{en_slug}.mdx").read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---", text, re.S)
    fm = {}
    for line in m.group(1).splitlines():
        if line.startswith("pubDate:"):
            fm["pubDate"] = line.split(":", 1)[1].strip()
        elif line.startswith("tags:"):
            fm["tags"] = line
    fm["funnelStage"] = REG[key]["funnelStage"]
    return fm


def write_generated(key: str, lang: str, fm: dict):
    title, desc, intro = COPY[key][lang]
    slug = REG[key]["slugs"][lang]
    rel = REG[key]["relatedPosts"][lang]
    faq = FAQ[lang]
    cta = CTA[lang]
    tags = fm.get("tags", 'tags: ["social media"]')
    body = f"""---
title: "{title}"
description: "{desc}"
pubDate: {fm['pubDate']}
author: "Postology Team"
{tags}
funnelStage: "{fm['funnelStage']}"
translationKey: "{key}"
relatedPosts: {json.dumps(rel)}
image: "@/assets/blog/{key}/hero.webp"
draft: false
---

import {{ Image }} from 'astro:assets';
import inline1 from '@/assets/blog/{key}/inline1.webp';
import inline2 from '@/assets/blog/{key}/inline2.webp';

{intro}

<Image src={{inline1}} alt="Social content workflow" width={{700}} quality={{80}} class="w-full" />

## {"Praktische Schritte" if lang=="de" else "Étapes pratiques" if lang=="fr" else "Passi pratici"}

1. {"Handoffs aufschreiben" if lang=="de" else "Lister les handoffs" if lang=="fr" else "Elencare i handoff"}
2. {"Einen doppelten Upload entfernen" if lang=="de" else "Supprimer un upload en double" if lang=="fr" else "Rimuovere un upload duplicato"}
3. {"Regeln pro Plattform festhalten" if lang=="de" else "Fixer des règles par plateforme" if lang=="fr" else "Regole per piattaforma"}

{cta[0]}

{cta[1]}

## {faq}

### Postology?

{"Waitlist auf postology.ai." if lang=="de" else "Waitlist sur postology.ai." if lang=="fr" else "Waitlist su postology.ai."}

"""
    out = REPO / f"brands/postology/{lang}/{slug}.mdx"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(body, encoding="utf-8")


def copy_from_top3():
    mapping = {
        "too-much-clicking-after-ai-tools": ["de", "fr", "it"],
        "idea-to-post-manual-bottlenecks": ["de", "fr", "it"],
        "content-automation-vs-scheduling-tools": ["de", "fr", "it"],
    }
    for key, langs in mapping.items():
        for lang in langs:
            slug = REG[key]["slugs"][lang]
            src = f"{TOP3_BRANCH}:brands/postology/{lang}/{slug}.mdx"
            dest = REPO / f"brands/postology/{lang}/{slug}.mdx"
            dest.parent.mkdir(parents=True, exist_ok=True)
            p = subprocess.run(
                ["git", "show", src],
                cwd=REPO,
                capture_output=True,
                text=True,
                check=True,
            )
            text = p.stdout
            rel = REG[key]["relatedPosts"][lang]
            text = re.sub(
                r"^relatedPosts: .*",
                f"relatedPosts: {json.dumps(rel)}",
                text,
                count=1,
                flags=re.M,
            )
            dest.write_text(text, encoding="utf-8")


def patch_related_existing():
    for key in REG:
        for lang in ("de", "fr", "it"):
            slug = REG[key]["slugs"][lang]
            path = REPO / f"brands/postology/{lang}/{slug}.mdx"
            if not path.exists():
                continue
            text = path.read_text(encoding="utf-8")
            rel = REG[key]["relatedPosts"][lang]
            new = re.sub(
                r"^relatedPosts: .*",
                f"relatedPosts: {json.dumps(rel)}",
                text,
                count=1,
                flags=re.M,
            )
            if new != text:
                path.write_text(new, encoding="utf-8")


def fix_en_image_paths():
    path = REPO / "brands/postology/en/multi-platform-social-without-enterprise-team.mdx"
    if path.exists():
        t = path.read_text(encoding="utf-8")
        t = t.replace(
            "@/assets/blog/content-automation-vs-scheduling-tools/",
            "@/assets/blog/multi-platform-social-without-enterprise-team/",
        )
        path.write_text(t, encoding="utf-8")
    path2 = REPO / "brands/postology/en/reduce-clicks-social-media-workflow-audit.mdx"
    if path2.exists():
        t = path2.read_text(encoding="utf-8")
        t = t.replace(
            "@/assets/blog/content-automation-vs-scheduling-tools/",
            "@/assets/blog/reduce-clicks-social-media-workflow-audit/",
        )
        path2.write_text(t, encoding="utf-8")


def main():
    copy_from_top3()
    for key in ("multi-platform-social-without-enterprise-team", "reduce-clicks-social-media-workflow-audit"):
        fm = parse_en(key)
        for lang in ("de", "fr", "it"):
            write_generated(key, lang, fm)
    patch_related_existing()
    fix_en_image_paths()
    print("live locales applied")


if __name__ == "__main__":
    main()
