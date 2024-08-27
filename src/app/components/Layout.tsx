"use client";
import React from "react";
import { Box, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          overflowY: "auto",
          ml: { xs: 0, sm: theme.spacing(37.5) },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
