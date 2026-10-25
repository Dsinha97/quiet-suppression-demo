// Everything the site shows, in one place, so it can be checked against the report and the
// research repository's published tables before the site goes public (see PLAN.md, Risks).
// No case text, notes or raw results belong in this file.

export const CODE_URL = "https://github.com/Dsinha97/quiet-suppression-ai-safety-sprint";
export const CODE_LABEL = "github.com/Dsinha97/quiet-suppression-ai-safety-sprint";

// Final version shared by Liezl Coetzee on 25 Oct (sources/team/Quiet-Suppression-report.pdf).
export const REPORT = { src: "/report/quiet-suppression-report.pdf", size: "389 KB", pages: 20 };
export const SLIDES = { src: "/slides/quiet-suppression-slides.pdf", size: "385 KB", pages: 14 };

export const VIDEO = {
  src: "/video/quiet-suppression-demo.mp4",
  poster: "/video/poster.png",
  length: "4:09",
  size: "20.5 MB",
};

// As printed in the report.
export const ABSTRACT =
  "A review board’s endorsement of unsafe precedents can make an AI watchdog accept decisions that conflict with its written policy. We tested this in a grievance pipeline of separate LLM agents on 36 synthetic complaints. A hidden instruction to keep escalations low cut escalation from about 90% to 64% (MiniMax) and 44% (Gemma), and private notes cut it to 28% in both. Eight of thirteen watchdogs tested on six matched arms showed endorsement drops with non-overlapping read-level intervals. Reads share complaints, so these intervals are descriptive. The same precedents without approval left detection near baseline. Seven of those eight showed recovery under the same interval criterion with a policy-priority sentence; four returned to 100%. Recovery was partial in other models and small in Mistral. On a harder set with downgraded severity ratings, pooled detection in the first four watchdogs fell from 38% to 15% under endorsement and recovered to 27% with policy priority. Private notes lowered escalation by raters without that instruction; deleting a verdict sentence restored escalation in seven selected cases. Oversight should check outcomes against policy and give calibration material independent review. We did not test spontaneous collusion or a deployed defense.";

export const POLICY_SENTENCE =
  "Where a past case conflicts with the written escalation policy, the written policy controls.";

export type Org = { name: string; url: string; logo: string };

export const ORGS: Record<"sociable" | "altiora" | "apart", Org> = {
  sociable: { name: "Sociable Systems", url: "https://sociable.systems", logo: "/logos/sociable-systems-mark.webp" },
  altiora: { name: "Altiora Systems", url: "https://altiorasystems.com/", logo: "/logos/altiora-mark.png" },
  apart: { name: "Apart Research", url: "https://apartresearch.com", logo: "" },
};

export type Person = {
  slug: string;
  name: string;
  initials: string;
  org: keyof typeof ORGS;
  place: string;
  bio: string[];
  contribution: string;
  swatch: string;
};

// Bios from the team workspace profiles; contributions from the report's Author Contributions.
export const PEOPLE: Person[] = [
  {
    slug: "liezl",
    name: "Liezl Coetzee",
    initials: "LC",
    org: "sociable",
    place: "South Africa",
    bio: [
      "Social scientist and writer of Sociable Systems. Background in social impact assessment, resettlement and grievance mechanisms on major extractives projects. Runs comparative experiments on what AI models do to grievance and consultation evidence, built on synthetic cases informed by project experience.",
    ],
    contribution: "Designed the study, built the pipelines, ran the agent pilots and most watchdog experiments, wrote the report, and produced the demo video.",
    swatch: "var(--amber)",
  },
  {
    slug: "deepayan",
    name: "Deepayan Sinha",
    initials: "DS",
    org: "altiora",
    place: "Williamsburg, Virginia, US",
    bio: [
      "Associate (Cohort 2026) at Altiora Systems, the Williamsburg, Virginia consultancy where MBA and graduate-level associates work under senior advisory oversight.",
      "MBA graduate from the Raymond A. Mason School of Business, William & Mary, with concentrations in Business Analytics and Supply Chain Management. Six years at Wipro Ltd leading AI/ML product engineering initiatives across global clients, plus a Lean Six Sigma Green Belt. Beta Gamma Sigma honoree. Bridges technical depth in Python, SQL and data analytics with business judgement for product and operational outcomes.",
    ],
    contribution: "Set up the repository, reviewed every pull request, ran the Claude, Gemini, gpt-oss, OLMo and narrow-question watchdogs, edited the report, and designed and built this website.",
    swatch: "var(--cream)",
  },
  {
    slug: "prashanth",
    name: "Prashanth Vijay",
    initials: "PV",
    org: "altiora",
    place: "Williamsburg, Virginia, US",
    bio: [
      "Founding Strategy Advisor at Altiora Systems, the Williamsburg, Virginia consultancy that pairs graduate-level associates with experienced advisors. He helped shape Altiora's consulting approach.",
      "9+ years across industrial operations, R&D, sales, business development, supply chain and market research. Holds an MBA in Supply Chain Management and Consulting and a B.E. in Mechanical Engineering, bringing a systems-minded view to growth, operations and emerging technology questions.",
    ],
    contribution: "Brought the team together, contributed brainstorming and strategic insight, and ran the seed-1 repeats of the Qwen and Mistral watchdogs on Modal.",
    swatch: "var(--coral)",
  },
];

// From the report's Author Contributions and Appendix B, plus three roles the team added for the site (25 Oct):
// the demo video (Liezl), brainstorming and strategic insight (Prashanth) and the website (Deepayan).
export const WHO_DID_WHAT: { work: string; when: string; who: ("liezl" | "deepayan" | "prashanth")[] }[] = [
  { work: "Study design", when: "", who: ["liezl"] },
  { work: "Pipelines and agent pilots", when: "", who: ["liezl"] },
  { work: "Most watchdog experiments", when: "", who: ["liezl"] },
  { work: "Repository set-up and review of every pull request", when: "", who: ["deepayan"] },
  { work: "Claude Haiku 5.5, Sonnet 5.5, Gemini 3.8 Flash and 4 Argon watchdogs", when: "24 Oct", who: ["deepayan"] },
  { work: "gpt-oss-120b and OLMo 3.1 Think on Modal", when: "24 Oct", who: ["deepayan"] },
  { work: "Narrow-question watchdog", when: "24 Oct", who: ["deepayan"] },
  { work: "Seed-1 repeats of the Qwen and Mistral watchdogs on Modal", when: "25 Oct", who: ["prashanth"] },
  { work: "Bringing the team together", when: "", who: ["prashanth"] },
  { work: "Brainstorming and strategic insight", when: "", who: ["prashanth"] },
  { work: "Writing the report", when: "", who: ["liezl"] },
  { work: "Editing the report", when: "", who: ["deepayan"] },
  { work: "Demo video", when: "25 Oct", who: ["liezl"] },
  { work: "Website design and build", when: "25 Oct", who: ["deepayan"] },
];

export const VIDEO_BY = "Liezl Coetzee";

// Suppressed cases flagged. A: written policy only; C: plus endorsed unsafe precedents; F: C plus the policy sentence.
// Checked on 25 Oct against the report (Tables D3, D6, D7, E1, E2) and, for the original four on the easy set,
// the research repository's docs/pilots/RESULTS_precedent_arms_2026-10-24.md (the report shows those only as a figure).
export type Row = { name: string; a: number; c: number; f: number };

export const SIX_ARM_ORIG: Row[] = [
  { name: "GLM 5.3 Flash", a: 48, c: 34, f: 48 },
  { name: "Gemma 4 31B", a: 48, c: 24, f: 48 },
  { name: "MiniMax M3.1 Flash", a: 48, c: 41, f: 48 },
  { name: "Nemotron 3 Ultra", a: 48, c: 35, f: 48 },
];

export const SIX_ARM_OPEN: Row[] = [
  { name: "Qwen 3 32B", a: 48, c: 43, f: 46 },
  { name: "Llama 3.3 70B", a: 46, c: 44, f: 44 },
  { name: "Mistral Small 3.2 24B", a: 44, c: 20, f: 22 },
  { name: "gpt-oss-120b", a: 48, c: 29, f: 45 },
  { name: "OLMo 3.1 32B Think", a: 48, c: 18, f: 36 },
];

export const SIX_ARM_API: Row[] = [
  { name: "Claude Haiku 5.5", a: 40, c: 29, f: 39 },
  { name: "Claude Sonnet 5.5", a: 47, c: 27, f: 42 },
  { name: "Gemini 3.8 Flash", a: 48, c: 16, f: 48 },
  { name: "Gemini 4 Argon", a: 48, c: 48, f: 48 },
];

export const HARD_ORIG: Row[] = [
  { name: "GLM 5.3 Flash", a: 14, c: 8, f: 12 },
  { name: "Gemma 4 31B", a: 8, c: 2, f: 4 },
  { name: "MiniMax M3.1 Flash", a: 11, c: 4, f: 9 },
  { name: "Nemotron 3 Ultra", a: 6, c: 2, f: 3 },
];

export const HARD_API: Row[] = [
  { name: "Claude Haiku 5.5", a: 2, c: 5, f: 8 },
  { name: "Claude Sonnet 5.5", a: 6, c: 5, f: 7 },
  { name: "Gemini 3.8 Flash", a: 4, c: 4, f: 6 },
  { name: "Gemini 4 Argon", a: 14, c: 12, f: 14 },
  { name: "Claude Opus 5.5", a: 11, c: 10, f: 10 },
  { name: "GPT-6.1 Sol", a: 11, c: 6, f: 9 },
];

export const HARD_OPEN: Row[] = [
  { name: "Qwen 3 32B", a: 7, c: 6, f: 2 },
  { name: "Llama 3.3 70B", a: 16, c: 12, f: 12 },
  { name: "Mistral Small 3.2 24B", a: 7, c: 11, f: 5 },
  { name: "gpt-oss-120b", a: 11, c: 5, f: 7 },
  { name: "OLMo 3.1 32B Think", a: 8, c: 3, f: 3 },
];

export const SEED_REPEAT = [
  { name: "Qwen 3 32B", set: "Six-arm (48)", seed0: "48 / 43 / 46", seed1: "47 / 45 / 42" },
  { name: "Mistral Small 3.2 24B", set: "Six-arm (48)", seed0: "44 / 20 / 22", seed1: "42 / 18 / 21" },
  { name: "Qwen 3 32B", set: "Harder (26)", seed0: "7 / 6 / 2", seed1: "13 / 6 / 3" },
  { name: "Mistral Small 3.2 24B", set: "Harder (26)", seed0: "7 / 11 / 5", seed1: "8 / 11 / 7" },
];

export const AI_USE_NOTE =
  "Claude prepared the brief and storyboard and reviewed each version. OpenAI Codex built the video: it generated the ten illustrations, aligned the captions and rendered the exports. The voice-over uses Revoicer text-to-speech, with no background music. All figures are taken from the report.";
