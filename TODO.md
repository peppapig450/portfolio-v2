# TODO - Portfolio Restructuring

## About Me - Complete Restructure

- [ ] **MAJOR: Restructure About page into 4 technical domains**
  - [ ] Create tabbed interface for technical sections
  - [ ] Full-Stack Development section
  - [ ] Data Science & Analysis section
  - [ ] Systems Engineering & DevOps section
  - [ ] **NEW: Cybersecurity & Security Research section**
- [ ] Update AboutContext.tsx with new structure
- [ ] Create new icons for each technical domain
- [ ] Update content with new descriptions from analysis
- [ ] Add project cross-references within each section

## Site-Wide Content Updates

- [ ] **Update main site metadata/description**
  - [ ] Add "DevOps engineer" and "security researcher" to descriptions
  - [ ] Update keywords with cybersecurity and infrastructure terms
  - [ ] Update OpenGraph/Twitter descriptions
- [ ] **Update landing page introduction text**
  - [ ] First paragraph: Add DevOps and infrastructure expertise
  - [ ] Second paragraph: Mention security research and systems work
- [ ] **Update SEO keywords across all pages**
  - [ ] Add cybersecurity research terms
  - [ ] Add CI/CD and infrastructure automation terms
  - [ ] Add systems programming terms

## Projects - Enhanced Categorization

- [ ] Make the tab buttons have the growing bigger effect when clicked on and get rid of the underline thing
- [ ] Make the width of the card better on larger screens when there's one column
- [ ] **NEW: Add domain-based project filtering**
  - [ ] Update ProjectsContext.tsx with new categories
  - [ ] Add "cybersecurity", "data-science", "devops", "systems" tags
  - [ ] Create multi-domain tag support (projects can span multiple areas)
- [ ] **Add missing projects**
  - [ ] insta-message-analyzer (Data Science)
  - [ ] hyprland-ipc (Systems Programming)
  - [ ] CI/CD workflows (DevOps)
  - [ ] Hyprland vulnerability disclosure (Cybersecurity)
  - [ ] ssh-agent-setup automation (Systems/DevOps)
  - [ ] logging.shlib library (DevOps)
- [ ] **Update existing project descriptions**
  - [ ] Categorize ProfPick as AI/Full-Stack
  - [ ] Categorize WasteNotWantNot as Full-Stack
  - [ ] Add technical depth to PyDictSummary (Systems/Data Science)
- [ ] Demos:
  - [ ] WasteNotWantNot
  - [ ] DictSummarizer
  - [ ] **NEW: CI/CD workflow demonstration**
  - [ ] **NEW: Security research writeup showcase**

## New Security Research Section

- [ ] **Create dedicated cybersecurity showcase**
  - [ ] Hyprland vulnerability disclosure writeup
  - [ ] Timeline and impact summary
  - [ ] Technical analysis breakdown
  - [ ] Responsible disclosure process documentation
- [ ] **Add security methodology description**
  - [ ] Code analysis approach
  - [ ] CVSS scoring expertise
  - [ ] Coordinated disclosure practices
- [ ] **Link to security research from multiple sections**

## Enhanced Project Navigation

- [ ] **Add project domain filtering UI**
  - [ ] Toggle buttons for: Full-Stack, Data Science, DevOps, Security
  - [ ] Multi-select capability (show projects spanning multiple domains)
  - [ ] Filter counter (e.g., "Showing 5 of 12 projects")
- [ ] **Create project relationship mapping**
  - [ ] Show how projects demonstrate cross-domain expertise
  - [ ] Highlight projects that use multiple technical skills
- [ ] **Add "Featured" project section**
  - [ ] Showcase 1-2 projects from each domain
  - [ ] Quick navigation to detailed project views

## Technical Infrastructure Updates

- [ ] **Update project data structure**
  - [ ] Add domain tags to projects.json
  - [ ] Add complexity/impact ratings
  - [ ] Add technology depth indicators
- [ ] **Enhance ProjectsContext for new filtering**
  - [ ] Add domain-based getters
  - [ ] Add cross-domain project queries
  - [ ] Add featured project selection logic
- [ ] **Update TypeScript types**
  - [ ] New ProjectDomain enum
  - [ ] Enhanced Project interface
  - [ ] New filtering and display types

## Content Strategy & SEO

- [ ] **Create technical blog section** (future consideration)
  - [ ] Security research writeups
  - [ ] DevOps automation tutorials
  - [ ] Data science methodology posts
  - [ ] Systems programming deep dives
- [ ] **Update meta descriptions for better targeting**
  - [ ] Target "security researcher" searches
  - [ ] Target "DevOps engineer" searches
  - [ ] Target "published Python developer" searches
- [ ] **Add structured data markup**
  - [ ] Professional credentials
  - [ ] Published packages
  - [ ] Security research contributions

## Analytics & Performance

- [ ] **Track engagement by technical domain**
  - [ ] Which sections get most attention
  - [ ] Project filtering usage patterns
  - [ ] Cross-domain navigation flows
- [ ] **A/B test positioning messages**
  - [ ] "Full-stack developer" vs "Multi-domain engineer"
  - [ ] Impact of security research prominence
  - [ ] Effectiveness of technical depth descriptions

## Future Enhancements (Phase 2)

- [ ] **Interactive technical skill matrix**
  - [ ] Show proficiency levels across domains
  - [ ] Link skills to specific projects
  - [ ] Timeline of skill development
- [ ] **Case study format for major projects**
  - [ ] Problem → Solution → Impact format
  - [ ] Technical challenge deep dives
  - [ ] Lessons learned sections
- [ ] **Community contributions showcase**
  - [ ] Open source contributions
  - [ ] Security disclosures
  - [ ] Published packages impact metrics
