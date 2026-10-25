# Quiet Suppression: public demo site, plan

Owner: Deepayan Sinha. The report and its submission are handled by Liezl Coetzee and are out of scope here. This site is a showcase for people who open the repo or the submission, not a judged document (the organiser said judges score only the PDF).

Status: plan only, written 25 Oct 2026. Nothing is built or deployed.

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

Exclude: team bios and the team brief, member accounts and emails, invite and Drive and Discord links, case text and agent notes, raw result files, talk notes and transcript summaries, poll votes, the report's PDF (it stays on the Drive until Liezl publishes it).

## Hosting the video

Put the file in `public/video/` of this repository and serve it as a static file; Vercel supports seeking. The repository is public-bound, so the file is public, which is the intent. Alternative: Vercel Blob, which keeps 20 MB out of git, but needs a store in the Vercel account. A file-level Drive link does not expose the Drive folder, but hosting here removes the Drive from the submission altogether.

## Safety checks before the repository or the site is made public

1. Build, then search the output and the repository for email addresses, `drive.google.com`, `discord`, invite or token patterns, `sk-` style key patterns and any phrase from the case text.
2. Open every page in a private window, signed out.
3. Confirm there are no forms, cookies or server actions.
4. Only then make the repository public and send the link.

## Steps

- [ ] Create the private GitHub repository `Dsinha97/quiet-suppression-demo` and push this plan
- [ ] Scaffold the Next.js project (static export) with the site title and layout
- [ ] Copy the video from `sources/team/` into `public/video/` and add a poster frame
- [ ] Write the Home, Video, Results, Findings and How-we-worked pages from the report and the public repo tables
- [ ] Take screenshots of the team workspace's Results and pilot-status pages (no private data visible)
- [ ] Run the safety checks
- [ ] Create the Vercel project `quiet-suppression`, deploy, check in a private window
- [ ] Make the repository public and share the link (user's call)

## Decisions for the owner

- Repository visibility: private until the checks pass (default), public after.
- Video hosting: `public/` in git (default) or Vercel Blob.
- Custom domain: none (use the `vercel.app` address) unless wanted.
- Whether to link the site from the report: no, the report is Liezl's and is final.

## Risks

- The deadline is tonight; the report and its submission come first, and this site must not delay them.
- A 20.6 MB video in git stays in the history for good; if that is a concern, use Vercel Blob instead.
- The results tables are read from the research repository's published files; if those change, the site's numbers must be rechecked against the report.
