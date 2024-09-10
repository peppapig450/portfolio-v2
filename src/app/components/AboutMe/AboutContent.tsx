"use client";
import React from "react";
import { Container, Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAboutContext } from "@/contexts/AboutContext";
import { TimelineSection } from "./TimelineSection";
import FooterLink from "../FooterLink";
import { motion } from "framer-motion";
import { getTransitions } from "@/utils/transitions";

const AboutContent = () => {
  const theme = useTheme();
  const { aboutMeData, myPlaylistData, myPhotographyData } = useAboutContext();

  return (
    <>
      <motion.div {...getTransitions(0.2)}>
        <Container
          component="section"
          id="main-content"
          aria-label="You are now in my professional background section."
          sx={{ mb: 5, px: theme.spacing(1.785), mx: "auto" }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid size={{ xs: 12, md: 10 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                fontWeight="bold"
                sx={{ pl: theme.spacing(2) }}
              >
                About Me.
              </Typography>
              <TimelineSection items={aboutMeData} />
            </Grid>
          </Grid>
        </Container>
      </motion.div>

      <motion.div {...getTransitions(0.4)}>
        <Container
          component="section"
          id="main-content"
          aria-label="You are now in my musical  section."
          sx={{ mb: 5, px: theme.spacing(1.875), mx: "auto" }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid size={{ xs: 12, md: 10 }}>
              <TimelineSection title="My Playlists." items={myPlaylistData} />
            </Grid>
          </Grid>
        </Container>
      </motion.div>

      <motion.div {...getTransitions(0.6)}>
        <Container
          component="section"
          id="main-content"
          aria-label="You are now in my Photography section."
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid size={{ xs: 12, md: 10 }}>
              <TimelineSection
                title="My Photography."
                items={myPhotographyData}
              />
            </Grid>
          </Grid>
        </Container>
      </motion.div>

      <Container sx={{ mb: 5, px: theme.spacing(1.875), mx: "auto" }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }}>
            <motion.div {...getTransitions(0.7)}>
              <FooterLink goto="/projects">
                Lets Continue To Projects
              </FooterLink>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutContent;
