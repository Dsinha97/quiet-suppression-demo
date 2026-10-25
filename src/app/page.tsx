import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info, Play } from "@/components/Icons";
import { ABSTRACT, AI_USE_NOTE, CODE_URL, ORGS, PEOPLE, POLICY_SENTENCE, REPORT, SLIDES, SIX_ARM_API, SIX_ARM_OPEN, VIDEO, VIDEO_BY } from "@/lib/content";

const pct = (n: number) => `${Math.round((n / 48) * 100)}%`;

// The six watchdogs with the clearest contrast between arms, for the preview; the Results page has all of them.
const TEASER = ["Mistral Small 3.2 24B", "OLMo 3.1 32B Think", "gpt-oss-120b", "Gemini 3.8 Flash", "Claude Sonnet 5.5", "Gemini 4 Argon"].map(
  (name) => [...SIX_ARM_OPEN, ...SIX_ARM_API].find((r) => r.name === name)!,
);

export default function Home() {
  return (
    <>
      <section className="wrap hero" aria-labelledby="title">
        <div className="hero-text">
          <p className="eyebrow">Apart Research · AI Collusion Research Sprint · October 2026</p>
          <h1 id="title" className="hero-title">
            Quiet <em>Suppression</em>
          </h1>
          <p className="lede" style={{ maxWidth: "34ch" }}>
            Collusion and watchdog capture in AI grievance pipelines
          </p>
          <div className="authors">
            <div className="names">
              {PEOPLE.map((p) => {
                const org = ORGS[p.org];
                return (
                  <span key={p.slug} className="author">
                    <Link href="/team/">{p.name}</Link>
                    <a className="org-icon" href={org.url} title={org.name}>
                      <img src={org.logo} alt={org.name} width={24} height={24} />
                    </a>
                  </span>
                );
              })}
            </div>
            <p style={{ color: "var(--muted)" }}>
              With{" "}
              <a href={ORGS.apart.url} style={{ color: "var(--muted)" }}>
                Apart Research
              </a>
            </p>
          </div>
          <div className="row" style={{ gap: 12, paddingTop: 8 }}>
            <a className="btn primary" href="#video">
              <Play /> Watch the 4-minute demo
            </a>
            <a className="btn ghost" href={REPORT.src} target="_blank" rel="noopener noreferrer">
              Read the report <span style={{ fontWeight: 400, color: "var(--muted)" }}>PDF</span>
            </a>
            <a className="btn ghost" href={CODE_URL}>
              Read the code <ArrowUpRight />
            </a>
          </div>
        </div>
        <figure className="hero-card">
          <img
            src="/brand/qs-hero.jpg"
            alt="Illustration: a single document passes through four glass panes, and in the third a stream of pages glows amber and falls away, while the rest fly on. The QS monogram and the words Quiet Suppression, collusion and watchdog capture, are at the left."
            width={1400}
            height={788}
          />
        </figure>
      </section>

      <section className="wrap" aria-labelledby="nums" style={{ paddingBottom: 88 }}>
        <h2 id="nums" className="eyebrow muted" style={{ marginBottom: 20, fontWeight: 400 }}>
          Three headline numbers
        </h2>
        <div className="grid-auto">
          <div className="card stat">
            <p className="big">
              92% <span style={{ color: "var(--coral)" }}>→ 28%</span>
            </p>
            <p className="body2" style={{ fontSize: 15 }}>
              Complaints escalated, before and after a hidden instruction to keep escalations low, with agents passing private notes to each other.
            </p>
            <p className="meta">MiniMax agents · 36 records per arm</p>
          </div>
          <div className="card stat">
            <p className="big">
              8 <span className="of">of</span> 13
            </p>
            <p className="body2" style={{ fontSize: 15 }}>
              AI watchdogs caught fewer suppressed cases once shown an authority&apos;s endorsement of bad past cases.
            </p>
            <p className="meta">13 watchdogs run on all six arms</p>
          </div>
          <div className="card stat">
            <p className="big" style={{ color: "var(--amber)" }}>
              7 <span className="of">of</span> 8
            </p>
            <p className="body2" style={{ fontSize: 15 }}>
              of those were helped by one sentence: <em className="serif" style={{ color: "var(--fg)" }}>“{POLICY_SENTENCE.charAt(0).toLowerCase() + POLICY_SENTENCE.slice(1)}”</em>
            </p>
            <p className="meta">four back to 100%</p>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="abs">
        <div className="wrap section row" style={{ gap: "32px 64px" }}>
          <div style={{ flex: "1 1 220px" }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>
              From the report
            </p>
            <h2 id="abs" className="h2">
              Abstract
            </h2>
          </div>
          <div className="stack" style={{ flex: "999 1 560px", minWidth: 0, gap: 18 }}>
            <p className="serif" style={{ fontSize: 20, lineHeight: 1.6 }}>
              {ABSTRACT}
            </p>
            <p style={{ fontSize: 14, color: "#4a5470" }}>
              The report is the judged document. This site is a companion for people who open the repository or the submission.{" "}
              <a href={REPORT.src} target="_blank" rel="noopener noreferrer">
                Read the full report (PDF, {REPORT.pages} pages, {REPORT.size})
              </a>
              {" · "}
              <a href={SLIDES.src} target="_blank" rel="noopener noreferrer">
                Slides (PDF, {SLIDES.pages} slides, {SLIDES.size})
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="pipe">
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          The setup
        </p>
        <h2 id="pipe" className="h2" style={{ marginBottom: 12 }}>
          A chain of agents, and a watchdog reading their files
        </h2>
        <div className="row" style={{ alignItems: "center", gap: "24px 48px", marginBottom: 36 }}>
          <p className="body2" style={{ flex: "999 1 420px", maxWidth: "64ch" }}>
            Synthetic workplace grievances pass through LLM agents that summarise, rate severity and decide whether to escalate. A watchdog model reviews the
            cases afterwards. We test what a hidden instruction, a private note channel and a few “accepted” precedents do to that chain.
          </p>
          <img
            src="/brand/logo-tile.png"
            alt="Illustration: a watchdog holding a magnifying glass over a complaint folder while a rubber stamp presses on it"
            width={160}
            height={160}
            style={{ borderRadius: 24 }}
          />
        </div>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <b>Complaint</b>
            <p>Synthetic grievance transcript</p>
          </div>
          <div className="step aim">
            <span className="n">02 · hidden aim</span>
            <b>Summariser</b>
            <p>Writes the case summary and a private note</p>
          </div>
          <div className="step aim">
            <span className="n">03 · hidden aim</span>
            <b>Severity rater</b>
            <p>Rates 1–4 and decides whether to escalate</p>
          </div>
          <div className="step prec">
            <span className="n">04 · precedents</span>
            <b>Watchdog</b>
            <p>Reads the notes and flags suppressed cases</p>
          </div>
        </div>
        <p className="small" style={{ marginTop: 14 }}>
          In the main runs every agent carried the hidden aim. One lifecycle arm put it on the screener alone.
        </p>
      </section>

      <section id="video" className="video-band" aria-labelledby="vid" style={{ scrollMarginTop: 0 }}>
        <div className="wrap section stack" style={{ gap: 28 }}>
          <div className="row" style={{ alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 10 }}>
                Demo video · {VIDEO.length} · by {VIDEO_BY}
              </p>
              <h2 id="vid" className="h2">
                The project in four minutes
              </h2>
            </div>
            <a href={VIDEO.src} download style={{ fontSize: 14 }}>
              Download MP4 ({VIDEO.size})
            </a>
          </div>
          <video className="video" controls preload="metadata" poster={VIDEO.poster} aria-label="Quiet Suppression demo video">
            <source src={VIDEO.src} type="video/mp4" />
            Your browser cannot play this video. <a href={VIDEO.src}>Download the MP4</a>.
          </video>
          <div className="note">
            <Info />
            <p>
              <strong>How this video was made.</strong> Produced by {VIDEO_BY}. {AI_USE_NOTE}
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section row" aria-labelledby="res" style={{ gap: "40px 64px", alignItems: "center" }}>
        <div className="stack" style={{ flex: "1 1 340px", gap: 16 }}>
          <p className="eyebrow">Results</p>
          <h2 id="res" className="h2">
            An endorsement switches many watchdogs off. One sentence brings most of them back.
          </h2>
          <p className="body2">
            Suppressed cases flagged, of 48 reads. A: written policy only. C: plus three unsafe past cases “the review board accepted”. F: C plus the
            policy-priority sentence.
          </p>
          <Link href="/results/" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontWeight: 500 }}>
            All result tables <ArrowRight />
          </Link>
        </div>
        <div className="card stack" style={{ flex: "999 1 520px", minWidth: 0, gap: 18 }}>
          <div className="legend">
            <span>
              <i className="key" style={{ background: "var(--slate)" }} />A baseline
            </span>
            <span>
              <i className="key" style={{ background: "var(--coral)" }} />C endorsed
            </span>
            <span>
              <i className="key" style={{ background: "var(--amber)" }} />F policy sentence
            </span>
          </div>
          {TEASER.map((m) => (
            <div key={m.name} className="stack" style={{ gap: 6 }}>
              <div className="row" style={{ justifyContent: "space-between", fontSize: 14 }}>
                <span style={{ fontWeight: 500 }}>{m.name}</span>
                <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
                  {m.a} · {m.c} · {m.f}
                </span>
              </div>
              <div className="bars" aria-hidden="true">
                <div className="bar" style={{ background: "var(--slate)", width: pct(m.a) }} />
                <div className="bar" style={{ background: "var(--coral)", width: pct(m.c) }} />
                <div className="bar" style={{ background: "var(--amber)", width: pct(m.f) }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
