import React from "react";
import { Box, useTheme, Container } from "@mui/material";
import Sidebar from "./Sidebar";
import NavBar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ display: "flex" }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
