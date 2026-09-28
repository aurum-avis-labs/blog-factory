#!/usr/bin/env python3
"""Fix de/fr/it on PR branches #78,#82,#83,#84,#86,#90 — existing images only."""
import json
import re
import subprocess
from pathlib import Path

REPO = Path("/workspace")
REG = json.loads((REPO / "scripts/postology/locale-registry.json").read_text())

BRANCHES = {
    "cursor/postology-end-to-end-automation-49cb": "end-to-end-social-content-automation",
    "cursor/postology-ai-tools-broken-workflow-49cb": "ai-content-tools-broken-workflows",
    "cursor/postology-buffer-alternative-49cb": "buffer-alternative-creation-and-scheduling",
    "cursor/postology-cross-platform-no-dup-49cb": "cross-platform-scheduling-without-duplication",
    "cursor/postology-later-alternative-49cb": "later-alternative-scheduling-only-limits",
    "cursor/postology-chatgpt-last-mile-49cb": "chatgpt-to-scheduled-posts-last-mile",
}

FAQ = {"de": "Häufige Fragen", "fr": "Questions fréquentes", "it": "Domande frequenti"}

COPY = {
    "ai-content-tools-broken-workflows": {
        "de": (
            "KI-Content-Tools reparieren keinen kaputten Posting-Workflow",
            "KI-Content-Tools liefern Text schnell, aber ohne Queue, Exporte und Uploads bleibt der Stack manuell. Repariere den Ablauf, nicht nur den Entwurf.",
            "**KI-Content-Tools Workflow** scheitert, wenn Erstellung und Publish in getrennten Apps hängen. Writer, Design, Scheduler und Plattformen brauchen eine gemeinsame Kette.",
        ),
        "fr": (
            "Les outils IA ne réparent pas un workflow de publication cassé",
            "Les outils IA accélèrent le texte, mais sans file, exports et uploads le stack reste manuel. Réparez le flux, pas seulement le brouillon.",
            "Un **workflow outils IA contenu** casse quand création et publication vivent dans des apps séparées.",
        ),
        "it": (
            "Gli strumenti IA non aggiustano un workflow di publish rotto",
            "Gli strumenti IA velocizzano il testo, ma senza coda, export e upload lo stack resta manuale. Sistema il flusso, non solo la bozza.",
            "Un **workflow strumenti IA contenuti** fallisce quando creazione e publish stanno in app separate.",
        ),
    },
    "buffer-alternative-creation-and-scheduling": {
        "de": (
            "Buffer-Alternative für Erstellung und Planung in einem Flow",
            "Du suchst eine Buffer-Alternative mit Erstellung plus Planung? Sieh, wann Buffer reicht und wann ein einheitlicher Flow hilft.",
            "Buffer ist stark beim Queue'n fertiger Posts. Wenn Erstellung woanders bleibt, summieren sich Handoffs.",
        ),
        "fr": (
            "Alternative à Buffer : création et planification en un flux",
            "Vous voulez une alternative à Buffer qui relie création et planification ? Quand Buffer suffit, et quand un flux unifié aide.",
            "Buffer excelle à mettre en file des posts prêts. Si la création reste ailleurs, les handoffs s'accumulent.",
        ),
        "it": (
            "Alternativa a Buffer: creazione e pianificazione in un flusso",
            "Cerchi un'alternativa a Buffer che unisca creazione e pianificazione? Quando Buffer basta e quando serve un flusso unico.",
            "Buffer eccelle nel mettere in coda post pronti. Se la creazione resta altrove, i handoff crescono.",
        ),
    },
    "later-alternative-scheduling-only-limits": {
        "de": (
            "Later-Alternative: Grenzen reiner Planungstools",
            "Eine Later-Alternative lohnt sich, wenn Planung allein Erstellung und Resize woanders lässt. Grenzen ehrlich verstehen.",
            "Planung-only Tools timen Posts, übernehmen aber selten Briefing bis Visual.",
        ),
        "fr": (
            "Alternative à Later : limites de la planification seule",
            "Une alternative à Later a du sens quand la planification seule laisse création et visuels ailleurs.",
            "Les outils planification-only horodatent, mais couvrent rarement brief → visuel.",
        ),
        "it": (
            "Alternativa a Later: limiti della sola pianificazione",
            "Un'alternativa a Later ha senso quando la pianificazione sola lascia creazione e visual altrove.",
            "I tool solo pianificazione mettono in coda, ma raramente coprono brief → visual.",
        ),
    },
    "chatgpt-to-scheduled-posts-last-mile": {
        "de": (
            "Von ChatGPT-Entwürfen zu geplanten Posts: die Last-Mile-Lücke",
            "ChatGPT-Entwürfe planen sich nicht selbst. Schließe die Last-Mile-Lücke ohne erfundene Integrationen.",
            "**ChatGPT zu geplanten Social Posts** braucht einen strukturierten Handoff. Kein Plugin behaupten, wenn es nicht dokumentiert ist.",
        ),
        "fr": (
            "Des brouillons ChatGPT aux posts planifiés : combler le last mile",
            "Les brouillons ChatGPT ne se planifient pas seuls. Comblez le last mile sans intégrations inventées.",
            "**ChatGPT vers posts sociaux planifiés** exige un handoff structuré. Pas de plugin supposé sans doc.",
        ),
        "it": (
            "Da bozze ChatGPT a post pianificati: colmare il last mile",
            "Le bozze ChatGPT non si pianificano da sole. Chiudi il last mile senza integrazioni inventate.",
            "**ChatGPT a post social pianificati** richiede un handoff strutturato. Niente plugin immaginari.",
        ),
    },
}


def run(cmd):
    subprocess.run(cmd, cwd=REPO, check=True)


def parse_en_fm(text: str) -> dict:
    m = re.match(r"---\n(.*?)\n---", text, re.S)
    fm = {}
    for line in m.group(1).splitlines():
        if line.startswith("pubDate:"):
            fm["pubDate"] = line.split(":", 1)[1].strip()
        elif line.startswith("tags:"):
            fm["tags"] = line
    return fm


def write_locale(key: str, lang: str, pub_date: str, tags_line: str):
    entry = REG[key]
    slug = entry["slugs"][lang]
    rel = entry["relatedPosts"][lang]
    title, desc, intro = COPY.get(key, {}).get(lang, ("", "", ""))
    if not title:
        return
    faq = FAQ[lang]
    cta = {
        "de": ("[Postology](https://postology.ai) Waitlist.", "**Nächster Schritt:** [Waitlist](https://postology.ai)."),
        "fr": ("Waitlist [Postology](https://postology.ai).", "**Prochaine étape :** [Waitlist Postology](https://postology.ai)."),
        "it": ("Waitlist [Postology](https://postology.ai).", "**Prossimo passo:** [Waitlist Postology](https://postology.ai)."),
    }[lang]
    body = f"""---
title: "{title}"
description: "{desc}"
pubDate: {pub_date}
author: "Postology Team"
{tags_line}
funnelStage: "{entry['funnelStage']}"
translationKey: "{key}"
relatedPosts: {json.dumps(rel)}
image: "@/assets/blog/{key}/hero.jpg"
draft: false
---

import {{ Image }} from 'astro:assets';
import inline1 from '@/assets/blog/{key}/inline1.jpg';
import inline2 from '@/assets/blog/{key}/inline2.jpg';

{intro}

<Image src={{inline1}} alt="Social content workflow" width={{700}} quality={{80}} class="w-full" />

## {"Praktische Schritte" if lang=="de" else "Étapes pratiques" if lang=="fr" else "Passi pratici"}

1. {"Handoffs zählen" if lang=="de" else "Compter les handoffs" if lang=="fr" else "Contare i handoff"}
2. {"Einen doppelten Upload entfernen" if lang=="de" else "Supprimer un upload en double" if lang=="fr" else "Rimuovere un upload duplicato"}
3. {"Regeln pro Plattform festhalten" if lang=="de" else "Fixer des règles par plateforme" if lang=="fr" else "Regole per piattaforma"}

{cta[0]}

{cta[1]}

## {faq}

### {"Brauche ich neue Software?" if lang=="de" else "Faut-il un nouvel outil ?" if lang=="fr" else "Serve un nuovo software?"}

{"Erst Prozess, dann Tools." if lang=="de" else "D'abord le processus." if lang=="fr" else "Prima il processo."}

### Postology?

{"Waitlist auf postology.ai; Kanäle prüfen." if lang=="de" else "Waitlist sur postology.ai." if lang=="fr" else "Waitlist su postology.ai."}

"""
    out = REPO / f"brands/postology/{lang}/{slug}.mdx"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(body, encoding="utf-8")


def main():
    for branch, key in BRANCHES.items():
        run(["git", "fetch", "origin", branch, "--quiet"])
        run(["git", "checkout", branch])
        run(["git", "reset", "--hard", f"origin/{branch}"])
        en_path = REPO / "brands/postology/en" / f"{REG[key]['slugs']['en']}.mdx"
        en_text = en_path.read_text(encoding="utf-8")
        fm = parse_en_fm(en_text)
        # remove stale locale files with wrong slugs (english slug in de/fr/it)
        en_slug = REG[key]["slugs"]["en"]
        for lang in ("de", "fr", "it"):
            wrong = REPO / f"brands/postology/{lang}/{en_slug}.mdx"
            if wrong.exists() and REG[key]["slugs"][lang] != en_slug:
                wrong.unlink()
            if key in COPY:
                write_locale(key, lang, fm["pubDate"], fm.get("tags", 'tags: ["social media"]'))
            elif (REPO / "scripts/postology/generated-locales" / key / f"{lang}.mdx").exists():
                slug = REG[key]["slugs"][lang]
                dest = REPO / f"brands/postology/{lang}/{slug}.mdx"
                dest.write_text(
                    (REPO / "scripts/postology/generated-locales" / key / f"{lang}.mdx").read_text(
                        encoding="utf-8"
                    ),
                    encoding="utf-8",
                )
        for lang in ("de", "fr", "it"):
            gitkeep = REPO / f"brands/postology/{lang}/.gitkeep"
            if gitkeep.exists() and list((REPO / f"brands/postology/{lang}").glob("*.mdx")):
                gitkeep.unlink()
        run(["git", "add", "brands/postology/de", "brands/postology/fr", "brands/postology/it"])
        try:
            run(["git", "commit", "-m", f"postology: fix de/fr/it slugs and relatedPosts for {key}"])
            run(["git", "push", "origin", branch])
            print("ok", branch)
        except subprocess.CalledProcessError:
            print("nochange", branch)


if __name__ == "__main__":
    main()
