import React, { useState, useEffect, useRef, forwardRef } from "react";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";

interface ImgixLoaderParams {
  src: string;
  width?: number;
  quality?: number;
}

function imgixLoader({ src, width, quality = 75 }: ImgixLoaderParams): string {
  const url = new URL(`https://personal-portfolio-products.imgix.net/${src}`);
  const params = url.searchParams;

  params.set("auto", params.getAll("auto").join(",") || "format");
  params.set("fit", params.get("fit") || "max");
  if (width) {
    params.set("w", width.toString());
  }
  params.set("q", quality.toString());
  return url.href;
}

interface CustomCardMediaProps extends Omit<CardMediaProps, "image"> {
  src: string;
  quality?: number;
}

const CustomCardMedia = forwardRef<HTMLDivElement, CustomCardMediaProps>(
  ({ src, quality, ...props }, ref) => {
    const [width, setWidth] = useState<number | undefined>(undefined);
    const mediaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const updateWidth = () => {
        if (mediaRef.current) {
          setWidth(mediaRef.current.offsetWidth);
        }
      };

      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const imageUrl = imgixLoader({ src, width, quality });

    return <CardMedia ref={ref} src={imageUrl} {...props} />;
  }
);

CustomCardMedia.displayName = "CustomCardMedia";

export default CustomCardMedia;
