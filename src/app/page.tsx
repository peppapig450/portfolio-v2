"use client";
import Image from "next/image";
import { Container, Box, useTheme } from "@mui/material";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Sidebar />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          pl: { xs: "0", sm: theme.spacing(37.5) },
          transition: theme.transitions.create("padding-left"),
        }}
      >
        <Box component="main">{/* Add all other sections here */}</Box>
      </Container>
    </>
  );
}
