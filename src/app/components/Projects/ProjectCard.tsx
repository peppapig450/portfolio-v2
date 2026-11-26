"use client"

import type { Project } from "@/types/project"
import { Typography } from "@mui/material"
import { useId, useState } from "react"
import ExampleRenderer, { hasCardPreview } from "./ExampleRenderer"
import ProjectSpecimen, { hasProjectSpecimen } from "./ProjectSpecimen"
import styles from "./projects.module.css"

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  const id = useId()
  const [unavailable, setUnavailable] = useState(false)
  const lead = project.examples?.[0]
  const hasPreview = !unavailable && hasCardPreview(lead)
  const hasSpecimen = !hasPreview && hasProjectSpecimen(project.id)
  const hasVisualStage = hasPreview || hasSpecimen
  const description = (
    <p id={id} className={styles.description}>
      {project.description}
    </p>
  )
  const featuredTech = project.technologies?.slice(0, 3) ?? []

  return (
    <article className={styles.card} data-project-card="">
      <div className={styles.stage}>
        {hasPreview ? (
          <ExampleRenderer
            example={lead}
            surface="preview"
            onPreviewUnavailable={() => setUnavailable(true)}
          />
        ) : hasSpecimen ? (
          <ProjectSpecimen projectId={project.id} />
        ) : (
          <div className={styles.plate}>{description}</div>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.titleRow}>
          <Typography
            component="h2"
            variant="h5"
            sx={{ fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.25 }}
          >
            <button
              type="button"
              aria-describedby={id}
              aria-haspopup="dialog"
              onClick={(event) => {
                // WebKit may not focus a clicked button for MUI to restore later.
                event.currentTarget.focus({ preventScroll: true })
                onOpen(project)
              }}
              className={styles.action}
            >
              {project.title}
            </button>
          </Typography>
          <span className={styles.cardArrow} aria-hidden="true">
            ↗
          </span>
        </div>
        {hasVisualStage ? description : null}
        {featuredTech.length > 0 ? (
          <ul className={styles.techLine} aria-label="Primary technologies">
            {featuredTech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
