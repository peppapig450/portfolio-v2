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
      <Box component="header" sx={{ py: theme.spacing(5) }}>
        <NavBar />
      </Box>
      <Box component="section" sx={{ width: "100%" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.up("sm")]: {
              maxWidth: "720px",
            },
            [theme.breakpoints.up("md")]: {
              maxWidth: "960px",
            },
            [theme.breakpoints.up("lg")]: {
              maxWidth: "1140px",
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
