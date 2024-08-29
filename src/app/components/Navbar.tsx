"use client";

import React, { useState } from "react";
import {
  AppBar,
  AppBarProps,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  Link,
  ListItemButton,
  ListItemText,
  useTheme,
  ButtonBaseProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useIsMobile from "@/hooks/useIsMobile";
import { BorderBottom } from "@mui/icons-material";

const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  transition: "all 0.5s ease",
}));

const NavLinkButton = styled(Button)<ButtonBaseProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
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
}));

const LogoWrapper = styled(Box)({
  flexGrow: 1,
  position: "relative",
  width: "58px",
  height: "65px",
  "&:hover": {
    cursor: "pointer",
  },
});

interface NavBarProps {}

interface NavItem {
  label: string;
  path: string;
  ariaLabel: string;
}

interface ListItemButtonLinkProps {
  href: string;
  text: string;
  ariaLabel: string;
}

const NavBar: React.FC<NavBarProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useIsMobile();

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const navItems: NavItem[] = [
    { label: "About", path: "/about", ariaLabel: "Navigate to the About Page" },
    {
      label: "Projects",
      path: "/projects",
      ariaLabel: "Navigate to the Projects Page",
    },
    {
      label: "Contact",
      path: "/contact",
      ariaLabel: "Navigate to the Conctacts Page",
    },
  ];

  const renderNavLinks = () => (
    <Box sx={{ display: { sm: "none", md: "block" } }}>
      {navItems.map((item) => (
        <Link
          href={item.path}
          key={item.path}
          component={NextLink}
          passHref
          underline="hover"
        >
          <NavLinkButton
            variant="text"
            color="inherit"
            aria-label={item.ariaLabel}
          >
            {item.label}
          </NavLinkButton>
        </Link>
      ))}
    </Box>
  );

  const ListItemLinkButton: React.FC<ListItemButtonLinkProps> = ({
    href,
    text,
    ariaLabel,
  }) => {
    return (
      <Link
        href={href}
        key={href}
        component={NextLink}
        passHref
        underline="none"
      >
        <ListItemButton
          onClick={handleDrawerToggle}
          selected={pathname === href}
          aria-label={ariaLabel}
          sx={{
            display: "block",
            textAlign: "center",
            width: "fit-content",
            margin: { xs: "3rem auto", md: "0" },
            position: "relative",
            justifyContent: "center",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              zIndex: -1,
              left: "51%",
              right: "51%",
              bottom: "1.5px",
              backgroundColor: theme.palette.primary.main,
              height: "1px",
              transition: "left 0.3s ease-out, right 0.3s ease-out",
            },
            "&:hover:before, &:focus:before, &:active:before": {
              left: 0,
              right: 0,
            },
          }}
        >
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              variant: "h6",
              sx: { textAlign: "center" },
            }}
          />
        </ListItemButton>
      </Link>
    );
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="Close menu"
          sx={{ p: 1, zIndex: 9999 }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, textAlign: "center", width: "100%" }}>
        {navItems.map(({ path, label, ariaLabel }) => (
          <ListItemLinkButton
            key={path}
            href={path}
            text={label}
            ariaLabel={ariaLabel}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", px: theme.spacing(1.875) }}
    >
      <StyledAppBar
        position="static"
        component="nav"
        sx={{ py: theme.spacing(1), px: theme.spacing(2) }}
      >
        <Toolbar sx={{ mr: theme.spacing(5) }}>
          <Link href="/" component={NextLink} underline="none" passHref>
            <LogoWrapper sx={{ ml: theme.spacing(4) }}>
              <Image
                src="/logo.svg"
                alt="Logo"
                fill={true}
                style={{ objectFit: "cover" }}
                priority
              />
            </LogoWrapper>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {isMobile ? (
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            renderNavLinks()
          )}
        </Toolbar>
      </StyledAppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: "100vw", height: "100vh" },
          }}
          sx={{
            sm: "block",
            md: "none",
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default NavBar;
