"use client";
import React, { useCallback, useEffect } from "react";
import {
  Drawer,
  DrawerProps,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Link,
  styled,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CustomLink from "../CustomLink";

interface ISideBarModal {
  show: boolean;
  closeShow: () => void;
  size?: "sm" | "lg" | "md";
  overlayColor?: string;
  data?: {
    title: string;
    description?: string;
    technologies?: string[];
    github?: string;
    imageUrl?: string;
    about?: string;
    link?: string;
  };
}

const defaultProps: ISideBarModal = {
  show: false,
  closeShow: () => {},
  size: "md",
  overlayColor: "rgba(0, 0, 0, 0.8)",
};

const ImageContainer = styled(Box)({
  position: "relative",
  overflow: "hidden",
  borderRadius: 11,
});

const TechnologyChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.background.default,
}));

const OpenProjectButton = styled(Button)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  width: "100%",
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}));

const SideBarModel: React.FC<ISideBarModal> = ({
  show,
  closeShow,
  size = "md",
  data,
}) => {
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeShow();
      }
    },
    [closeShow]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!data) return null; // TODO: make sure this is safe

  const drawerWidth = size === "sm" ? 350 : size === "lg" ? 600 : 500;

  return (
    <Drawer
      anchor="right"
      open={show}
      onClose={closeShow}
      PaperProps={{
        style: {
          width: drawerWidth,
          padding: "1.5rem",
        },
      }}
    >
      <Box sx={{ position: "relative", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            pb: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <IconButton
            onClick={closeShow}
            size="small"
            aria-label="Close the SideBar project info modal"
          >
            <CloseIcon />
          </IconButton>
          <CustomLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeShow();
            }}
            underline="hover"
          >
            <Typography variant="body1" fontWeight="bold">
              Back To Projects.
            </Typography>
          </CustomLink>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="body1" component="p" color="textSecondary">
            {data.description}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};
