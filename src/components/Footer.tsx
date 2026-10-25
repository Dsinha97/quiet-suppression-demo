import { CODE_LABEL, CODE_URL } from "@/lib/content";

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
            The report is the judged document; this site is a companion to it. Code: <a href={CODE_URL}>{CODE_LABEL}</a>
          </p>
          <p>
            Built with Claude (Claude Code). Video illustrations, late slide edits and render by OpenAI Codex; voice-over by a built-in Revoicer
            text-to-speech voice. No cookies, forms or tracking.
          </p>
        </div>
      </div>
    </footer>
  );
}
