# Blog Factory Tool

Local AI-powered blog writing tool for Aurum Avis Labs brands.

## Quick Start

1. **Fill in secrets** in `tool/.env.local` (copy the template, add your real keys)
2. **Install dependencies:**
   ```bash
   cd tool && npm install
   ```
3. **Start the tool** (from repo root):
   ```bash
   npm run tool
   ```
4. Open **http://localhost:3000** in your browser

## Environment Variables (`tool/.env.local`)

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_PAT` | ✓ | Push generated content to this repo |
| `ANTHROPIC_API_KEY` | One of | Claude for text generation |
| `AZURE_OPENAI_ENDPOINT` | One of | Azure OpenAI for text + DALL-E images |
| `AZURE_OPENAI_API_KEY` | One of | Azure OpenAI auth |
| `AZURE_OPENAI_DEPLOYMENT` | if Azure | Text model name (default: `gpt-4o`) |
| `AZURE_DALLE_DEPLOYMENT` | optional | Image model name (default: `dall-e-3`) |
| `PORT` | optional | Server port (default: `3000`) |

## Workflow

1. **Generate tab** — select brand, enter topic, choose languages & images, hit Generate
2. **Preview tab** — review the MDX source per language and generated images
3. Hit **Approve & Push** — files go straight to `main` on GitHub
4. The `auto-publish.yml` workflow fires automatically and rebuilds affected landing pages

## What gets pushed

| File | Path |
|---|---|
| MDX (per language) | `brands/{brand}/{lang}/{slug}.mdx` |
| Images | `brands/{brand}/images/{slug}/img1.png`, `img2.png`, … |

Never touch `.github/` — workflows are already configured.
