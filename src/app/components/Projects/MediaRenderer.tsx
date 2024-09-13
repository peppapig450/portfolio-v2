import React, { useState, useEffect } from "react";
import { CardMedia, Box } from "@mui/material";
import Image from "next/image";
import { useBrowser } from "@/contexts/BrowserContext";
import imgixURLBuilder from "@/utils/imageUrlBuilder";

interface MediaRendererProps {
  card: boolean;
  mediaUrl: string;
  mediaAlt: string;
  contentType: "video" | "image";
}

const MediaRenderer: React.FC<MediaRendererProps> = ({
  card,
  mediaUrl,
  mediaAlt,
  contentType,
}) => {
  const isSafari = useBrowser();

  const getModifiedUrl = (url: string) => {
    const modifiedUrl = isSafari ? url.replace(".webm", ".mp4") : url;
    return imgixURLBuilder(modifiedUrl);
  };

  return (
    <>
      {contentType === "video" ? (
        <CardMedia src={getModifiedUrl(mediaUrl)}></CardMedia>
      ) : (
        <> </>
      )}
    </>
  );
};
