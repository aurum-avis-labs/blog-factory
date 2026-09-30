# Handoff an den Blog-Writer — Aurum Company (Prozess-Check)

**Stand:** 2026-09-30 · Cluster: KMU / KI-Automation → Prozess-Check  
**Repo:** `blog-factory` · Brand-Ordner: `brands/aurum/{de,en}/`  
**Site:** https://aurum-avis-labs.ch

Du arbeitest die Queue ab. Keine neue Strategie-Runde, keine Autopilot-Serie ohne Roberts Dienstag-Nod.

---

## 1. Diese Dateien lesen (in der Reihenfolge)

1. [`STRATEGY.md`](./STRATEGY.md) — ICP, Funnel, Live-URLs, Preise, Anti-Patterns, Split zum MVP-Cluster  
2. [`TOPIC-QUEUE.md`](./TOPIC-QUEUE.md) — 16 Topics inkl. Outline  
3. [`PUBLISHING.md`](./PUBLISHING.md) — Dienstag → Nod → Write → PR-Nod → Merge  
4. [`../../../AGENTS.md`](../../../AGENTS.md) — Frontmatter, `funnelStage`, `relatedPosts`  
5. [`../context-files/aurum_avis_labs_blogpost_image_instructions.md`](../context-files/aurum_avis_labs_blogpost_image_instructions.md)

[`../brand-context.md`](../brand-context.md) gilt für den **alten** Founder-/MVP-Cluster. Für neue Posts in den nächsten Wochen: **STRATEGY.md**.

Nicht lesen müssen: Product-ICPs, Outreach-Listen, ZIP-Packs.

---

## 2. CTA-Regel (nicht verhandeln)

**MOFU und BOFU enden mit Prozess-Check oder einer klaren Ausnahme** (in der Queue steht die Ausnahme: Workshop, Fork, oder `none`).

| Stufe | `funnelStage` | Default-CTA |
|-------|---------------|-------------|
| TOFU | `awareness` | Weich auf Angebot `/de/prozess-check` (EN: `/prozess-check`) |
| MOFU | `interest` | Angebot Prozess-Check |
| BOFU | `consideration` | Buchen `/de/prozess-check/buchen` (EN: `/prozess-check/buchen`) |

**Falsch:** `/de/buchen` (existiert nicht).  
**Falsch:** PVP/Scoping/MVP in diesem Cluster.  
**Falsch:** Workshop und Check als denselben Button.

Preise: CHF 99 pauschal, Anrechnung, Geld-zurück — nur aus STRATEGY Abschnitt 2, nicht aus `services.ts`.

---

## 3. Erste drei P0-Topics (Publish-Reihenfolge)

Nicht T01 zuerst. Woche 1–3 laut PUBLISHING:

| Woche | ID | Working title | Slug DE | Funnel | CTA |
|-------|-----|---------------|---------|--------|-----|
| 1 | T02 | Welchen Ablauf solltet ihr zuerst automatisieren? | `welchen-ablauf-zuerst-automatisieren` | MOFU | Angebot |
| 2 | T04 | Was der Prozess-Check ist — und was nicht | `was-der-prozess-check-ist` | BOFU | **Buchen** |
| 3 | T01 | Alle nutzen KI. Im Betrieb landet trotzdem nichts Greifbares. | `ki-im-betrieb-nichts-greifbares` | TOFU | Angebot (via Pillar T02) |

Woche 4: T03 `drei-ablaeufe-die-sich-lohnen`. Danach P1 nur nach Dienstag-Nod.

Jedes Topic: DE + EN im selben PR, EN-Slug steht in der Queue.

---

## 4. Schreib-Minimum

- de-CH (ss, keine ß), Anrede **Sie**, Body ab h2  
- `description` unter 160 Zeichen  
- 1–3 `relatedPosts` nur in diesem Cluster, Funnel-Alignment (Woche 1: leeres Array ok)  
- Keine erfundenen Kunden, keine fremden ROI-Prozente als eigene Zahl  
- Keine Product-Brand-Posts, kein Handwerk-Redesign, kein MVP-Rat

Tuesday-Ping-Vorlage: [`PUBLISHING.md`](./PUBLISHING.md).

---

## 5. Done für dich

Robert hat mindestens T02 als PR gesehen und kann nicken. Die restliche Queue liegt in TOPIC-QUEUE.md und wartet auf den wöchentlichen Nod.
