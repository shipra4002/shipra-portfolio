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
};

export const workCategories: WorkCategory[] = [
  {
    id: "projects",
    label: "Projects",
    description: "Products taken from a spark of an idea to something people can hold and use.",
    projects: [
      { slug: "kalavansh", title: "Kalavansh", category: "Project", kicker: "Product Design & Strategy" },
      { slug: "nexo", title: "Nexo", category: "Project", kicker: "Product Design & Strategy" },
      {
        slug: "smart-predictive-pos",
        title: "Smart Predictive POS",
        category: "Project",
        kicker: "Product Design & Strategy",
      },
    ],
  },
  {
    id: "investigations",
    label: "Investigations",
    description: "Deep dives into products I admire — pulling apart how and why they work.",
    projects: [
      { slug: "notion", title: "Notion", category: "Investigation", kicker: "Product Teardown" },
    ],
  },
  {
    id: "strategy-breakdowns",
    label: "Strategy Breakdowns",
    description: "Reading the moves behind the brands — the strategy beneath the surface.",
    projects: [
      { slug: "taj-hotels", title: "Taj Hotels", category: "Strategy Breakdown", kicker: "Brand & Strategy" },
      { slug: "ather", title: "Ather", category: "Strategy Breakdown", kicker: "Brand & Strategy" },
      { slug: "nestle", title: "Nestlé", category: "Strategy Breakdown", kicker: "Brand & Strategy" },
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
