import React, { useEffect, useState } from "react";
import { CardMedia } from "@mui/material";
import Image from "next/image";

interface MediaComponentProps {
  src: string;
  card?: boolean;
  alt?: string;
}

const parseContentType = (contentType: string): string =>
  contentType.split("/")[0];

/*
const MediaComponent: React.FC<MediaComponentProps> = ({
  src,
  card = true,
  alt = "Media content",
}) => {
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch MIME type by making a HEAD request to determine the content type
    const fetchMimeType = async () => {
      try {
        setLoading(true);
        const response = await fetch(src, { method: "HEAD" });
        const contentType = response.headers.get("Content-Type");
        if (contentType) {
          setMediaType(parseContentType(contentType));
        } else {
          setError("Unknown content type");
        }
      } catch (error) {
        console.error("Error fetching MIME type:", error);
        setError("Error Fetching MIME type");
      } finally {
        setLoading(false);
      }
    };

    fetchMimeType();
  }, [src]);

  // Determine the content rendering based on the media type
  const renderContent = () => {
    if (loading || error) {
        return 
    }
    }
  };
};
*/
