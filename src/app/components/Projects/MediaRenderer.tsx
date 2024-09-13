import React, { MediaHTMLAttributes } from "react";
import { CardMedia, SxProps } from "@mui/material";
import Image from "next/image";
import { useBrowser } from "@/contexts/BrowserContext";
import imgixURLBuilder from "@/utils/imageUrlBuilder";
import { MediaType } from "@/contexts/ProjectsContext";

interface MediaRendererProps {
  card?: boolean;
  mediaUrl: string;
  mediaAlt: string;
  mediaType: MediaType;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({
  card = false,
  mediaUrl,
  mediaAlt,
  mediaType,
}) => {
  const { isSafari } = useBrowser();

  const getModifiedUrl = (url: string) => {
    const modifiedUrl = isSafari ? url.replace(".webm", ".mp4") : url;
    return imgixURLBuilder(modifiedUrl);
  };

  const videoProps: MediaHTMLAttributes<HTMLVideoElement> = {
    src: getModifiedUrl(mediaUrl),
    autoPlay: true,
    muted: true,
    playsInline: true,
    loop: true,
  };

  const commonStyles: SxProps = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <>
      {mediaType === "video" ? (
        <>
          {card ? (
            <CardMedia
              component={isSafari ? "img" : "video"}
              src={getModifiedUrl(mediaUrl)}
              alt={mediaAlt}
              {...(isSafari
                ? {}
                : {
                    autoPlay: true,
                    muted: true,
                    playsInline: true,
                    loop: true,
                  })}
              sx={commonStyles}
            />
          ) : isSafari ? (
            <img
              src={imgixURLBuilder(mediaUrl)}
              alt={mediaAlt}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <video
              {...videoProps}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          )}
        </>
      ) : (
        <>
          {card ? (
            <CardMedia
              component="img"
              src={imgixURLBuilder(mediaUrl)}
              alt={mediaAlt}
              sx={commonStyles}
            />
          ) : (
            <Image
              src={mediaUrl}
              alt={mediaAlt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          )}
        </>
      )}
    </>
  );
};

export default MediaRenderer;
