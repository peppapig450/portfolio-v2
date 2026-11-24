import type { Project } from "@/types/project"
import ProjectCard from "./ProjectCard"
import styles from "./projects.module.css"

export default function ProjectGrid({
  projects,
  onOpen,
}: {
  projects: readonly Project[]
  onOpen: (project: Project) => void
}) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={onOpen} />
      ))}
    </div>
  )
}
