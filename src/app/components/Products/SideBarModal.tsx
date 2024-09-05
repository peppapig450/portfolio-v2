"use client";
import React, { useCallback, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  styled,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CustomLink from "../CustomLink";
import { Project } from "@/contexts/ProjectsContext";

interface ISideBarModal {
  show: boolean;
  closeShow: () => void;
  size?: "sm" | "lg" | "md";
  overlayColor?: string;
  data?: Project;
}

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "300px",
  overflow: "hidden",
  borderRadius: 11,
});

const TechnologyChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.background.paper,
}));

const OpenProjectButton = styled(Button)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  width: "100%",
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}));

// TODO: add animations for fading in from the left
const SideBarModel: React.FC<ISideBarModal> = ({
  show = false,
  closeShow = () => {},
  size = "md",
  overlayColor = "rgba(0, 0, 0, 0.8)",
  data,
}) => {
  const theme = useTheme();

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
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
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

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          id="product-modal-title"
          sx={{
            mt: theme.spacing(3),
            mb: theme.spacing(1),
          }}
        >
          {data?.title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="textSecondary"
          sx={{
            mb: theme.spacing(3),
          }}
        >
          {data?.about}
        </Typography>
        <ImageContainer>
          <Image src={data?.imageUrl} alt={data?.imageAlt} fill quality={80} />
        </ImageContainer>

        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
        >
          About
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="textSecondary"
          id="product-modal-description"
          sx={{ mb: theme.spacing(2) }}
        >
          {data?.description}
        </Typography>

        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
        >
          Technologies
        </Typography>
        <Box display="flex" flexWrap="wrap" sx={{ gap: 0.5 }}>
          {data?.technologies?.map((technology, index) => (
            <TechnologyChip key={index} label={technology} size="small" />
          ))}
        </Box>

        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
        >
          <LanguageIcon sx={{ mr: 1, verticalAlign: "bottom" }} />
          Website
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ mb: theme.spacing(2), fontWeight: 600 }}
        >
          <CustomLink
            href={data?.link}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {data?.link}
          </CustomLink>
        </Typography>

        {data.github && (
          <>
            <Typography
              variant="h6"
              component="h4"
              sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
            >
              <GitHubIcon sx={{ mr: 1, verticalAlign: "bottom" }} />
              Github
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ mb: theme.spacing(2), fontWeight: 600 }}
            >
              <CustomLink
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {data.github}
              </CustomLink>
            </Typography>
          </>
        )}

        <CustomLink
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          <OpenProjectButton
            variant="contained"
            color="primary"
            endIcon={<OpenInNewIcon />}
          >
            Open Project
          </OpenProjectButton>
        </CustomLink>
      </Box>
    </Drawer>
  );
};

export default SideBarModel;
