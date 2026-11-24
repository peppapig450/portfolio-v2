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
  const [selected, setSelected] = useState<Project | null>(null)
  return (
    <Container sx={{ mb: 5, px: { xs: 2, sm: 3 } }}>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 10 }} className={styles.panel}>
          <div className={styles.collection}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 700, mt: 8, mb: 3 }}
            >
              Projects.
            </Typography>
            <CustomTabs
              items={filters.map(({ label, type }) => ({
                label,
                content: (
                  <ProjectGrid
                    projects={
                      type
                        ? projects.filter((project) =>
                            project.type.includes(type),
                          )
                        : projects
                    }
                    onOpen={setSelected}
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
      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </Container>
  )
}
