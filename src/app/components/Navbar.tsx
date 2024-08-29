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
  useMediaQuery,
  useTheme,
  ButtonBaseProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
  "&:hover": {
    BorderBottom: `1px solid ${theme.palette.primary.main}`,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    <Box sx={{ display: { md: "none", lg: "flex" } }}>
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
        >
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              variant: "h4",
              align: "center",
              my: 4,
            }}
          />
        </ListItemButton>
      </Link>
    );
  };

  const drawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{ justifyContent: "flex-end", p: 1 }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {navItems.map(({ path, label, ariaLabel }) => (
          <ListItemLinkButton
            key={path}
            href={path}
            text={label}
            ariaLabel={ariaLabel}
          />
        ))}
      </List>
    </Drawer>
  );

  // TODO: make the logo bigger and look into avatar
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", px: theme.spacing(1.875) }}
    >
      <StyledAppBar
        position="static"
        sx={{ py: theme.spacing(1), px: theme.spacing(2) }}
      >
        <Toolbar>
          <Link href="/" component={NextLink} underline="none" passHref>
            <LogoWrapper sx={{ ml: theme.spacing(4) }}>
              <Image
                src="/logo.svg"
                alt="Logo"
                fill={true}
                objectFit="cover"
                priority
              />
            </LogoWrapper>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
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
    </Box>
  );
};

export default NavBar;
