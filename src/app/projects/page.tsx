import { projects } from "@/data/projects"
import { canonicalUrl, publicRoutes } from "@/publicRoutes"
import type { Metadata } from "next"
import NavBar from "../components/Navbar"
import ProjectsContent from "../components/Projects/ProjectsContent"

export const metadata: Metadata = {
  title: "Projects | Nick Brady",
  openGraph: {
    title: "Projects | Nick Brady",
  },
  alternates: {
    canonical: canonicalUrl(publicRoutes.projects),
  },
}

export default function Projects() {
  return (
    <>
      <NavBar />
      <ProjectsContent projects={projects} />
    </>
  )
}
