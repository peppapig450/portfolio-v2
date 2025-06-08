"use client"
import { useAboutContext } from "@/contexts/AboutContext"
import { useTransitions } from "@/hooks/useTransitions"
import { Container, Grid2 as Grid, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { motion } from "framer-motion"
import FooterLink from "../FooterLink"
import { TimelineSection } from "./TimelineSection"

const AboutContent = () => {
  const theme = useTheme()
  const { aboutMeData, myPlaylistData, myPhotographyData } = useAboutContext()
  const motionPropsOne = useTransitions(0.2)
  const motionPropsTwo = useTransitions(0.4)
  const motionPropsThree = useTransitions(0.6)
  const motionPropsFooter = useTransitions(0.7)

  return (
    <>
      <motion.div {...motionPropsOne}>
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

      <motion.div {...motionPropsTwo}>
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

      <motion.div {...motionPropsThree}>
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
          <Grid size={{ xs: 12, md: 10 }} sx={{ pl: theme.spacing(2) }}>
            <motion.div {...motionPropsFooter}>
              <FooterLink goto="/projects">
                Lets Continue To Projects
              </FooterLink>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default AboutContent
