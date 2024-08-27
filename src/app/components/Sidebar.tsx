import React, { useState } from "react";
import NextLink from "next/link";

import {
  Drawer,
  Stack,
  Link,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Popover,
  Button,
  Box,
  Divider,
  useTheme,
  IconProps,
  ListItemButton,
  Fab,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";

import useIsMobile from "@/hooks/useIsMobile";

interface NavItem {
  text: string;
  icon: React.ReactElement<IconProps>;
  path: string;
}

interface ListItemLinkButtonProps {
  href: string;
  icon: React.ReactElement<IconProps>;
  text: string;
}

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const togglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const navItems: NavItem[] = [
    { text: "Intro", icon: <HomeIcon />, path: "#top" },
    { text: "Portfolio", icon: <AppsIcon />, path: "#portfolio" },
    { text: "About Me", icon: <PersonIcon />, path: "#about" },
    { text: "Contact", icon: <ContactMailIcon />, path: "#contact" },
  ];

  const ListItemLinkButton: React.FC<ListItemLinkButtonProps> = ({
    href,
    icon,
    text,
  }) => {
    return (
      <Link
        href={href}
        key={text}
        component={NextLink}
        passHref
        underline="none"
      >
        <ListItemButton
          sx={{
            justifyContent: "space-between",
            pl: 3,
            pr: 2,
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.focus,
              "& .MuiListItemIcon-root": {
                color: theme.palette.secondary.main,
              },
              "&. MuiListItemText-primary": {
                color: theme.palette.primary.contrastText,
                fontWeight: "bold",
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            },
            "&:hover": {
              "& .MuiListItemIcon-root": {
                color: theme.palette.secondary.main,
              },
              "& .MuiListItemText-primary": {
                color: theme.palette.primary.contrastText,
                fontWeight: "bold",
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: theme.palette.primary.light,
              minWidth: "auto",
              mr: 2,
              ml: -0.5,
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              color: theme.palette.primary.light,
              textAlign: "right",
            }}
          />
        </ListItemButton>
      </Link>
    );
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerContent = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
    >
      <Box>
        {/* Top Section: Avatar, Name, and Title */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={4}
          px={2}
          sx={{ bgcolor: theme.palette.primary.dark }}
        >
          <Avatar
            alt="Nick Brady"
            src="/images/avatar.jpg"
            sx={{ width: 60, height: 60 }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.contrastText,
              }}
            >
              Nick Brady
            </Typography>
            <Typography variant="body2" color={theme.palette.primary.light}>
              Software Engineer
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: theme.palette.divider }} />
      </Box>

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1, width: "100%" }}>
        {navItems.map(({ text, icon, path }) => (
          <ListItemLinkButton key={text} href={path} icon={icon} text={text} />
        ))}
      </List>

      {/* Bottom Section: Social Links */}
      <Box>
        <Divider sx={{ bgcolor: theme.palette.divider }} />
        <Box display="flex" justifyContent="center" sx={{ p: 1 }}>
          <Stack direction="row" spacing={1}>
            <Link
              href="https://github.com/peppapig450"
              target="_blank"
              rel="noopener"
              component={NextLink}
              passHref
            >
              <IconButton
                color="inherit"
                size="large"
                sx={{ color: theme.palette.primary.light }}
              >
                <GitHubIcon />
              </IconButton>
            </Link>

            <Link
              href="https://www.linkedin.com/in/nick-brady-5715752b3"
              target="_blank"
              rel="noopener"
              component={NextLink}
              passHref
            >
              <IconButton
                color="inherit"
                size="large"
                sx={{ color: theme.palette.primary.light }}
              >
                <LinkedInIcon />
              </IconButton>
            </Link>
            <IconButton
              color="inherit"
              size="large"
              onClick={togglePopover}
              sx={{ color: theme.palette.primary.light }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={togglePopover}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box sx={{ p: 1 }}>
            <Button
              href="mailto:nbgenius1@gmail.com"
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
              sx={{ mb: 1, width: "100%" }}
            >
              Gmail
            </Button>
            <Button
              href="mailto:normalcitizen24@proton.me"
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
              sx={{ mb: 1, width: "100%" }}
            >
              Proton Mail
            </Button>
          </Box>
        </Popover>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? isOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: theme.spacing(37.5),
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: theme.spacing(37.5),
            boxSizing: "border-box",
            bgcolor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {isMobile && (
        <Fab
          color="primary"
          aria-label="toggle sidebar"
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: theme.spacing(2),
            left: theme.spacing(2),
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <MenuIcon />
        </Fab>
      )}
    </>
  );
};

export default Sidebar;
