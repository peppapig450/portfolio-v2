"use client";

import React, { createContext, useContext } from "react";
import { AboutContextData, AboutMeItem, PlaylistItem } from "@/types/types";
import GitHubIcon from "@mui/icons-material/GitHub";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";

// Define the initial context data
const initialContext: AboutContextData = {
  aboutMeItems: [
    {
      title: "Engineering",
      icon: <GitHubIcon />,
      description:
        "First impressions matter, and exceptional website design is crucial for capturing attention. A well-designed website combines eye-catching aesthetics, seamless functionality and user-friendly navigation. As an experienced programmer with Autism Spectrum Disorder, I bring a unique perspective that allows me to approach challenges, with excellent attention to detail, clarity and problem solving, turning complex problems into streamlined solutions. This distinct advantage, combined with my deep understanding of modern development practices, empowers me to craft websites that are not only visually captivating but also optimized for performance, ensuring every detail is perfected.",
      link: "https://github.com/peppapig450",
      linkText: "View GitHub",
    },
  ],
};
