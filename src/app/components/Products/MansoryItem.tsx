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

interface MasonryItemProps {
  item?: Omit<Project, "type">;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    "& .MuiCardContent-root": {
      transform: "translate(0)",
      opacity: 1,
    },
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))",
  color: theme.palette.common.white,
  transform: "translateY(100%)",
  opacity: 0,
  transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
}));

const MasonryItem: React.FC<MasonryItemProps> = ({ item }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCardClick = () => {
    if (pathname.includes("projects")) {
      setShowModal(true);
    } else if (item?.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <StyledCard onClick={handleCardClick}>
        <Box
          position="relative"
          height={Math.floor(Math.random() * (454 - 310 + 1)) + 310}
        ></Box>
      </StyledCard>
    </>
  );
};
