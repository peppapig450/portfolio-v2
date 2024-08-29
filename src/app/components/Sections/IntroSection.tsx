import React from "react";
import NextLink from "next/link";
import { Box, Typography, Link, useTheme } from "@mui/material";
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
      <motion.div {...getTransitions(0.2)}>
        <Box sx={{ px: theme.spacing(3) }}>
          <Typography
            variant="body1"
            component="p"
            sx={{ mt: theme.spacing(2) }}
          >
            Your friendly neighborhood versatile full-stack developer, AI
            engineer, and Python enthusiast. I spend my days and free time
            painting computer screens with{" "}
            <Link
              href="/projects"
              component={NextLink}
              underline="none"
              passHref
              aria-label="Go to Projects page"
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            >
              PROJECTS
            </Link>{" "}
            and lines of code, turning binary into beautiful, performant
            applications.
          </Typography>
          {/* TODO: maybe add my photography stuff */}
          <Typography
            variant="body1"
            component="p"
            sx={{ mt: theme.spacing(1) }}
          >
            I pride myself in versatility, able to build a wide variety of
            applications using a wide variety of tools. Whether it be
            minimilism, raw usability, Material design, I got it covered
            building performant frontends and backends. I also enjoy building
            GUI and command line applications using Java and Python. When
            I&apos;m not coding, you can catch me reading{" "}
            <Link
              href="/"
              component={NextLink}
              underline="none"
              passHref
              aria-label="Check out articles I read."
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            >
              ARTICLES
            </Link>
            . Anywho you can{" "}
            <Link
              href="/contact"
              component={NextLink}
              underline="none"
              passHref
              aria-label="Go to Contact Page"
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            >
              CONTACT ME
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default IntroPageContent;
