"use client"
import { ProjectType, useProjectsContext } from "@/contexts/ProjectsContext"
import { Container, Grid2 as Grid, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import CustomTabs from "../CustomTabs"
import FooterLink from "../FooterLink"
import { StaggeredContainer } from "../StaggeredContainer"
import MasonryItem from "./MasonryItem"
import MasonryLayout from "./MasonryLayout"

const ProjectsContent = () => {
  const theme = useTheme()
  const { projects } = useProjectsContext()

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
  ]

  return (
    <StaggeredContainer as="div" staggerDelay={0.2} initialDelay={0.2}>
      <Container
        component="section"
        sx={{ mb: 5, px: theme.spacing(1.785), mx: "auto" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }}>
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
            <CustomTabs items={tabItems} />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mb: 5, px: theme.spacing(1.875), mx: "auto" }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }} sx={{ pl: theme.spacing(2.5) }}>
            <FooterLink goto="/resume">Let&apos;s Go To My Resume.</FooterLink>
          </Grid>
        </Grid>
      </Container>
    </StaggeredContainer>
  )
}

export default ProjectsContent
