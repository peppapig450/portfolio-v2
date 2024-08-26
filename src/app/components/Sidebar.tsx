import React from "react";
import {
  Drawer,
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "right",
          p: theme.spacing(2),
          height: "100%",
        }}
      >
        {/* Avatar and Name Section */}
        <Avatar
          alt="Nick Brady"
          src="/public/images/avatar.jpg"
          sx={{ width: 80, height: 80, mb: 2 }}
        />
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          Nick Brady
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Software Developer
        </Typography>

        {/* Navigation Linls */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;