"use client"
import { Box, useTheme } from "@mui/material"
import FooterLink from "../FooterLink"
import { StaggeredContainer } from "../StaggeredContainer"
import AnimatedTitle from "./AnimatedTitle"
import IntroductionText from "./IntroductionText"

const IntroPageContent = () => {
  const theme = useTheme()

  return (
    <StaggeredContainer
      as={Box}
      staggerDelay={0.4}
      initialDelay={0.1}
      sx={{
        justifyContent: "flex-start",
        alignItems: "left",
        textAlign: "left",
        flexBasis: "83.3333%",
        maxWidth: "83.3333%",
        mt: theme.spacing(7),
      }}
    >
      <article>
        <AnimatedTitle />
        <Box>
          <IntroductionText />
        </Box>
      </article>
      <FooterLink goto="/about">See More About Me</FooterLink>
    </StaggeredContainer>
  )
}

export default IntroPageContent
