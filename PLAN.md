# Quiet Suppression: public demo site, plan

Owner: Deepayan Sinha. The report and its submission are handled by Liezl Coetzee and are out of scope here. This site is a showcase for people who open the repo or the submission, not a judged document (the organiser said judges score only the PDF).

Status: plan and logo assets only, 25 Oct 2026. The site is not built or deployed.

## Name and places

| Item | Value |
|---|---|
| Site title | Quiet Suppression |
| Subtitle | Collusion and watchdog capture in AI grievance pipelines |
| Local folder | `quiet-suppression-demo/` (this folder, its own git repository) |
| GitHub repository | `Dsinha97/quiet-suppression-demo`, private until the contents check below is done |
| Vercel project | `quiet-suppression` (a new project, not the team workspace's) |
| Video source | `sources/team/quiet-suppression-demo.mp4` (20.6 MB, 4:09), copied into `public/video/` of this project only |
| Research repository (linked, not copied) | `github.com/Dsinha97/outskiller-ai-safety-sprint`, the repository cited in the report |

The site itself does not use the team workspace's name or branding. The research repository's name appears only as the URL of the code link, because the report cites it.

## Logo and brand assets (done)

The logo (`logo.jpg`, 2048 x 2048, made by the owner) shows a watchdog silhouette holding a magnifying glass over a complaint folder, with a rubber stamp pressing on it. It carries the project's idea: a watchdog that reviews the files, and a stamp that can quietly decide what counts as routine.

The source file has a checkerboard "transparent" background baked into its pixels, so the background was removed by `scripts/make_assets.py` (finds the checker region connected to the border, makes it transparent, and turns the enclosed light areas, the lens and the folder paper, into clean white). Re-run `python scripts/make_assets.py` to regenerate everything in `assets/` (needs Pillow, NumPy and SciPy).

| File (in `assets/`) | Size | Use |
|---|---|---|
| `logo.png`, `logo-512.png`, `logo-256.png` | 1024, 512, 256 | Transparent mark, for light backgrounds |
| `logo-on-white.png` | 1024 | Mark on white, for documents and sharing |
| `logo-tile.png` | 1024 | Mark on a white rounded tile, for dark backgrounds (the navy folder vanishes on a navy page) |
| `icon-512.png`, `icon-192.png` | 512, 192 | Web app icons (tile style) |
| `apple-touch-icon.png` | 180 | iOS home screen (opaque) |
| `favicon.ico`, `favicon-32.png`, `favicon-16.png` | 16, 32, 48 | Browser tab icon |
| `og-image.png` | 1200 x 630 | Social card: tile, "Quiet Suppression" and the subtitle on navy |
| `palette.json` | | Colours found in the artwork |

Palette: amber `#E09228`, navy `#1B294A`, coral accent `#E67864`, white, and the page background navy `#0B1224` used in the social card. The video uses the same amber, navy and coral.

Notes and limits:
- Use the tile version on the site's dark header; the plain transparent mark only on light backgrounds.
- At 16 px the mark reads as an amber and navy blob; at 32 px the dog, folder and stamp are recognisable. If a sharper tab icon is wanted, make a simplified mark (dog head only) for 16 and 32 px.
- The magnifier glass is solid white, not see-through.

## Why a separate site

The team workspace (`outskiller-website`) is a login-only app with a database of bios, invite links, Drive and Discord links, accounts and votes. It cannot be opened to the public. This site is separate: static pages, no database, no login, no forms, no cookies, and only content listed below.

## Phase 1: static showcase (do first)

A small Next.js project exported as a static site. About an hour.

Pages:
1. **Home.** Title, the report's abstract, three headline numbers (escalation 92% to 28% with the hidden instruction plus private notes; endorsement lowered detection in 8 of 13 watchdogs; the policy sentence helped 7 of those 8), authors and affiliations as printed in the report, link to the code repository.
2. **Video.** The demo video in a standard `<video controls preload="metadata">` player with a poster frame, and the AI-use note under it: built with Claude (Claude Code), with OpenAI Codex generating the illustrations, making late slide edits and rendering the video; the voice-over is a standard built-in Revoicer text-to-speech voice; no background music; all figures are taken from the report.
3. **Results.** The summary tables the research repository already publishes (six-arm and harder set, A / C / F, open-weight and API watchdogs, the seed-1 repeat of Qwen and Mistral), as read from the public repository's tables. No case text.
4. **Findings.** A readable version of the grievance pilot findings: what the pipeline is, what was measured, the headline results and the limits (instructed suppression, synthetic complaints, small cells, one sender family).
5. **How we worked.** A short section on the team workspace we used, with a few screenshots of its Results and pilot-status pages (screenshots only; the app is not public).
6. **Footer.** Code link, "the report is the judged document", and the AI-use note.

Out of scope for Phase 1: anything interactive, search, accounts.

## Phase 2: read-only version of the real app (optional, after the deadline)

A demo-mode flag on the team app: middleware no longer redirects to sign-in, every server action is disabled, content comes from a filtered seed file instead of the database, and the Members, Team, Talks, Approvals and Me pages are removed. About 14 routes, a few hours, more risk. Only if wanted.

## Content whitelist

Include: report abstract and headline numbers, the public repo's summary tables, the findings (as written for this site, no case text), paper and concept summaries of public papers if Phase 2 happens, the demo video, screenshots of results and pilot-status pages.

Exclude: team bios and the team brief, member accounts and emails, invite and Drive and Discord links, case text and agent notes, raw result files, talk notes and transcript summaries, poll votes. The report's PDF was excluded until Liezl shared the final version (25 Oct); it is now served at `/report/quiet-suppression-report.pdf`.

## Hosting the video

Put the file in `public/video/` of this repository and serve it as a static file; Vercel supports seeking. The repository is public-bound, so the file is public, which is the intent. Alternative: Vercel Blob, which keeps 20 MB out of git, but needs a store in the Vercel account. A file-level Drive link does not expose the Drive folder, but hosting here removes the Drive from the submission altogether.

## Safety checks before the repository or the site is made public

1. Build, then search the output and the repository for email addresses, `drive.google.com`, `discord`, invite or token patterns, `sk-` style key patterns and any phrase from the case text.
2. Open every page in a private window, signed out.
3. Confirm there are no forms, cookies or server actions.
4. Only then make the repository public and send the link.

## Steps

- [x] Create the private GitHub repository `Dsinha97/quiet-suppression-demo` and push this plan
- [x] Logo made, background removed, icons and social card generated (`assets/`, `scripts/make_assets.py`)
- [x] Scaffold the Next.js project (static export) with the site title, layout, favicon set and social-card metadata; header uses the new QS monogram (`QSlogo1.png`, assets from `scripts/make_qs_assets.py`)
- [x] Copy the video from `sources/team/` into `public/video/`; the poster is the social card (no ffmpeg here to grab a frame)
- [x] Write the Home (with the video), Results, Findings and Team pages. The How-we-worked section and its screenshots were dropped after the mockup review (25 Oct)
- [x] Recheck every number in `src/lib/content.ts` against the report (Tables D3, D6, D7, E1, E2) and the public repo's precedent-arms results note (25 Oct); added the first four watchdogs and the API harder-set rows, and aligned the Findings limits and controls with the report
- [x] Safety checks 1 and 3: `npm run check` finds no emails, Drive or Discord links, invite or key patterns, forms or cookie writes; the built pages make no third-party requests
- [x] Safety check 2: every page, the video and the social card load signed out at `quiet-suppression.vercel.app`, with no cookies or third-party requests (25 Oct)
- [x] Create the Vercel project `quiet-suppression`, deploy, check signed out: live at https://quiet-suppression.vercel.app (25 Oct)
- [x] Make the repository public (25 Oct); sharing the link is the owner's call

## Decisions for the owner

- Repository visibility: private until the checks pass (default), public after.
- Video hosting: `public/` in git (default) or Vercel Blob.
- Custom domain: none (use the `vercel.app` address) unless wanted.
- Whether to link the site from the report: no, the report is Liezl's and is final.

## Risks

- The deadline is tonight; the report and its submission come first, and this site must not delay them.
- A 20.6 MB video in git stays in the history for good; if that is a concern, use Vercel Blob instead.
- The results tables are read from the research repository's published files; if those change, the site's numbers must be rechecked against the report.
