import kalavanshCover from "@/assets/kalavansh.png.asset.json";
import nexoCover from "@/assets/nexo.png.asset.json";
import smartPosCover from "@/assets/smart-pos.png.asset.json";

export type WorkCategory = {
  id: string;
  label: string;
  description: string;
  projects: Project[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  kicker: string;
  cover: string;
};

export const workCategories: WorkCategory[] = [
  {
    id: "projects",
    label: "Projects",
    description: "Products taken from a spark of an idea to something people can hold and use.",
    projects: [
      {
        slug: "kalavansh",
        title: "Kalavansh",
        category: "Project",
        kicker: "Product Design & Strategy",
        cover: "linear-gradient(135deg, #6b7a68 0%, #3f4a43 100%)",
      },
      {
        slug: "nexo",
        title: "Nexo",
        category: "Project",
        kicker: "Product Design & Strategy",
        cover: "linear-gradient(135deg, #b06a4c 0%, #7c4a34 100%)",
      },
      {
        slug: "smart-predictive-pos",
        title: "Smart Predictive POS",
        category: "Project",
        kicker: "Product Design & Strategy",
        cover: "linear-gradient(135deg, #d8b36a 0%, #a17f3c 100%)",
      },
    ],
  },
  {
    id: "investigations",
    label: "Investigations",
    description: "Deep dives into products I admire — pulling apart how and why they work.",
    projects: [
      {
        slug: "notion",
        title: "Notion",
        category: "Investigation",
        kicker: "Product Teardown",
        cover: "linear-gradient(135deg, #7c7669 0%, #2b2b2b 100%)",
      },
    ],
  },
  {
    id: "strategy-breakdowns",
    label: "Strategy Breakdowns",
    description: "Reading the moves behind the brands — the strategy beneath the surface.",
    projects: [
      {
        slug: "taj-hotels",
        title: "Taj Hotels",
        category: "Strategy Breakdown",
        kicker: "Brand & Strategy",
        cover: "linear-gradient(135deg, #b06a4c 0%, #3f4a43 100%)",
      },
      {
        slug: "ather",
        title: "Ather",
        category: "Strategy Breakdown",
        kicker: "Brand & Strategy",
        cover: "linear-gradient(135deg, #6b7a68 0%, #d8b36a 100%)",
      },
      {
        slug: "nestle",
        title: "Nestlé",
        category: "Strategy Breakdown",
        kicker: "Brand & Strategy",
        cover: "linear-gradient(135deg, #3f4a43 0%, #b06a4c 100%)",
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
