"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import projectsData from "../data/projects.json";

// Define types
export enum ProjectType {
  Project = "project",
  OpenSource = "open-source",
  Tools = "tools",
  Others = "others",
}

export type MediaType = "video" | "image";

export interface Project {
  title: string;
  description: string;
  about: string;
  link?: string;
  mediaUrl: string;
  mediaAlt: string;
  mediaType: MediaType;
  github: string;
  type: ProjectType[];
  technologies: string[];
}

interface ProjectsContextType {
  projects: Project[];
  getProjectsByType: (type: ProjectType) => Project[];
}

// Create the context
const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

// Helper function to convert string to ProjectType
// TODO: add other types here
const stringToProjectType = (str: string): ProjectType => {
  switch (str) {
    case "project":
      return ProjectType.Project;
    case "open-source":
      return ProjectType.OpenSource;
    case "tools":
      return ProjectType.Tools;
    case "others":
      return ProjectType.Others;
    default:
      throw new Error(`Invalid project type: ${str}`);
  }
};

// Helper function to parse mediaType
const parseMediaType = (mediaType: string): MediaType => {
  if (mediaType === "video" || mediaType === "image") {
    return mediaType;
  }
  throw new Error(`Invalid media type: ${mediaType}`);
};

// Create the provider component
export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // convert and set projects from our imported JSON data
    const parsedProjects: Project[] = projectsData.projects.map((project) => ({
      ...project,
      type: project.type.map(stringToProjectType),
      mediaType: parseMediaType(project.mediaType),
    }));
    setProjects(parsedProjects);
  }, []);

  const getProjectsByType = (type: ProjectType): Project[] => {
    return projects.filter((project) => project.type.includes(type));
  };

  const value: ProjectsContextType = {
    projects,
    getProjectsByType,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Custom hook to use the projects context
export const useProjectsContext = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error(
      "useProjectsContext must be used within a Projects Provider"
    );
  }
  return context;
};
