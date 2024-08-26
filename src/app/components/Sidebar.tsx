import React from "react";
import {
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Button,
  IconButton,
  Grid,
  Container,
  Box,
  Divider,
  useTheme,
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
        width: theme.spacing(30),
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: theme.spacing(30),
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
            flexDirection="column"
            py={4}
            sx={{ bgcolor: theme.palette.primary.dark }}
          >
            <Avatar
              alt="Nick Brady"
              src="/images/avatar.jpg"
              sx={{ width: 80, height: 80, mb: 2 }}
            />
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

          <Divider sx={{ bgcolor: theme.palette.divider }} />
        </Box>

        {/* Navigation Links */}
        <List>
          <ListItemButton LinkComponent={NextLink} href="#top">
            <ListItemText
              primary="Intro"
              primaryTypographyProps={{
                textAlign: "right",
                color: theme.palette.primary.contrastText,
              }}
            />
            <ListItemIcon sx={{ color: theme.palette.secondary.light }}>
              <HomeIcon />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
