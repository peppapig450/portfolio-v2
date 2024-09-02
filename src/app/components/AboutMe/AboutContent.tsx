"use client";
import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useAboutContext } from "@/contexts/AboutContext";
import { TimelineSection } from "./TimelineSection";
import FooterLink from "../FooterLink";
import { motion } from "framer-motion";
import { getTransitions } from "@/utils/transitions";
import { SectionWrapper } from "../Layout";

const AboutContent = () => {
  const { aboutMeData, myPlaylistData, myPhotographyData } = useAboutContext();

  return (
    <Box>
      <SectionWrapper>
        <Box sx={{ px: 0 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            About Me.
          </Typography>
        </Box>
        <TimelineSection items={aboutMeData} />
      </SectionWrapper>
      <SectionWrapper>
        <TimelineSection title="My Playlists." items={myPlaylistData} />
      </SectionWrapper>
      <SectionWrapper>
        <TimelineSection title="My Photography." items={myPhotographyData} />
      </SectionWrapper>
      <motion.div {...getTransitions(0.7)}>
        <FooterLink goto="/projects">Lets Continue To Projects</FooterLink>
      </motion.div>
    </Box>
  );
};

export default AboutContent;
