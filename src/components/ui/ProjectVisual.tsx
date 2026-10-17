/*
 * Built-in placeholder artwork for a project, used until a real screenshot is
 * configured (coverImage in src/data/projects.ts). Each composition hints at
 * what the project is about without pretending to be its interface: no real
 * UI text, no invented data. A small "Placeholder" tag keeps that honest.
 * Colours come from theme tokens, so the artwork follows light and dark.
 */
import type { Project } from "@/data/schema";

type Kind = Project["visual"];

const nodes: [number, number][] = [
  [120, 110], [260, 70], [400, 150], [560, 90], [690, 170], [180, 260], [330, 300],
  [470, 260], [620, 320], [100, 400], [260, 430], [420, 410], [580, 430], [700, 400],
];
const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [2, 7], [6, 7], [7, 8],
  [4, 8], [5, 9], [6, 10], [7, 11], [8, 12], [8, 13], [11, 12], [10, 11],
];

function Graph() {
  return (
    <g>
      {edges.map(([a, b]) => {
        const matched = (a === 2 && b === 7) || (a === 7 && b === 2);
        return (
          <line
            key={`${a}-${b}`}
            x1={nodes[a]![0]} y1={nodes[a]![1]} x2={nodes[b]![0]} y2={nodes[b]![1]}
            className={matched ? "stroke-accent" : "stroke-line"}
            strokeWidth={matched ? 3 : 1.5}
          />
        );
      })}
      {nodes.map(([x, y], i) => {
        const matched = i === 2 || i === 7;
        const common = matched ? "fill-accent stroke-accent" : "fill-surface stroke-muted/60";
        return i % 2 === 0 ? (
          <circle key={i} cx={x} cy={y} r={matched ? 20 : 15} className={common} strokeWidth={1.5} />
        ) : (
          <rect key={i} x={x - 13} y={y - 13} width={26} height={26} rx={4} className={common} strokeWidth={1.5} />
        );
      })}
    </g>
  );
}

const codeLines: [number, number][] = [
  [0, 120], [0, 200], [1, 150], [1, 230], [2, 180], [2, 120], [2, 210], [1, 90], [0, 60],
  [0, 170], [1, 140], [1, 200], [2, 110], [0, 80],
];

function Retrieval() {
  return (
    <g>
      <rect x={40} y={50} width={430} height={400} rx={10} className="fill-surface stroke-line" strokeWidth={1.5} />
      <line x1={40} y1={90} x2={470} y2={90} className="stroke-line" strokeWidth={1.5} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={64 + i * 18} cy={70} r={4.5} className="fill-line" />
      ))}
      <rect x={41} y={216} width={428} height={86} className="fill-accent-soft" />
      <rect x={41} y={216} width={3} height={86} className="fill-accent" />
      {codeLines.map(([indent, width], i) => (
        <rect key={i} x={68 + indent * 24} y={110 + i * 24} width={width} height={9} rx={4.5} className="fill-muted/40" />
      ))}
      <rect x={510} y={70} width={250} height={64} rx={10} className="fill-surface stroke-line" strokeWidth={1.5} />
      <rect x={528} y={92} width={170} height={9} rx={4.5} className="fill-muted/50" />
      <rect x={528} y={110} width={110} height={9} rx={4.5} className="fill-muted/30" />
      <rect x={510} y={160} width={250} height={170} rx={10} className="fill-surface stroke-line" strokeWidth={1.5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={528} y={184 + i * 24} width={[200, 190, 205, 150, 110][i]} height={9} rx={4.5} className="fill-fg/25" />
      ))}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={510 + i * 128} y={352} width={118} height={30} rx={15} className="fill-accent-soft stroke-accent" strokeWidth={1.2} />
          <text x={510 + i * 128 + 59} y={371} textAnchor="middle" className="fill-accent" style={{ font: "500 11px var(--font-mono)" }}>
            {["file · L12-28", "file · L40-52"][i]}
          </text>
        </g>
      ))}
    </g>
  );
}

function Publishing() {
  return (
    <g>
      <rect x={40} y={40} width={720} height={420} rx={10} className="fill-surface stroke-line" strokeWidth={1.5} />
      <line x1={40} y1={84} x2={760} y2={84} className="stroke-line" strokeWidth={1.5} />
      <rect x={64} y={56} width={70} height={16} rx={8} className="fill-muted/40" />
      <rect x={660} y={52} width={80} height={24} rx={12} className="fill-accent" />
      <line x1={230} y1={84} x2={230} y2={460} className="stroke-line" strokeWidth={1.5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={60} y={110 + i * 64} width={[120, 100, 130, 90, 110][i]} height={11} rx={5} className={i === 0 ? "fill-accent" : "fill-fg/30"} />
          <rect x={60} y={130 + i * 64} width={[140, 120, 100, 130, 90][i]} height={8} rx={4} className="fill-muted/30" />
        </g>
      ))}
      <rect x={270} y={112} width={64} height={18} rx={9} className="fill-accent-soft stroke-accent" strokeWidth={1.2} />
      <rect x={270} y={146} width={380} height={22} rx={6} className="fill-fg/70" />
      <rect x={270} y={178} width={260} height={22} rx={6} className="fill-fg/70" />
      <rect x={270} y={216} width={150} height={9} rx={4.5} className="fill-muted/40" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={270} y={246 + i * 20} width={[450, 430, 300][i]} height={9} rx={4.5} className="fill-muted/35" />
      ))}
      <rect x={270} y={320} width={450} height={100} rx={8} className="fill-bg stroke-line" strokeWidth={1.2} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={290 + (i % 2) * 24} y={338 + i * 20} width={[150, 220, 120, 180][i]} height={8} rx={4} className={i === 1 ? "fill-accent/70" : "fill-muted/40"} />
      ))}
    </g>
  );
}

export function ProjectVisual({ kind, title, className = "" }: { kind: Kind; title: string; className?: string }) {
  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden border border-line bg-bg ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="size-full"
        role="img"
        aria-label={`Placeholder illustration for ${title}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width={800} height={500} className="fill-bg" />
        {kind === "graph" && <Graph />}
        {kind === "retrieval" && <Retrieval />}
        {kind === "publishing" && <Publishing />}
      </svg>
      <span className="eyebrow absolute bottom-3 left-3 rounded-full bg-bg/80 px-2.5 py-1 backdrop-blur-sm">
        Placeholder visual
      </span>
    </div>
  );
}
