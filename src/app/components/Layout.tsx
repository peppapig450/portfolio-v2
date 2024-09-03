"use client";
import React, { PropsWithChildren } from "react";
import { Box, useTheme, Container } from "@mui/material";
import NavBar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}
interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  // Additional props can be added here if needed
}

export const _SectionWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = ({
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ width: "100%" }} {...rest}>
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
  );
};

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  // Additional props can be added here if needed
}

export const SectionWrapper: React.FC<
  PropsWithChildren<SectionWrapperProps>
> = ({ children }) => {
  return <div>{children}</div>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Box component="header" sx={{ py: theme.spacing(5) }}>
        <NavBar />
      </Box>
      <_SectionWrapper>{children}</_SectionWrapper>
    </>
  );
};

export default Layout;
