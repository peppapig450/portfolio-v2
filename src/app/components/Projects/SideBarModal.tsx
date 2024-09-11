"use client";
import React, { useCallback, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CustomLink from "../CustomLink";
import imgixURLBuilder from "@/utils/imageUrlBuilder";
import { Project } from "@/contexts/ProjectsContext";

interface ISideBarModal {
  show: boolean;
  closeShow: () => void;
  data?: Project;
}

const MediaContainer = styled(Box)({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  height: "300px",
  borderRadius: 11,
});

const TechnologyChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.grey.A400,
  color: theme.palette.text.primary,
  fontWeight: "bold",
}));

const OpenProjectButton = styled(Button)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  width: "100%",
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}));

const SideBarModal: React.FC<ISideBarModal> = ({
  show = false,
  closeShow = () => {},
  data,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

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

  const drawerWidth = isSmallScreen ? "100%" : isLargeScreen ? 600 : 500;

  if (!data) return null;

  return (
    <Drawer
      anchor="right"
      open={show}
      onClose={closeShow}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      PaperProps={{
        style: {
          padding: "1.5rem",
        },
        sx: {
          width: drawerWidth,
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
          variant="body2"
          component="p"
          color="textSecondary"
          sx={{
            mb: theme.spacing(3),
          }}
        >
          {data?.about}
        </Typography>
        <MediaContainer>
          <video
            src={imgixURLBuilder(data?.mediaUrl)}
            autoPlay
            muted
            loop
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </MediaContainer>

        <Typography
          variant="h6"
          component="h4"
          color="textPrimary"
          fontWeight="bold"
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
          color="textPrimary"
          fontWeight="bold"
          sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
        >
          Technologies
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          {data?.technologies?.map((technology, index) => (
            <TechnologyChip key={index} label={technology} size="small" />
          ))}
        </Stack>

        <Typography
          variant="h6"
          component="h4"
          color="textPrimary"
          fontWeight="bold"
          sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
        >
          <LanguageIcon sx={{ mr: 1 }} />
          Website
        </Typography>
        <Typography variant="body2" component="p" sx={{ mb: theme.spacing(2) }}>
          <CustomLink
            href={data?.link}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color={theme.palette.text.primary}
            fontWeight="bold"
          >
            {data?.link}
          </CustomLink>
        </Typography>

        {data.github && (
          <>
            <Typography
              variant="h6"
              component="h4"
              color="textPrimary"
              fontWeight="bold"
              sx={{
                mb: theme.spacing(1.6),
                mt: theme.spacing(4),
              }}
            >
              <GitHubIcon
                fontSize="small"
                sx={{ mr: 1, color: theme.palette.text.secondary }}
              />
              Github
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ mb: theme.spacing(2) }}
            >
              <CustomLink
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color={theme.palette.text.primary}
                fontWeight="bold"
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
            fullWidth
            endIcon={<OpenInNewIcon />}
          >
            Open Project
          </OpenProjectButton>
        </CustomLink>
      </Box>
    </Drawer>
  );
};

export default SideBarModal;
