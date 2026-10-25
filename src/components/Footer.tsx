import { CODE_LABEL, CODE_URL, REPORT, SLIDES } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="brand" style={{ alignSelf: "flex-start" }}>
          <img src="/brand/qs-mark-dark-256.png" alt="" width={32} height={32} />
          <span style={{ fontSize: 18 }}>Quiet Suppression</span>
        </div>
        <div className="text">
          <p>
            The <a href={REPORT.src} target="_blank" rel="noopener noreferrer">report (PDF)</a> is the judged document (<a href={SLIDES.src} target="_blank" rel="noopener noreferrer">slides</a> are a short summary of it); this site is a companion to it. Code: <a href={CODE_URL}>{CODE_LABEL}</a>
          </p>
          <p>
            Site designed and built by Deepayan Sinha with Claude (Claude Code). Demo video by Liezl Coetzee, built and rendered by OpenAI Codex from
            Claude&apos;s brief and storyboard; voice-over by Revoicer text-to-speech. No cookies, forms or tracking.
          </p>
        </div>
      </div>
    </footer>
  );
}
