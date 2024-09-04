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
