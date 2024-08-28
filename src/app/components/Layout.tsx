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
    <>
      <Box sx={{ py: theme.spacing(4) }}>
        <NavBar />
      </Box>
      <Container maxWidth="lg" sx={{ display: "flex" }}>
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
    </>
  );
};

export default Layout;
