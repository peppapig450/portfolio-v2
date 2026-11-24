import type { Project } from "@/types/project"

export const projects = [
  {
    id: "profpick",
    title: "ProfPick",
    description:
      "Ask for professor recommendations based on student reviews from Rate My Professors.",
    about:
      "ProfPick retrieves review summaries from Pinecone and passes them to a language model along with the student's question. Results show ratings, review tags, and excerpts so students can compare the recommendations.",
    type: ["project", "open-source"],
    technologies: [
      "Python",
      "Google Cloud",
      "Docker",
      "React",
      "Material UI",
      "Next.js",
      "TypeScript",
      "OpenAI",
      "Pinecone",
      "LangChain",
      "RAG",
    ],
    links: [
      {
        label: "Open ProfPick",
        href: "https://rate-my-professor-lac.vercel.app/",
      },
      {
        label: "ProfPick source on GitHub",
        href: "https://github.com/HeadstarterVenomBytes/Rate-My-Professor",
      },
    ],
    examples: [
      {
        kind: "video",
        src: "profpick_demo.webm",
        alt: "Animated demo showcasing ProfPick's AI-powered recommendations",
        poster: "/images/profpick-poster.webp",
        caption:
          'A search for "easy classes" returns professor recommendations with ratings and review excerpts.',
      },
    ],
  },
  {
    id: "wastenotwantnot",
    title: "WasteNotWantNot",
    description:
      "Track what is in your pantry, how much you have, and when it expires.",
    about:
      "Firestore stores each account's inventory separately. Adding an item under the same name increases its existing quantity and updates its expiration date instead of creating a duplicate row.",
    type: ["open-source", "project"],
    technologies: ["React", "Next.js", "JavaScript", "Material UI", "Firebase"],
    links: [
      {
        label: "Open WasteNotWantNot",
        href: "https://pantry-tracker-delta-swart.vercel.app/",
      },
      {
        label: "WasteNotWantNot source on GitHub",
        href: "https://github.com/peppapig450/pantry-tracker",
      },
    ],
    examples: [
      {
        kind: "video",
        src: "wastenotwantnot_demo.webm",
        alt: "Animated demo showcasing WasteNotWantNot's pantry management features",
        poster: "/images/wastenotwantnot-poster.webp",
        caption:
          "Add carrots with a quantity and expiration date, then see the new row in the pantry table.",
      },
    ],
  },
  {
    id: "pydictsummary",
    title: "PyDictSummary",
    description:
      "A Rust-backed Python module that reports distinct keys and value type counts across nested dictionaries.",
    about:
      "The module converts a Python dictionary to a JSON value and walks it recursively. It deduplicates keys across levels and counts the root dictionary along with nested dictionaries.",
    type: ["open-source", "tools"],
    technologies: ["Rust", "Python FFI", "Python", "Python module"],
    links: [
      {
        label: "PyDictSummary source on GitHub",
        href: "https://github.com/peppapig450/data-summarizer/",
      },
    ],
    // The original blob, pydictsummary_demo.avif ("Screenshot of PyDictSummary usage"), returns 404.
    examples: [
      {
        kind: "excerpt",
        text: `>>> pantry = {"item": {"item": "rice"}}
>>> report = summarize_large_json(pantry)

>>> report[1], report[2]
(['item'], 2)`,
        caption:
          "The result includes one distinct key and two dictionaries, counting the root.",
      },
    ],
  },
] satisfies readonly Project[]
