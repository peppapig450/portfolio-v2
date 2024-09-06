import type { Metadata } from "next";
import NavBar from "../components/Navbar";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import ProjectsContent from "../components/Projects/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects | Nick Brady",
  openGraph: {
    title: "Projects | Nick Brady",
  },
};

export default function Project() {
  return (
    <>
      <NavBar />
      <ProjectsProvider>
        <ProjectsContent />
      </ProjectsProvider>
    </>
  );
}
