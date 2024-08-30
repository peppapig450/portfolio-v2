import React from "react";
import NextLink from "next/link";
import { Box, Typography, Link, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { noiseAnim, noiseAnim2 } from "@/styles/keyframes";
import { getTransitions } from "../utils/transitions";
import FooterLink from "../FooterLink";

// TODO: Refactor this into resusable components and stylized components
const IntroPageContent: React.FC<{}> = ({}) => {
  const theme = useTheme();

  return (
    <Box
      component="article"
      sx={{
        justifyContent: "flex-start",
        alignItems: "left",
        textAlign: "left",
        flexBasis: "83.3333%",
        maxWidth: "83.3333%",
        mt: theme.spacing(7),
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
            color={theme.palette.text.primary}
            sx={{
              letterSpacing: "9.9px",
              position: "relative",
              mb: theme.spacing(0.75),
              display: "inline-block",
              "&:before": {
                content: '"I\'M NICK BRADY"',
                position: "absolute",
                top: 0,
                left: 2,
                height: "100%",
                width: "100%",
                textShadow: `-1px 0 ${theme.palette.text.primary}`,
                animation: `${noiseAnim2} 15s infinite linear alternate-reverse`,
              },
              "&:after": {
                content: '"I\'M NICK BRADY"',
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
            I&apos;M NICK BRADY
          </Typography>
        </motion.div>
      </Box>
      <Box>
        <motion.div {...getTransitions(0.2)}>
          <Typography
            variant="body1"
            component="p"
            align="justify"
            sx={{ lineHeight: "2.3" }}
          >
            Welcome! I&apos;m a versatile full-stack developer and AI engineer,
            blending creativity with technical expertise. From sleek frontends
            to robust backends, I craft high-performance applications across the
            full tech stack. My diverse toolkit spans Java, Python, React, and
            more, allowing me to tackle any{" "}
            <Link
              href="/projects"
              component={NextLink}
              underline="none"
              passHref
              aria-label="Go to Projects page"
              sx={{
                fontWeight: "bold",
                border: "medium",
                textTransform: "uppercase",
                color: theme.palette.primary.main,
              }}
            >
              project
            </Link>{" "}
            with innovative solutions.
          </Typography>
        </motion.div>
        <motion.div {...getTransitions(0.3)}>
          {/* TODO: maybe add my photography stuff */}
          <Typography
            variant="body1"
            component="p"
            sx={{ mt: theme.spacing(1), lineHeight: "2.3" }}
          >
            Off-screen, I&apos;m either exploring tech insights through{" "}
            <Link
              href="/"
              component={NextLink}
              underline="none"
              passHref
              aria-label="Check out articles I read."
              sx={{
                fontWeight: "bold",
                border: "medium",
                textTransform: "uppercase",
                color: theme.palette.primary.main,
              }}
            >
              articles
            </Link>{" "}
            or finding inspiration through{" "}
            <Link
              href="/photography"
              component={NextLink}
              underline="none"
              passHref
              aria-label="Check out my photography."
              sx={{
                fontWeight: "bold",
                border: "medium",
                textTransform: "uppercase",
                color: theme.palette.primary.main,
              }}
            >
              photography
            </Link>
            . Ready to bring a unique perspective to your next project?{" "}
            <Link
              href="/contact"
              component={NextLink}
              underline="none"
              passHref
              aria-label="Go to Contact Page"
              sx={{
                fontWeight: "bold",
                border: "medium",
                textTransform: "uppercase",
                color: theme.palette.primary.main,
              }}
            >
              contact me
            </Link>{" "}
            and let&apos;s create something extraordinary.
          </Typography>
        </motion.div>
      </Box>
      <motion.div {...getTransitions(0.7)}>
        <FooterLink goto="/about">See More About Me</FooterLink>
      </motion.div>
    </Box>
  );
};

export default IntroPageContent;
