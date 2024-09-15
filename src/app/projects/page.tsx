import type { Metadata } from "next";
import NavBar from "../components/Navbar";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import { BrowserProvider } from "@/contexts/BrowserContext";
import ProjectsContent from "../components/Projects/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects | Nick Brady",
  openGraph: {
    title: "Projects | Nick Brady",
  },
  alternates: {
    canonical: "https://dev.nickbrady.dev/projects",
  },
};

export default function Projects() {
  return (
    <>
      <NavBar />
      <ProjectsProvider>
        <BrowserProvider>
          <ProjectsContent />
        </BrowserProvider>
      </ProjectsProvider>
    </>
  );
}
