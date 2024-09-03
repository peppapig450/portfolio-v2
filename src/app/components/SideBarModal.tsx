"use client";
import React, { useCallback, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Button,
  Link,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface ISideBarModal {
  show: boolean;
  closeShow: () => void;
  size?: "sm" | "lg" | "md";
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
};

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: ({ size }: { size: ISideBarModal["size"] }) => {
      switch (size) {
        case "sm":
          return "21.8em";
        case "lg":
          return "34em";
        case "md":
        default:
          return "29em";
      }
    },
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
    padding: theme.spacing(2),
    overflow: "auto",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const TechnologyChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.background.default,
}));
