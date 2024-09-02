"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Image from "next/image";
import { subtleBounce } from "@/styles/keyframes";
import CustomLink from "./components/CustomLink";

export default function NotFound(): React.JSX.Element {
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      <Box sx={{ animation: `${subtleBounce} 2s ease-in-out infinite`, mb: 1 }}>
        <Image
          src="/404robot.png"
          alt="Our friendly robot is lost. Looks like you've hit a 404 error."
          width={300}
          height={300}
          priority
          style={{ maxWidth: "100%" }}
        />
      </Box>
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: "4rem", fontWeight: "bold", mb: 2 }}
      >
        404
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
        <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />
        <Typography variant="h5" component="p">
          Oops! The page you&#x27;re looking for doesn&#x27;t exist.
        </Typography>
      </Stack>
      <CustomLink href="/" aria-label="Go back to the Home page.">
        <Button
          color="primary"
          size="large"
          variant="contained"
          startIcon={<HomeIcon />}
          sx={{
            text: theme.palette.primary.contrastText,
            textTransform: "none",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              zIndex: -1,
              left: "51%",
              right: "51%",
              bottom: "1.5px",
              background: theme.palette.primary.main,
              height: "1px",
              transition: "left 0.3s ease-out, right 0.3s ease-out",
            },
            "&:hover::before, &:focus::before, &:active::before": {
              left: 0,
              right: 0,
            },
            px: 4,
            animation: `pulse 1.5s infinite`,
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        >
          Go Back Home
        </Button>
      </CustomLink>
    </Container>
  );
}
