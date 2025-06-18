"use client"
import { useAboutContext } from "@/contexts/AboutContext"
import { Container, Grid, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import FooterLink from "../FooterLink"
import { StaggeredContainer } from "../StaggeredContainer"
import { TimelineSection } from "./TimelineSection"

const AboutContent = () => {
  const theme = useTheme()
  const { aboutMeData, myPlaylistData, myPhotographyData } = useAboutContext()

  return (
    <StaggeredContainer as="div" staggerDelay={0.2} initialDelay={0.2}>
      <Container
        component="section"
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

      <Container
        component="section"
        aria-label="You are now in my musical  section."
        sx={{ mb: 5, px: theme.spacing(1.875), mx: "auto" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }}>
            <TimelineSection title="My Playlists." items={myPlaylistData} />
          </Grid>
        </Grid>
      </Container>

      <Container
        component="section"
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

      <Container sx={{ mb: 5, px: theme.spacing(1.875), mx: "auto" }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }} sx={{ pl: theme.spacing(2) }}>
            <FooterLink goto="/projects">Lets Continue To Projects</FooterLink>
          </Grid>
        </Grid>
      </Container>
    </StaggeredContainer>
  )
}

export default AboutContent
