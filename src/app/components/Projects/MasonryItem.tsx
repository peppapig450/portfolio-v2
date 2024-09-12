"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import CustomCardMedia from "./CustomCardMedia";
import { Project } from "@/contexts/ProjectsContext";
import Image from "next/image";
import { arrayRandomItem } from "nicks-web-helpers";
import SideBarModal from "./SideBarModal";
import imgixURLBuilder from "@/utils/imageUrlBuilder";

interface MasonryItemProps {
  item?: Project;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    "& .content-slate": {
      opacity: 1,
      transform: "none",
    },
    "&::after": {
      opacity: 1,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 10%, rgba(0, 0, 0, 0.78) 80%)",
    opacity: 0.3,
    transition: "opacity 300ms ease-in-out",
  },
  [theme.breakpoints.down("sm")]: {
    "&::after": {
      opacity: 1,
    },
    "& .content-slate": {
      opacity: 1,
      transform: "none",
    },
  },
}));

const ContentSlate = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  margin: "0 0 1.5em",
  padding: "1.4rem 2rem",
  color: theme.palette.common.white,
  width: "100%",
  opacity: 0,
  transform: "translateY(100%)",
  transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
  zIndex: 2,
}));

const TechChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[600],
  color: theme.palette.common.white,
}));

const MasonryItem: React.FC<MasonryItemProps> = ({ item }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [height] = useState<string>(
    arrayRandomItem(["400px", "454px", "310px"])
  );

  const handleCardClick = () => {
    if (pathname.includes("projects")) {
      setShowModal(true);
    } else if (item?.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  // TODO: on safari use an image tag with an h264 mp4 video https://developer.apple.com/documentation/webkit/delivering_video_content_for_safari#3030250
  return (
    <>
      {item && (
        <StyledCard
          onClick={handleCardClick}
          sx={{ height: height, width: "100%" }}
        >
          <CardMedia
            src={imgixURLBuilder(item.mediaUrl)}
            component="video"
            autoPlay
            muted
            playsInline
            loop
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <ContentSlate className="content-slate">
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ fontWeight: "900", mb: theme.spacing(1) }}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: theme.spacing(2) }}>
              {item.description}
            </Typography>
            {item.technologies && (
              <Box mt={1}>
                {item.technologies.map((tech, index) => (
                  <TechChip key={index} label={tech} size="small" />
                ))}
              </Box>
            )}
          </ContentSlate>
        </StyledCard>
      )}
      {pathname.includes("/projects") && (
        <SideBarModal
          show={showModal}
          closeShow={() => setShowModal(false)}
          data={item}
        />
      )}
    </>
  );
};

export default MasonryItem;
