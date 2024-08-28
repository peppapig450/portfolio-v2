"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  Link,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { BorderBottom } from "@mui/icons-material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  transition: "all 0.5s ease",
  position: "fixed",
  top: 0,
  padding: "15px 0",
}));

const NavLinkButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
  "&:hover": {
    BorderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
};
