# ACT-Like Reading Lab

Unofficial ACT-like Reading practice generator. The app pulls public-domain excerpts from Project Gutenberg, sends the excerpt plus `question-construction.md` to Gemini, and saves generated practice sets locally and optionally to Cloudflare KV through the Worker in `cloudflare/`.

## Run Locally

Serve the folder from localhost so the PWA and markdown fetch work:

```powershell
cd "C:\ACT Prep"
python -m http.server 4173
```

Open `http://localhost:4173`.

## Use

1. Paste a Gemini API key.
2. Optionally paste your Cloudflare Worker URL and sync token.
3. Keep auto daily generation enabled, or click `Generate Today`.

The app generates two passage sets per day. Each set contains one public-domain passage and nine ACT-like questions.

## Cloudflare Setup

Create a KV namespace and put its ID into `cloudflare/wrangler.toml`.

```powershell
cd "C:\ACT Prep\cloudflare"
wrangler kv namespace create ACT_PASSAGES
wrangler secret put SYNC_TOKEN
wrangler deploy
```

Paste the deployed Worker URL and the same sync token into the app. If you do not set `SYNC_TOKEN`, the Worker accepts public reads and writes.

## PWA Notes

The app includes a manifest, install prompt, icon, and service worker. Installability requires localhost or HTTPS.

## Source Notes

This is not affiliated with ACT. Generated questions depend on Gemini output and should be reviewed before high-stakes study use.
