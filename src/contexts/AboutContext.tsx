"use client";

import React, { createContext, useContext, ReactNode } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";

// Define the base timeline data interface with common properties
interface BaseItem {
  title: string;
  description: string;
  link: string;
  oppositeText: string;
  ariaLabel: string;
}

// Extend BaseItem with the initial Timeline item stuff
export interface AboutMeItem extends BaseItem {
  icon: ReactNode;
}

// Extend BaseItem for PlaylistItem with additional properties
export interface PlaylistItem extends BaseItem {
  source: string;
}

// Define the context data type that combines all items
type AboutContextType = {
  aboutMeData: AboutMeItem[];
  myPlaylistData: PlaylistItem[];
};

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export const useAboutContext = () => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error("useAboutContext must be used within an AboutProvider");
  }
  return context;
};

export const AboutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const aboutData: AboutContextType = {
    aboutMeData: [
      {
        title: "Engineering",
        icon: <GitHubIcon />,
        description:
          "First impressions matter, and exceptional website design is crucial for capturing attention. A well-designed website combines eye-catching aesthetics, seamless functionality and user-friendly navigation. As an experienced programmer with Autism Spectrum Disorder, I bring a unique perspective that allows me to approach challenges, with excellent attention to detail, clarity and problem solving, turning complex problems into streamlined solutions. This distinct advantage, combined with my deep understanding of modern development practices, empowers me to craft websites that are not only visually captivating but also optimized for performance, ensuring every detail is perfected.",
        link: "https://github.com/peppapig450",
        oppositeText: "View GitHub",
        ariaLabel: "Open GitHub link",
      },
      {
        title: "Product",
        icon: <PublicIcon />,
        description:
          "While I may not fit the traditional profile of a product manager, my unique perspective as an autistic individual, combined with  my quick learning ability and creativity, gives me a distinct advantage in driving product success from concept to launch. My diverse skillset in research, product design, and coordination allow me to approach challenges with fresh, innovative solutions while maintaining a clear, focused vision throughout the product&apos;s journey. With exceptional analytical thinking, attention to detail, and a talent for creatively bridging the gap between technical and product domains, I excel at navigating the path from 0 to 100, ensuring every stage is managed with precision and ingenuity.",
        link: "/projects",
        oppositeText: "View Products",
        ariaLabel: "Open Products Page",
      },
    ],
    myPlaylistData: [
      {
        title: "Nick's Rap Music",
        source: "Spotify",
        link: "https://open.spotify.com/playlist/3OqzKPWQf82uvHPsMLvjEU?si=fb34a08c4eef40f0",
        oppositeText: "View Playlist",
        description:
          "A sonic journey through the diverse landscape of contemporary rap, from melodic trap to hard-hitting drill, all upbeat and ready to drive your breakthroughs.",
        ariaLabel: "Open Nick's Rap Spotify Playlist",
      },
    ],
  };

  return (
    <AboutContext.Provider value={aboutData}>{children}</AboutContext.Provider>
  );
};
