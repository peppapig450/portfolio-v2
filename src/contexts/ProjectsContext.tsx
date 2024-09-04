"use client";
import React, { createContext, useContext, ReactNode } from "react";

enum ProjectType {
  Project = "project",
  OpenSource = "open-source",
  Tools = "tools",
  Others = "others",
}

interface Project {
  title: string;
  description: string;
  about: string;
  link: string;
  imageUrl: string;
  github?: string;
  type: ProjectType[];
  technologies: string[];
}

interface ProjectsContextType {
  projects: Project[];
  getProjectsByType: (type: ProjectType) => Project[];
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProvidersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const projects_data: Project[] = [
    {
      title: "ProfPick",
      description: "Using AI to make sure you get the best professor.",
      about: "",
      link: "https://rate-my-professor-lac.vercel.app/",
      imageUrl: "",
      github: "https://github.com/HeadstarterVenomBytes/Rate-My-Professor",
      type: [ProjectType.Project, ProjectType.OpenSource, ProjectType.Others],
      technologies: [
        "Python",
        "React / Next.js",
        "TypeScript",
        "OpenAI",
        "Pinecone",
        "LangChain",
        "RAG",
        "Cheerio",
      ],
    },
  ];
  const getProjectsByType = (type: ProjectType): Project[] => {
    return projects_data.filter((project) => project.type.includes(type));
  };

  const value: ProjectsContextType = {
    projects: projects_data,
    getProjectsByType,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContext = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error(
      "useProjectsContext must be used within a Projects Provider"
    );
  }
  return context;
};
