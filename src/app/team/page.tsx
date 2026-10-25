import type { Metadata } from "next";
import { ORGS, PEOPLE, WHO_DID_WHAT } from "@/lib/content";

export const metadata: Metadata = { title: "Team" };

export default function Team() {
  return (
    <div className="wrap stack" style={{ padding: "72px 24px 96px", gap: 64 }}>
      <div className="stack" style={{ maxWidth: "70ch", gap: 16 }}>
        <p className="eyebrow">Team · with Apart Research</p>
        <h1 className="display">
          Three authors, <em>two</em> organisations
        </h1>
        <p className="body2">Authors and affiliations as printed in the report, with who did what.</p>
      </div>

      <section className="grid-auto" aria-label="Authors" style={{ gap: 20 }}>
        {PEOPLE.map((p) => {
          const org = ORGS[p.org];
          return (
            <article key={p.slug} id={p.slug} className="card person">
              <div className="head">
                <span className="avatar" aria-hidden="true" style={{ background: p.swatch }}>
                  {p.initials}
                </span>
                <div>
                  <h2>{p.name}</h2>
                  <p className="where">
                    <a href={org.url} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <img src={org.logo} alt="" width={18} height={18} />
                      {org.name}
                    </a>
                    <span aria-hidden="true">·</span>
                    {p.place}
                  </p>
                </div>
              </div>
              {p.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              <div className="contrib">
                <p className="eyebrow">Contribution</p>
                <p>{p.contribution}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="stack" aria-labelledby="who" style={{ gap: 18 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
          <h2 id="who" className="h3">
            Who did what
          </h2>
          <span className="mono small">from the report&apos;s Author Contributions and Appendix B, plus the video and site</span>
        </div>
        <div className="table-box">
          <table className="t">
            <thead>
              <tr>
                <th scope="col">Work</th>
                <th scope="col">When</th>
                {PEOPLE.map((p) => (
                  <th key={p.slug} scope="col" className="c">
                    {p.name.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WHO_DID_WHAT.map((w) => (
                <tr key={w.work}>
                  <th scope="row">{w.work}</th>
                  <td className="mono" style={{ fontSize: 13, color: "var(--muted)" }}>
                    {w.when || "—"}
                  </td>
                  {PEOPLE.map((p) => (
                    <td key={p.slug} className="c">
                      {w.who.includes(p.slug as (typeof w.who)[number]) ? (
                        <span className="dot" role="img" aria-label={p.name} style={{ background: p.swatch }} />
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">Runs up to 22 October are prior work; the report&apos;s Appendix B gives the split. All work used AI coding assistance, described in the report&apos;s LLM Usage Statement.</p>
      </section>

      <section className="band row" style={{ padding: 28, borderRadius: 14, alignItems: "center", gap: "20px 32px" }}>
        <img src="/brand/qs-mark-160.png" alt="" width={72} height={72} />
        <p className="serif" style={{ flex: "1 1 360px", fontSize: 20, lineHeight: 1.45 }}>
          Made for the Apart Research AI Collusion Research Sprint, 23–25 October 2026.
        </p>
      </section>
    </div>
  );
}
