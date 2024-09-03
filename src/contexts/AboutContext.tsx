"use client";

import React, { createContext, useContext, ReactNode } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import CopyrightIcon from "@mui/icons-material/Copyright";

// Define the base timeline data interface with common properties
export interface TimelineItemType {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  description: string;
  link: string;
  linkText: string;
  ariaLabel: string;
}

// Define the context data type that combines all items
type AboutContextType = {
  aboutMeData: TimelineItemType[];
  myPlaylistData: TimelineItemType[];
  myPhotographyData: TimelineItemType[];
};

export const AboutContext = createContext<AboutContextType | undefined>(
  undefined
);

export const useAboutContext = () => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error("useAboutContext must be used within an AboutProvider");
  }
  return context;
};

export default function AboutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const aboutData: AboutContextType = {
    aboutMeData: [
      {
        title: "Engineering",
        icon: <GitHubIcon />,
        description:
          "First impressions matter, and exceptional website design is crucial for capturing attention. A well-designed website combines eye-catching aesthetics, seamless functionality and user-friendly navigation. As an experienced programmer with Autism Spectrum Disorder, I bring a unique perspective that allows me to approach challenges, with excellent attention to detail, clarity and problem solving, turning complex problems into streamlined solutions. This distinct advantage, combined with my deep understanding of modern development practices, empowers me to craft websites that are not only visually captivating but also optimized for performance, ensuring every detail is perfected.",
        link: "https://github.com/peppapig450",
        linkText: "View GitHub",
        ariaLabel: "Open GitHub link",
      },
      {
        title: "Product",
        icon: <PublicIcon />,
        description:
          "While I may not fit the traditional profile of a product manager, my unique perspective as an autistic individual, combined with  my quick learning ability and creativity, gives me a distinct advantage in driving product success from concept to launch. My diverse skill set in research, product design, and coordination allow me to approach challenges with fresh, innovative solutions while maintaining a clear, focused vision throughout the product&apos;s journey. With exceptional analytical thinking, attention to detail, and a talent for creatively bridging the gap between technical and product domains, I excel at navigating the path from 0 to 100, ensuring every stage is managed with precision and ingenuity.",
        link: "/projects",
        linkText: "View Products",
        ariaLabel: "Open Products Page",
      },
    ],
    myPlaylistData: [
      {
        title: "Nick's Rap Music",
        subtitle: "Spotify",
        icon: <LibraryMusicIcon />,
        link: "https://open.spotify.com/playlist/3OqzKPWQf82uvHPsMLvjEU?si=fb34a08c4eef40f0",
        linkText: "View Playlist",
        description:
          "A sonic journey through the diverse landscape of contemporary rap, from melodic trap to hard-hitting drill, all upbeat and ready to drive your breakthroughs.",
        ariaLabel: "Open Nick's Rap Spotify Playlist",
      },
      {
        title: "Oldhead Music",
        subtitle: "Spotify",
        icon: <LibraryMusicIcon />,
        link: "https://open.spotify.com/playlist/3nbY7LejIN8bxZU3K2JOcv?si=e0a1d7eba2bc4e3e",
        linkText: "View Playlist",
        description:
          "Relive the golden age of hip-hop with these 90&apos;s hits.",
        ariaLabel: "Open Nick's Classic Hip-Hop Spotify Playlist",
      },
      {
        title: "Destress",
        subtitle: "Spotify",
        icon: <LibraryMusicIcon />,
        link: "https://open.spotify.com/playlist/0x7GTLuKs6DpJJjFrxVspv?si=53b60cfb5cad41fc",
        linkText: "View Playlist",
        description:
          "Relax and unwind with a soothing blend of jazz, bluegrass, Irish, Scottish, and Cape Breton folk music.",
        ariaLabel: "Open Nick's Destress instrumental Spotify Playlist",
      },
      {
        title: "New York Drill",
        subtitle: "Spotify",
        icon: <LibraryMusicIcon />,
        link: "https://open.spotify.com/playlist/01tNtba1lN6P8dBHNp6DKr?si=d74b45d062c140e5",
        linkText: "View Playlist",
        description:
          "Collection of hard hitting New York Drill tracks out the Bronx and Brooklyn.",
        ariaLabel: "Open Nick's New York Drill Spotify Playlist",
      },
      {
        title: "Other stuff",
        subtitle: "Spotify",
        icon: <LibraryMusicIcon />,
        link: "https://open.spotify.com/playlist/3l7GfvyPWMo5SgZBAnVuzy?si=00653f2c97c74aed",
        linkText: "View Playlist",
        description:
          "Unleash your inner rockstar or groove to classic hits! This playlist spans decades, featuring assorted mixes of 2010s & 2020s Pop, Classic Rock, Grunge, Big Band & New Wave.",
        ariaLabel: "Open Nick's Playlist of Assorted Genres",
      },
      {
        title: "Classical Bangers",
        subtitle: "Spotify",
        icon: <LibraryMusicIcon />,
        link: "https://open.spotify.com/playlist/27Zm1P410dPfedsdoO9fqm?si=cec1a68e64704404",
        linkText: "View Playlist",
        description:
          "Best classical music to study, chill and relax. From Mozart, Chopin, Vivaldi, Beethoven, Tchaikovsky, to Christmas classics.",
        ariaLabel: "Open Classical Bangers Playlist of Classical Music",
      },
    ],
    myPhotographyData: [
      {
        title: "Nick's Photography Collection",
        icon: <PhotoCameraBackIcon />,
        link: "/photography",
        description:
          "A collection of my personal photography. All shot on my iPhone.",
        linkText: "View Page",
        ariaLabel: "Go to Nick's photography collection page",
      },
    ],
  };

  return (
    <AboutContext.Provider value={aboutData}>{children}</AboutContext.Provider>
  );
}
