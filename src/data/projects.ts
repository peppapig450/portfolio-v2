import type { Project } from "@/types/project"

export const projects = [
  {
    id: "logitech-led-control",
    title: "Logitech LED Control",
    description:
      "Control per-key lighting on Logitech G keyboards from a Rust CLI.",
    about:
      "Logitech LED Control is an independent Rust implementation that supports keyboards including the G Pro X. It translates colors and effects into model-specific commands and sends them through either HID or libusb. You can set individual keys or groups, configure onboard effects, and load lighting profiles from TOML or existing g810-led files.",
    type: ["project", "open-source", "tools"],
    technologies: ["Rust", "USB HID", "libusb", "Clap", "TOML"],
    links: [
      {
        label: "Logitech LED Control source on GitHub",
        href: "https://github.com/peppapig450/logitech-led-control",
      },
    ],
    // Verified against logitech-led-control at e442c92 (src/main.rs and src/profile.rs).
    examples: [
      {
        kind: "excerpt",
        text: `logi-led set --key a ff0000
logi-led set --group arrows 00ff00`,
        caption:
          "Set the A key red and the arrow keys green. Each command commits its change to a connected, supported keyboard with HID access.",
      },
      {
        kind: "excerpt",
        text: `all = "010203"

[[groups]]
group = "arrows"
color = "ff0000"

[[key]]
key = "a"
color = "00ff00"`,
        caption:
          "A TOML profile applies a base color, then group and individual-key overrides. Load the saved file with logi-led load-config profile.toml.",
      },
    ],
  },
  {
    id: "gentoo-overlay-vendoring",
    title: "Gentoo Overlay & Vendoring Pipeline",
    description:
      "Automated dependency packaging for a Gentoo software repository.",
    about:
      "I maintain a Gentoo overlay and the release pipeline that packages dependencies for its Go and Rust ebuilds. A scheduled GitHub Actions workflow compares upstream releases with overlay versions and existing dependency releases, including configured preemptive builds for newer upstream versions. It publishes dependency archives and checksums that Portage can fetch alongside the source tarball.",
    type: ["project", "open-source", "tools"],
    technologies: [
      "Gentoo",
      "Portage",
      "GitHub Actions",
      "Bash",
      "Python",
      "Go",
      "Rust",
    ],
    links: [
      {
        label: "Browse dependency releases",
        href: "https://github.com/peppapig450/nicks-overlay-vendored/releases",
      },
      {
        label: "Vendoring pipeline source on GitHub",
        href: "https://github.com/peppapig450/nicks-overlay-vendored",
      },
      {
        label: "Gentoo overlay source on GitHub",
        href: "https://github.com/peppapig450/nicks_repo",
      },
    ],
  },
  {
    id: "instagram-message-analyzer",
    title: "Instagram Message Analyzer",
    description:
      "Explore activity and relationships in exported Instagram conversations.",
    about:
      "This Python toolkit normalizes Instagram message exports into a structured dataset and analyzes activity over time, conversation bursts, and chat lifecycles. It models senders and conversations as a bipartite graph to explore communities and centrality. The insta-analyze CLI reads exports from data/your_instagram_activity/messages, filters to group chats, and runs a modular analysis pipeline that generates interactive Plotly charts.",
    type: ["project", "open-source", "tools"],
    technologies: [
      "Python",
      "Plotly",
      "Graph Analysis",
      "Time-Series Analysis",
    ],
    links: [
      {
        label: "Instagram Message Analyzer on PyPI",
        href: "https://pypi.org/project/insta-message-analyzer/",
      },
      {
        label: "Instagram Message Analyzer source on GitHub",
        href: "https://github.com/peppapig450/insta-message-analyzer",
      },
    ],
  },
  {
    id: "usaspending-data-pipeline",
    title: "USAspending Contract Data Pipeline",
    description:
      "Turn compressed federal contract data into a queryable dataset and dashboard.",
    about:
      "I built a pipeline that streams Zstandard-compressed USAspending CSVs into PyArrow record batches using an explicit schema. It writes partitioned Parquet files, which Polars queries for a Dash dashboard covering federal contract funding trends, industry sectors, and award types.",
    type: ["project", "open-source"],
    technologies: [
      "Python",
      "PyArrow",
      "Polars",
      "Parquet",
      "Zstandard",
      "Dash",
    ],
    links: [
      {
        label: "USAspending pipeline source on GitHub",
        href: "https://github.com/peppapig450/usaspending-data-processing",
      },
    ],
  },
  {
    id: "hyprland-ipc",
    title: "hyprland-ipc",
    description:
      "A typed Python client for Hyprland commands and desktop events.",
    about:
      "This library discovers Hyprland's Unix sockets, wraps common queries for windows and workspaces, and supports batched commands. It exposes desktop events through an iterator or a callback-based listener. The test suite covers socket behavior and edge cases.",
    type: ["open-source", "tools"],
    technologies: ["Python", "Hyprland", "Unix Domain Sockets", "pytest"],
    links: [
      {
        label: "hyprland-ipc on PyPI",
        href: "https://pypi.org/project/hyprland-ipc/",
      },
      {
        label: "hyprland-ipc source on GitHub",
        href: "https://github.com/peppapig450/hyprland-ipc",
      },
    ],
    // Verified against hyprland-ipc at 7ca7810 (src/hyprland_ipc/ipc.py).
    examples: [
      {
        kind: "excerpt",
        text: `from hyprland_ipc import HyprlandIPC

ipc = HyprlandIPC.from_env()
print(ipc.get_clients())

for event in ipc.events():
    print(event)`,
        caption:
          "Query open windows, then stream desktop events until interrupted. Requires a running Hyprland session with XDG_RUNTIME_DIR and HYPRLAND_INSTANCE_SIGNATURE set.",
      },
    ],
  },
  {
    id: "beat-detector",
    title: "Beat Detector",
    description: "Detect beats and estimate BPM from live Linux audio.",
    about:
      "Beat Detector captures audio through PipeWire and uses aubio for tempo estimation and optional pitch detection. I built the CLI and shared library in C++23, with C++ modules organizing audio handling, detection, and terminal output.",
    type: ["project", "open-source", "tools"],
    technologies: ["C++23", "C++ Modules", "PipeWire", "aubio", "CMake"],
    links: [
      {
        label: "Beat Detector source on GitHub",
        href: "https://github.com/peppapig450/beat-detector",
      },
    ],
  },
  {
    id: "hermes-image-translate",
    title: "Hermes Image Translate",
    description:
      "Extract and translate text from screenshots and photos in Hermes.",
    about:
      "This Hermes skill extracts text with local GLM-OCR through Ollama or hosted Nemotron 3.5 Parse, then sends the extracted text to Nemotron 3 Ultra for translation. It can save the OCR output and resume from that text if translation fails, so a retry can reuse the completed extraction.",
    type: ["project", "open-source", "tools"],
    technologies: ["Python", "Hermes", "Ollama", "GLM-OCR", "NVIDIA NIM", "uv"],
    links: [
      {
        label: "Hermes Image Translate source on GitHub",
        href: "https://github.com/peppapig450/hermes-skills/tree/main/productivity/image-translate",
      },
    ],
    // Verified against hermes-skills at 5230e72 (productivity/image-translate/translate_image.py).
    examples: [
      {
        kind: "excerpt",
        text: `uv run --script translate_image.py \\
  screenshot.png --target English \\
  --ocr-output extracted.txt --json`,
        caption:
          "Run from the image-translate skill directory. Local Ollama with glm-ocr extracts the text; NVIDIA_API_KEY is required for translation. A new extracted.txt checkpoint is saved before translation begins.",
      },
      {
        kind: "excerpt",
        text: `uv run --script translate_image.py \\
  --text-file extracted.txt \\
  --target English --json`,
        caption:
          "If translation fails after the checkpoint is saved, retry from the extracted text without rerunning OCR.",
      },
    ],
  },
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
        alt: "Three professor recommendation cards with star ratings, review tags, and student review excerpts",
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
        alt: "Add Item form for carrots with quantity and expiration date filled in",
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
