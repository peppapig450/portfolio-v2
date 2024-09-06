"use client";
import React, { createContext, useContext, ReactNode } from "react";

// Define types
export enum ProjectType {
  Project = "project",
  OpenSource = "open-source",
  Tools = "tools",
  Others = "others",
}

export interface Project {
  title: string;
  description: string;
  about: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  github?: string;
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

// Create the provider component
export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const projects_data: Project[] = [
    {
      title: "ProfPick",
      description:
        "ProfPick uses AI to deliver personalized professor recommendations based on Rate My Professor data and user-submitted reviews.",
      about:
        "ProfPick is a revolutionary tool designed to streamline the class selection process. Powered by advanced AI algorithms, we analyze vast amounts of data from Rate My Professor to provide accurate and relevant professor recommendations tailored to your specific needs. With ProfPick, you can effortlessly discover the best professors for your courses and make informed decisions about your academic journey. Easily upload your own professor reviews to contribute to the community and help other students.",
      link: "https://rate-my-professor-lac.vercel.app/",
      imageUrl: "profpick_demo.avif",
      imageAlt:
        "Animated demo showcasing ProfPick's AI-powered professor recommendations",
      github: "https://github.com/HeadstarterVenomBytes/Rate-My-Professor",
      type: [ProjectType.Project, ProjectType.OpenSource, ProjectType.Others],
      technologies: [
        "Python",
        "Google Cloud",
        "Docker",
        "React",
        "Next.js",
        "TypeScript",
        "OpenAI",
        "Pinecone",
        "LangChain",
        "RAG",
        "Cheerio",
      ],
    },
    // ... (other projects)
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
