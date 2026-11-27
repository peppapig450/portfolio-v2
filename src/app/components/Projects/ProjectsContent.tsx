"use client"

import type { Project, ProjectType } from "@/types/project"
import { Container, Grid, Typography } from "@mui/material"
import { useState } from "react"
import CustomTabs from "../CustomTabs"
import FooterLink from "../FooterLink"
import ProjectDrawer from "./ProjectDrawer"
import ProjectGrid from "./ProjectGrid"
import styles from "./projects.module.css"

const filters: readonly { label: string; type?: ProjectType }[] = [
  { label: "All" },
  { label: "Projects", type: "project" },
  { label: "Dev Tools", type: "tools" },
  { label: "Open Source", type: "open-source" },
]

export default function ProjectsContent({
  projects,
}: {
  projects: readonly Project[]
}) {
  const [drawer, setDrawer] = useState<{
    project: Project
    open: boolean
  } | null>(null)
  const [hasFiltered, setHasFiltered] = useState(false)

  const filteredByTab = filters.map(({ label, type }) => {
    const items = type
      ? projects.filter((project) => project.type.includes(type))
      : projects
    return { label, items }
  })

  return (
    <Container sx={{ mb: 5, px: { xs: 2, sm: 3 } }}>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 10 }} className={styles.panel}>
          <div className={styles.collection}>
            <div className={styles.headerRow}>
              <Typography
                variant="h2"
                component="h1"
                className={styles.heading}
                sx={{ fontWeight: 700 }}
              >
                Projects<span className={styles.headingAccent}>.</span>
              </Typography>
            </div>
            <CustomTabs
              onChange={() => setHasFiltered(true)}
              items={filteredByTab.map(({ label, items }) => ({
                label,
                content: (
                  <ProjectGrid
                    projects={items}
                    animateEntrance={hasFiltered}
                    onOpen={(project) => setDrawer({ project, open: true })}
                  />
                ),
              }))}
            />
            <FooterLink goto="/resume" sx={{ "& > div": { mr: 0 } }}>
              Let&apos;s Go To My Resume.
            </FooterLink>
          </div>
        </Grid>
      </Grid>
      <ProjectDrawer
        project={drawer?.project ?? null}
        open={drawer?.open ?? false}
        onClose={() =>
          setDrawer((current) =>
            current?.open ? { ...current, open: false } : current,
          )
        }
        // Keep the project visible during Slide's exit, unless it has reopened.
        onExited={() =>
          setDrawer((current) => (current?.open ? current : null))
        }
      />
    </Container>
  )
}
