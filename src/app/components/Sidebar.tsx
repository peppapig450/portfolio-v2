import React from "react";
import {
  Drawer,
  Link,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Box,
  Divider,
  useTheme,
  IconProps,
  ListItemButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import NextLink from "next/link";

const Sidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: theme.spacing(37.5),
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: theme.spacing(37.5),
          boxSizing: "border-box",
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      }}
    >
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
              <Typography
                variant="body2"
                color={theme.palette.primary.contrastText}
              >
                Software Developer
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: theme.palette.divider }} />
        </Box>

        {/* Navigation Links */}
        <List sx={{ flexGrow: 1, width: "100%" }}>
          <ListItemButton
            LinkComponent={NextLink}
            href="#top"
            sx={{ justifyContent: "space-between", pl: 3, pr: 2 }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.secondary.light,
                minWidth: "auto",
                mr: 2,
              }}
            >
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Intro"
              primaryTypographyProps={{
                textAlign: "right",
                color: theme.palette.primary.contrastText,
              }}
            />
          </ListItemButton>
          <ListItemButton
            LinkComponent={NextLink}
            href="#portfolio"
            sx={{ justifyContent: "space-between", pl: 3, pr: 2 }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.secondary.light,
                minWidth: "auto",
                mr: 2,
              }}
            >
              <WorkIcon />
            </ListItemIcon>
            <ListItemText
              primary="Portfolio"
              primaryTypographyProps={{
                textAlign: "right",
                color: theme.palette.primary.contrastText,
              }}
            />
          </ListItemButton>

          <ListItemButton
            LinkComponent={NextLink}
            href="#about"
            sx={{ justifyContent: "space-between", pl: 3, pr: 2 }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.secondary.light,
                minWidth: "auto",
                mr: 2,
              }}
            >
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="About Me"
              primaryTypographyProps={{
                textAlign: "right",
                color: theme.palette.primary.contrastText,
              }}
            />
          </ListItemButton>

          <ListItemButton
            LinkComponent={NextLink}
            href="#contact"
            sx={{ justifyContent: "space-between", pl: 3, pr: 2 }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.secondary.light,
                minWidth: "auto",
                mr: 2,
              }}
            >
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Contact"
              primaryTypographyProps={{
                textAlign: "right",
                color: theme.palette.primary.contrastText,
              }}
            />
          </ListItemButton>
        </List>
      </Box>

      {/* Bottom Section: Social Links */}
      <Box>
        <Divider sx={{ bgcolor: theme.palette.divider }} />
        <Grid container justifyContent="center" spacing={2} p={2}>
          <Grid item>
            <Link
              href="https://github.com/peppapig450"
              target="_blank"
              rel="noopener noreferrer"
              component={NextLink}
              passHref
            >
              <IconButton
                color="inherit"
                size="large"
                sx={{ color: theme.palette.secondary.main }}
              >
                <GitHubIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://www.linkedin.com/in/nick-brady-5715752b3"
              target="_blank"
              rel="noopener noreferrer"
              component={NextLink}
              passHref
            >
              <IconButton
                color="inherit"
                size="large"
                sx={{ color: theme.palette.secondary.main }}
              >
                <LinkedInIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
