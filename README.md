# Quiet Suppression: public demo site

A static companion site for the report *Quiet Suppression: Collusion and Watchdog Capture in AI Grievance Pipelines* (Apart Research AI Collusion Research Sprint, October 2026). The report is the judged document; this site only showcases it. The research code lives at [github.com/Dsinha97/outskiller-ai-safety-sprint](https://github.com/Dsinha97/outskiller-ai-safety-sprint).

All code here was written on 25 October 2026, during the sprint. Nothing in this repository is preexisting.

## Pages

Home (abstract, headline numbers, demo video), Results, Findings and Team. No database, login, forms, cookies or third-party requests: fonts are downloaded at build time and served from the site.

## Run it

```bash
npm install
npm run build      # static export to out/
npm run check      # pre-publication safety check (see PLAN.md)
python -m http.server 4173 -d out
```

Set `NEXT_PUBLIC_SITE_URL` to the final address before building, so the social card links are absolute (default `https://quiet-suppression.vercel.app`).

## Where things are

- `src/lib/content.ts`: every number and sentence the site shows. Recheck the tables here against the report and the research repository before publishing.
- `public/`: brand files, icons, the social card, the partner logos and the video (`public/video/`, 20.6 MB).
- `assets/` and `scripts/make_qs_assets.py`: the source logo and the generated brand assets.

## AI use

The site was built with Claude (Claude Code). For the demo video, Claude prepared the brief and storyboard and reviewed each version; OpenAI Codex built the video, generated its ten illustrations, aligned the captions and rendered the exports. The voice-over uses Revoicer text-to-speech, with no background music.
