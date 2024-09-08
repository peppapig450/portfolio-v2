"use client";
import React from "react";
import { Container, Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ProjectType, useProjectsContext } from "@/contexts/ProjectsContext";
import MasonryLayout from "./MasonryLayout";
import MasonryItem from "./MasonryItem";
import FooterLink from "../FooterLink";
import { motion } from "framer-motion";
import { getTransitions } from "@/utils/transitions";
import CustomTabs from "../CustomTabs";

const ProjectsContent = () => {
  const theme = useTheme();
  const { projects } = useProjectsContext();

  const tabItems = [
    {
      label: "All",
      content: (
        <MasonryLayout>
          {projects.map((item, index) => (
            <MasonryItem key={index} item={item} />
          ))}
        </MasonryLayout>
      ),
    },
    {
      label: "Projects",
      content: (
        <MasonryLayout>
          {projects
            .filter((item) => item.type.includes(ProjectType.Project))
            .map((item, index) => (
              <MasonryItem key={index} item={item} />
            ))}
        </MasonryLayout>
      ),
    },
    {
      label: "Dev Tools",
      content: (
        <MasonryLayout>
          {projects
            .filter((item) => item.type.includes(ProjectType.Tools))
            .map((item, index) => (
              <MasonryItem key={index} item={item} />
            ))}
        </MasonryLayout>
      ),
    },
    {
      label: "Open Source",
      content: (
        <MasonryLayout>
          {projects
            .filter((item) => item.type.includes(ProjectType.OpenSource))
            .map((item, index) => (
              <MasonryItem key={index} item={item} />
            ))}
        </MasonryLayout>
      ),
    },
  ];

  return (
    <>
      <Container
        component="section"
        id="main-content"
        sx={{ mb: 5, px: theme.spacing(1.785), mx: "auto" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }}>
            <motion.div {...getTransitions(0.2)}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  pl: theme.spacing(2),
                  mt: theme.spacing(8),
                  mb: theme.spacing(3),
                }}
              >
                Projects.
              </Typography>
            </motion.div>
            <motion.div {...getTransitions(0.4)}>
              <CustomTabs items={tabItems} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mb: 5, px: theme.spacing(1.875), mx: "auto" }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }} sx={{ pl: theme.spacing(2.5) }}>
            <motion.div {...getTransitions(0.6)}>
              <FooterLink goto="/resume">
                Let&apos;s Go To My Resume.
              </FooterLink>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProjectsContent;
