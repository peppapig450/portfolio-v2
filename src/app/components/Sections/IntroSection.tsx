import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { noiseAnim, noiseAnim2 } from "@/styles/keyframes";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { getTransitions } from "../utils/transitions";

const IntroPageContent: React.FC<{}> = ({}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "left",
        textAlign: "left",
        pt: theme.spacing(10),
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",

          color: theme.palette.primary.main,
        }}
      >
        <motion.div {...getTransitions(0.1)}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            color={theme.palette.primary.main}
            sx={{
              position: "relative",
              display: "inline-block",
              "&:before": {
                content: '"I\'m Nick Brady"',
                position: "absolute",
                top: 0,
                left: 2,
                height: "100%",
                width: "100%",
                textShadow: `-1px 0 ${theme.palette.primary.contrastText}`,
                animation: `${noiseAnim2} 15s infinite linear alternate-reverse`,
              },
              "&:after": {
                content: '"I\'m Nick Brady"',
                position: "absolute",
                top: 0,
                left: -2,
                height: "100%",
                width: "100%",
                textShadow: `3px 0 ${theme.palette.secondary.main}`,
                animation: `${noiseAnim} 2s infinite linear alternate-reverse`,
              },
            }}
          >
            I&apos;m Nick Brady
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default IntroPageContent;
