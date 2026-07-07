import kalavanshCover from "@/assets/kalavansh.png";
import nexoCover from "@/assets/nexo.png";
import smartPosCover from "@/assets/smart-pos.png";
import notionCover from "@/assets/notion-cover.png.asset.json";
import tajCover from "@/assets/taj-cover.png.asset.json";
import atherCover from "@/assets/ather-cover.png.asset.json";

export type WorkCategory = {
  id: string;
  label: string;
  description: string;
  projects: Project[];
};

/**
 * Per-project visual identity applied to the card's lower content section.
 * Keeps one consistent card structure while letting each project express its
 * own palette, texture and personality.
 */
export type ProjectTheme = {
  /** Solid base color of the card body. */
  bgColor: string;
  /** Optional layered background image (gradient wash + texture/pattern). */
  bgImage?: string;
  /** Title color. */
  fg: string;
  /** Kicker (eyebrow) color. */
  kicker: string;
  /** Muted color for the "Read More" label in its resting state. */
  muted: string;
  /** Accent color revealed on hover for the "Read More" label + arrow. */
  accent: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  kicker: string;
  cover: string;
  theme: ProjectTheme;
};

/* Reusable texture / pattern fragments (encoded SVG data URIs). */
const paperTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")";
const mapTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='160'%3E%3Cpath d='M-10 120 C 50 80, 100 150, 150 100 S 240 60, 300 100' fill='none' stroke='%2390c4ff' stroke-width='1.4' stroke-dasharray='3 7' opacity='0.55'/%3E%3Ccircle cx='150' cy='100' r='3' fill='%23bfe3c9'/%3E%3Ccircle cx='40' cy='96' r='2.4' fill='%2390c4ff'/%3E%3C/svg%3E\")";
const gridTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M40 0H0V40' fill='none' stroke='%23c8ffb0' stroke-width='0.6' opacity='0.25'/%3E%3C/svg%3E\")";
const glassTexture =
  "radial-gradient(120% 120% at 15% 0%, rgba(214,179,106,0.16), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.06), transparent 60%)";
const goldWash =
  "radial-gradient(130% 130% at 85% 10%, rgba(199,163,102,0.20), transparent 55%)";

export const workCategories: WorkCategory[] = [
  {
    id: "projects",
    label: "Selected Projects",
    description: "Building products through research, strategy and execution.",
    projects: [
      {
        slug: "kalavansh",
        title: "Kalavansh",
        category: "Project",
        kicker: "Product Design & Strategy",
        cover: `url(${kalavanshCover})`,
        theme: {
          bgColor: "#f0e6d6",
          bgImage: `${paperTexture}, radial-gradient(130% 130% at 15% 0%, rgba(176,87,47,0.10), transparent 55%)`,
          fg: "#3a2c1f",
          kicker: "#b0572f",
          muted: "#8a7355",
          accent: "#b0572f",
        },
      },
      {
        slug: "smart-predictive-pos",
        title: "Smart Predictive POS",
        category: "Project",
        kicker: "Product Design & Strategy",
        cover: `url(${smartPosCover})`,
        theme: {
          bgColor: "#141821",
          bgImage: glassTexture,
          fg: "#f4f1e8",
          kicker: "#d8b36a",
          muted: "#9aa3b5",
          accent: "#e6c987",
        },
      },
      {
        slug: "nexo",
        title: "Nexo",
        category: "Project",
        kicker: "Technical Product Design & building",
        cover: `url(${nexoCover})`,
        theme: {
          bgColor: "#12243d",
          bgImage: `${mapTexture}, radial-gradient(130% 130% at 80% 0%, rgba(120,180,140,0.16), transparent 55%)`,
          fg: "#eef4f8",
          kicker: "#7fb3ff",
          muted: "#9db6c9",
          accent: "#8fd3a6",
        },
      },
    ],
  },
  {
    id: "strategy-breakdowns",
    label: "Strategy Breakdowns",
    description: "Breaking down products, markets and business strategy.",
    projects: [
      {
        slug: "nestle",
        title: "Nestlé",
        category: "Strategy Breakdown",
        kicker: "Brand & Strategy",
        cover:
          "linear-gradient(135deg, #0a2b6b 0%, #123a8a 45%, #c8102e 100%)",
        theme: {
          bgColor: "#faf5ec",
          bgImage: "radial-gradient(130% 130% at 15% 0%, rgba(10,43,107,0.08), transparent 55%)",
          fg: "#0a2b6b",
          kicker: "#c8102e",
          muted: "#6b7280",
          accent: "#c8102e",
        },
      },
      {
        slug: "taj-hotels",
        title: "Taj Hotels",
        category: "Strategy Breakdown",
        kicker: "Brand & Strategy",
        cover: `url(${tajCover.url})`,
        theme: {
          bgColor: "#f6efe2",
          bgImage: goldWash,
          fg: "#3a2c1f",
          kicker: "#b89355",
          muted: "#8a7355",
          accent: "#c7a366",
        },
      },
      {
        slug: "ather",
        title: "Ather",
        category: "Strategy Breakdown",
        kicker: "Brand & Strategy",
        cover: `url(${atherCover.url})`,
        theme: {
          bgColor: "#1b1e1c",
          bgImage: gridTexture,
          fg: "#f4f6f2",
          kicker: "#5ef08a",
          muted: "#9aa39a",
          accent: "#5ef08a",
        },
      },
    ],
  },
  {
    id: "investigations",
    label: "Investigations",
    description: "Deep dives into products, user behaviour and design decisions.",
    projects: [
      {
        slug: "notion",
        title: "Notion",
        category: "Investigation",
        kicker: "Product Teardown",
        cover: `url(${notionCover.url})`,
        theme: {
          bgColor: "#ffffff",
          bgImage: undefined,
          fg: "#111111",
          kicker: "#111111",
          muted: "#9a9a9a",
          accent: "#111111",
        },
      },
    ],
  },
];

export const allProjects: Project[] = workCategories.flatMap((c) => c.projects);

export function findProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export const caseStudySections = [
  "The Spark",
  "What I Discovered",
  "The Idea",
  "Bringing It to Life",
  "Build Details",
  "Looking Back",
] as const;
