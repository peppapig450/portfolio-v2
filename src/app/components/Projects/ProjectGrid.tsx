"use client"

import type { Project } from "@/types/project"
import { motion, useReducedMotion } from "framer-motion"
import ProjectCard from "./ProjectCard"
import styles from "./projects.module.css"

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function ProjectGrid({
  projects,
  onOpen,
}: {
  projects: readonly Project[]
  onOpen: (project: Project) => void
}) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={styles.grid}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={cardVariants}
          style={{ display: "grid" }}
        >
          <ProjectCard project={project} onOpen={onOpen} />
        </motion.div>
      ))}
    </motion.div>
  )
}
