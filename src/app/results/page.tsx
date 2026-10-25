import type { Metadata } from "next";
import { HARD_OPEN, type Row, SEED_REPEAT, SIX_ARM_API, SIX_ARM_OPEN } from "@/lib/content";

export const metadata: Metadata = { title: "Results" };

const pct = (n: number) => `${Math.round((n / 48) * 100)}%`;

function SixArmRows({ rows }: { rows: Row[] }) {
  return rows.map((r) => (
    <tr key={r.name}>
      <th scope="row">{r.name}</th>
      <td className="n">{r.a}</td>
      <td className="n cc">{r.c}</td>
      <td className="n ff">{r.f}</td>
      <td>
        <div className="drop" aria-hidden="true">
          <div className="fill" style={{ width: pct(r.c) }} />
          <div className="tick" style={{ left: pct(r.a) }} />
        </div>
      </td>
    </tr>
  ));
}

export default function Results() {
  return (
    <div className="wrap stack" style={{ padding: "72px 24px 96px", gap: 64 }}>
      <div className="stack" style={{ maxWidth: "70ch", gap: 16 }}>
        <p className="eyebrow">Results</p>
        <h1 className="display">What the watchdogs caught</h1>
        <p className="body2">Each watchdog reads suppression cases with the written escalation policy stated first. Cells count suppressed cases flagged. No case text is shown.</p>
        <div className="row" style={{ gap: "8px 20px", fontSize: 14, color: "var(--fg2)" }}>
          <span>
            <strong className="mono">A</strong> written policy only
          </span>
          <span>
            <strong className="mono" style={{ color: "var(--coral)" }}>
              C
            </strong>{" "}
            plus unsafe past cases an authority endorsed
          </span>
          <span>
            <strong className="mono" style={{ color: "var(--amber)" }}>
              F
            </strong>{" "}
            C plus the policy-priority sentence
          </span>
        </div>
      </div>

      <section className="stack" aria-labelledby="t1" style={{ gap: 18 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
          <h2 id="t1" className="h3">
            Six-arm set <span className="sub">· flagged of 48 reads</span>
          </h2>
          <span className="mono small">arms B, D, E in the repository tables</span>
        </div>
        <div className="table-box">
          <table className="t">
            <thead>
              <tr>
                <th scope="col">Watchdog</th>
                <th scope="col" className="n">A</th>
                <th scope="col" className="n">C</th>
                <th scope="col" className="n">F</th>
                <th scope="col" style={{ width: "34%" }}>Endorsement drop (A → C)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="grp">
                <td colSpan={5}>Open-weight · Modal, vLLM, temperature 0.7</td>
              </tr>
              <SixArmRows rows={SIX_ARM_OPEN} />
              <tr className="grp">
                <td colSpan={5}>API watchdogs</td>
              </tr>
              <SixArmRows rows={SIX_ARM_API} />
              <tr className="grp">
                <td colSpan={5}>Original four · MiniMax, Gemma, GLM, Nemotron</td>
              </tr>
              <tr>
                <td colSpan={5} className="body2">
                  All 48 of 48 at A and F; 24–41 of 48 at C. Per-model counts are in the repository tables.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="small">
          Bar: share flagged at C. Tick: baseline A. False flags for the original four: 5 of 1,152 escalated-benign reads and 1 of 288 compliant kept-internal reads.
        </p>
      </section>

      <section className="row" aria-labelledby="t2" style={{ gap: 24 }}>
        <div className="stack" style={{ flex: "999 1 560px", minWidth: 0, gap: 18 }}>
          <h2 id="t2" className="h3">
            Harder set <span className="sub">· flagged of 26</span>
          </h2>
          <div className="table-box">
            <table className="t narrow">
              <thead>
                <tr>
                  <th scope="col">Watchdog</th>
                  <th scope="col" className="n">A</th>
                  <th scope="col" className="n">C</th>
                  <th scope="col" className="n">F</th>
                </tr>
              </thead>
              <tbody>
                {HARD_OPEN.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td className="n">{r.a}</td>
                    <td className="n cc">{r.c}</td>
                    <td className="n ff">{r.f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="stack" style={{ flex: "1 1 300px", alignSelf: "stretch", padding: 24, borderRadius: 14, border: "1px solid rgba(230,120,100,0.45)", gap: 10 }}>
          <p className="eyebrow" style={{ color: "var(--coral-text)" }}>
            The limit
          </p>
          <p style={{ color: "var(--fg3)" }}>
            Here the severity rating itself hides the violation (13 suppression cases, 6 records). Baselines are low and the policy sentence recovers little. The
            set&apos;s threshold was set while building it, so treat it as exploratory.
          </p>
        </div>
      </section>

      <section className="stack" aria-labelledby="t3" style={{ gap: 18 }}>
        <h2 id="t3" className="h3">
          A second sample <span className="sub">· engine seed 1 against seed 0</span>
        </h2>
        <div className="table-box">
          <table className="t">
            <thead>
              <tr>
                <th scope="col">Watchdog</th>
                <th scope="col">Set</th>
                <th scope="col" className="n">Seed 0 · A / C / F</th>
                <th scope="col" className="n">Seed 1 · A / C / F</th>
              </tr>
            </thead>
            <tbody>
              {SEED_REPEAT.map((r) => (
                <tr key={r.name + r.set}>
                  <th scope="row">{r.name}</th>
                  <td>{r.set}</td>
                  <td className="n">{r.seed0}</td>
                  <td className="n">{r.seed1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">Mistral&apos;s drop under endorsement, and the policy sentence&apos;s failure to fix it, repeat. Qwen again shows no clear drop.</p>
      </section>
    </div>
  );
}
