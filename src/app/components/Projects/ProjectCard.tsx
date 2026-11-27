"use client"

import type { Project } from "@/types/project"
import { Typography } from "@mui/material"
import { useId, useState } from "react"
import ExampleRenderer, { hasCardPreview } from "./ExampleRenderer"
import { getProjectSpecimen } from "./ProjectSpecimen"
import styles from "./projects.module.css"

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  const id = useId()
  const mediaHintId = useId()
  const [unavailable, setUnavailable] = useState(false)
  const lead = project.examples?.[0]
  const hasPreview = !unavailable && hasCardPreview(lead)
  const Specimen = hasPreview ? undefined : getProjectSpecimen(project.id)
  const hasVisualStage = hasPreview || !!Specimen
  const isVideoPreview = hasPreview && lead.kind === "video"
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
        ) : Specimen ? (
          <Specimen />
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
              aria-describedby={isVideoPreview ? `${id} ${mediaHintId}` : id}
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
        {isVideoPreview ? (
          <span id={mediaHintId} className={styles.srOnly}>
            Video demo.
          </span>
        ) : null}
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
