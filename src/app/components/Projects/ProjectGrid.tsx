"use client"

import { designTokens } from "@/styles/theme"
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
      ease: designTokens.motion.easeOut,
    },
  },
}

export default function ProjectGrid({
  projects,
  onOpen,
  animateEntrance = false,
}: {
  projects: readonly Project[]
  onOpen: (project: Project) => void
  animateEntrance?: boolean
}) {
  const reducedMotion = useReducedMotion()

  if (!animateEntrance || reducedMotion) {
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
