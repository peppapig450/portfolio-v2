"use client";
import React from "react";
import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { getTransitions } from "@/utils/transitions";
import AnimatedTitle from "./AnimatedTitle";
import FooterLink from "../FooterLink";
import IntroductionText from "./IntroductionText";

const IntroPageContent: React.FC<{}> = ({}) => {
  const theme = useTheme();

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
        <motion.div {...getTransitions(0.1)}>
          <AnimatedTitle />
        </motion.div>

        <Box>
          <IntroductionText />
        </Box>
      </article>

      <motion.div {...getTransitions(0.7)}>
        <FooterLink goto="/about">See More About Me</FooterLink>
      </motion.div>
    </Box>
  );
};

export default IntroPageContent;
