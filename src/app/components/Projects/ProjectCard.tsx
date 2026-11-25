import type { Project } from "@/types/project"
import { Typography } from "@mui/material"
import { useId, useState } from "react"
import ExampleRenderer, { hasCardPreview } from "./ExampleRenderer"
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
  const description = (
    <p id={id} className={styles.description}>
      {project.description}
    </p>
  )

  return (
    <article className={styles.card}>
      <div className={styles.stage}>
        {hasPreview ? (
          <ExampleRenderer
            example={lead}
            surface="preview"
            onPreviewUnavailable={() => setUnavailable(true)}
          />
        ) : (
          <div className={styles.plate}>{description}</div>
        )}
      </div>
      <div className={styles.cardBody}>
        <Typography
          component="h2"
          variant="h5"
          sx={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.25 }}
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
        {hasPreview ? description : null}
      </div>
    </article>
  )
}
