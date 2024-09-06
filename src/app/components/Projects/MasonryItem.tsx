"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import { Project } from "@/contexts/ProjectsContext";
import Image from "next/image";
import { arrayRandomItem } from "nicks-web-helpers";
import SideBarModal from "./SideBarModal";

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
    content: '"',
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
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  opacity: 0,
  transform: "translateY(100%)",
  transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
  zIndex: 2,
}));

const TechChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[800],
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

  return (
    <>
      {item && (
        <StyledCard onClick={handleCardClick}>
          <Box
            component="div"
            height={height}
            sx={{ pt: "75%", position: "relative" }}
          >
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              quality={80}
              style={{ objectFit: "scale-down" }}
            />
          </Box>
          <ContentSlate className="content-slate">
            <Typography variant="h5" component="h3" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body2">{item.description}</Typography>
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
          size="lg"
          data={item}
        />
      )}
    </>
  );
};

export default MasonryItem;
