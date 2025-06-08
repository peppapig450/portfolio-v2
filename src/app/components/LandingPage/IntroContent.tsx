"use client"
import { useTransitions } from "@/hooks/useTransitions"
import { Box, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import React from "react"
import FooterLink from "../FooterLink"
import AnimatedTitle from "./AnimatedTitle"
import IntroductionText from "./IntroductionText"

const IntroPageContent: React.FC<{}> = ({}) => {
  const theme = useTheme()
  const motionPropsTitle = useTransitions(0.1)
  const motionPropsFooter = useTransitions(0.7)

  return (
    <Box
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
        <motion.div {...motionPropsTitle}>
          <AnimatedTitle />
        </motion.div>

        <Box>
          <IntroductionText />
        </Box>
      </article>

      <motion.div {...motionPropsFooter}>
        <FooterLink goto="/about">See More About Me</FooterLink>
      </motion.div>
    </Box>
  )
}

export default IntroPageContent
