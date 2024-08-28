import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { getTransition } from "../utils/transitions";

const noiseAnim2 = keyframes`
      0% {
        clip-path: inset(76% 0 21% 0);
      }
      5% {
        clip-path: inset(54% 0 7% 0);
      }
      10% {
        clip-path: inset(55% 0 29% 0);
      }
      15% {
        clip-path: inset(89% 0 3% 0);
      }
      20% {
        clip-path: inset(33% 0 40% 0);
      }
      25% {
        clip-path: inset(17% 0 56% 0);
      }
      30% {
        clip-path: inset(37% 0 51% 0);
      }
      35% {
        clip-path: inset(38% 0 19% 0);
      }
      40% {
        clip-path: inset(93% 0 4% 0);
      }
      45% {
        clip-path: inset(44% 0 14% 0);
      }
      50% {
        clip-path: inset(53% 0 26% 0);
      }
      55% {
        clip-path: inset(67% 0 11% 0);
      }
      60% {
        clip-path: inset(85% 0 13% 0);
      }
      65% {
        clip-path: inset(27% 0 37% 0);
      }
      70% {
        clip-path: inset(87% 0 4% 0);
      }
      75% {
        clip-path: inset(10% 0 8% 0);
      }
      80% {
        clip-path: inset(51% 0 27% 0);
      }
      85% {
        clip-path: inset(10% 0 60% 0);
      }
      90% {
        clip-path: inset(83% 0 3% 0);
      }
      95% {
        clip-path: inset(23% 0 55% 0);
      }
      100% {
        clip-path: inset(1% 0 81% 0);
      }
    }
`;

const noiseAnim = keyframes`
      0% {
        clip-path: inset(29% 0 25% 0);
      }
      5% {
        clip-path: inset(9% 0 38% 0);
      }
      10% {
        clip-path: inset(96% 0 1% 0);
      }
      15% {
        clip-path: inset(75% 0 23% 0);
      }
      20% {
        clip-path: inset(46% 0 50% 0);
      }
      25% {
        clip-path: inset(3% 0 46% 0);
      }
      30% {
        clip-path: inset(82% 0 2% 0);
      }
      35% {
        clip-path: inset(88% 0 1% 0);
      }
      40% {
        clip-path: inset(91% 0 8% 0);
      }
      45% {
        clip-path: inset(96% 0 2% 0);
      }
      50% {
        clip-path: inset(59% 0 38% 0);
      }
      55% {
        clip-path: inset(41% 0 53% 0);
      }
      60% {
        clip-path: inset(21% 0 47% 0);
      }
      65% {
        clip-path: inset(89% 0 4% 0);
      }
      70% {
        clip-path: inset(1% 0 95% 0);
      }
      75% {
        clip-path: inset(86% 0 4% 0);
      }
      80% {
        clip-path: inset(95% 0 5% 0);
      }
      85% {
        clip-path: inset(54% 0 36% 0);
      }
      90% {
        clip-path: inset(70% 0 27% 0);
      }
      95% {
        clip-path: inset(6% 0 16% 0);
      }
      100% {
        clip-path: inset(95% 0 2% 0);
      }
    }
`;

const IntroPageContent: React.FC<{}> = ({}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <motion.div {...getTransition(0.1)}>
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            fontSize: "2rem",
            color: theme.palette.primary.main,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color={theme.palette.primary.main}
            sx={{
              position: "relative",
              zIndex: 1, // Ensure text is above pseudo-elements
              display: "inline-block",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 2,
                height: "100%",
                width: "100%",
                textShadow: `-1px 0 ${theme.palette.primary.contrastText}`,
                animation: `${noiseAnim2} 15s infinite linear alternate-reverse`,
                zIndex: -1, // Place it behind the text
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: -2,
                height: "100%",
                width: "100%",
                textShadow: `3px 0 ${theme.palette.secondary.main}`,
                animation: `${noiseAnim} 2s infinite linear alternate-reverse`,
                zIndex: -2, // Place it behind the text
              },
            }}
          >
            I&apos;m Nick Brady
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default IntroPageContent;
