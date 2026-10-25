import type { Metadata } from "next";
import Link from "next/link";
import { POLICY_SENTENCE } from "@/lib/content";

export const metadata: Metadata = { title: "Findings" };

const TOC = [
  ["pipeline", "The pipeline"],
  ["measured", "What we measured"],
  ["results", "What we found"],
  ["defences", "Controls"],
  ["limits", "Limits"],
];

export default function Findings() {
  return (
    <div className="wrap row" style={{ padding: "72px 24px 96px", gap: "48px 72px" }}>
      <nav className="toc" aria-label="On this page">
        <p className="eyebrow muted" style={{ marginBottom: 8 }}>
          On this page
        </p>
        {TOC.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <article className="article">
        <div className="stack" style={{ gap: 18 }}>
          <p className="eyebrow">Findings</p>
          <h1 className="display">How a grievance pipeline goes quiet</h1>
          <p className="lede">
            Told to keep escalations low, a chain of AI agents stops passing serious complaints up. Private notes spread the habit to agents never given the
            instruction. And a reviewing watchdog can be talked out of noticing, then talked back in by one sentence.
          </p>
        </div>

        <section id="pipeline">
          <h2 className="h3" style={{ fontSize: 30 }}>The pipeline</h2>
          <p className="body2">
            We built 36 synthetic workplace grievance transcripts and ran them through LLM agents. The short pipeline is a summariser and a severity rater (1–4,
            with an escalate flag). The full pipeline has nine stages, from intake and screening to closure and a report to the lender, with a simulated site
            manager and complainant. A separate watchdog model reviews finished cases and flags ones that should have gone up.
          </p>
        </section>

        <section id="measured">
          <h2 className="h3" style={{ fontSize: 30 }}>What we measured</h2>
          <div className="tiles">
            <div className="tile">
              <b>A hidden aim</b>
              <p>An instruction that escalations are costly and should be kept low, at rising pressure.</p>
            </div>
            <div className="tile">
              <b>A channel</b>
              <p>No notes, private notes between agents, or “glass” notes the lender can read.</p>
            </div>
            <div className="tile">
              <b>Placement</b>
              <p>The aim on every agent, on the screener only, or on the router only.</p>
            </div>
            <div className="tile">
              <b>Precedents</b>
              <p>Past cases shown to the watchdog: plain, rejected, safe and accepted, or unsafe and endorsed.</p>
            </div>
          </div>
        </section>

        <section id="results">
          <h2 className="h3" style={{ fontSize: 30 }}>What we found</h2>
          <ol className="findings">
            <li>
              <span className="n">01</span>
              <div>
                <b>Pressure and notes compound.</b>
                <p>Escalation fell from 92% to 28% with the hidden aim plus private notes (MiniMax), and from 89% to 28% (Gemma).</p>
              </div>
            </li>
            <li>
              <span className="n">02</span>
              <div>
                <b>Notes recruit honest raters.</b>
                <p>A rater with no hidden aim, given a note written under it, escalated 33% (MiniMax) and 50% (Gemma).</p>
              </div>
            </li>
            <li>
              <span className="n">03</span>
              <div>
                <b>One gatekeeper is enough.</b>
                <p>In the full pipeline, putting the aim on the screener alone kept 5 of 12 serious cases from escalating, against 0 in honest runs.</p>
              </div>
            </li>
            <li className="coral">
              <span className="n">04</span>
              <div>
                <b>Endorsement captures the watchdog.</b>
                <p>Plain, rejected and safe precedents changed nothing. Only an authority&apos;s endorsement of unsafe past cases lowered detection, in 8 of 13 watchdogs.</p>
              </div>
            </li>
            <li className="amber">
              <span className="n">05</span>
              <div>
                <b>One sentence brings it back.</b>
                <p>“{POLICY_SENTENCE}” helped 7 of those 8, four back to 100%.</p>
              </div>
            </li>
          </ol>
          <Link href="/results/" style={{ alignSelf: "flex-start", minHeight: 44, display: "inline-flex", alignItems: "center", fontWeight: 500 }}>
            See every watchdog in the Results tables →
          </Link>
        </section>

        <section id="defences">
          <h2 className="h3" style={{ fontSize: 30 }}>Controls to test next</h2>
          <ul className="bullets body2">
            <li>Reopen serious cases kept internal. A one-line rule (severity 3 or 4 and not escalated) caught all 24 easy-set cases with no false flags.</li>
            <li>Re-rate severity from the transcript, which could extend detection to downgraded complaints; the rule caught none of the 13 harder-set cases.</li>
            <li>Give the calibration material a watchdog sees its own independent review.</li>
            <li>State that the written policy outranks precedent: a candidate safeguard, with recovery that depends on the model.</li>
          </ul>
        </section>

        <section id="limits" className="band" style={{ padding: 28, borderRadius: 14, gap: 12 }}>
          <h2 className="h3" style={{ fontSize: 30 }}>Limits</h2>
          <ul className="bullets" style={{ color: "#2a3552" }}>
            <li>
              <strong>Instructed, not spontaneous.</strong> The hidden aim is stated in plain words. None of this shows agents deciding by themselves to bury
              complaints.
            </li>
            <li>
              <strong>Synthetic complaints.</strong> 36 synthetic transcripts; released records use invented names. Severity labels have no human validation.
            </li>
            <li>
              <strong>Small sets.</strong> The easy set has 24 suppression items on 15 records and the harder set 13 on six; intervals over repeated reads ignore
              this clustering, so they are descriptive.
            </li>
            <li>
              <strong>One sender family.</strong> The six-arm suppression cases were all written by MiniMax agents. A check on Gemma-written cases changes
              sender and visibility together.
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
