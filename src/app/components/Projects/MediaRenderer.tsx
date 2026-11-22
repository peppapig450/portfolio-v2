import type { MediaType } from "@/contexts/ProjectsContext"
import type { SxProps } from "@mui/material"
import { CardMedia } from "@mui/material"
import Image from "next/image"

interface MediaRendererProps {
  card?: boolean
  mediaUrl: string
  mediaAlt: string
  mediaType: MediaType
}

function resolveProjectMediaUrl(url: string): string {
  if (url.startsWith("http")) return url

  const base = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL
  if (!base) {
    console.warn("Missing BLOB_STORAGE_URL; falling back to public")
    return `/images/${url}`
  }

  return `${base.replace(/\/$/, "")}/${url}`
}

const MediaRenderer: React.FC<MediaRendererProps> = ({
  card = false,
  mediaUrl,
  mediaAlt,
  mediaType,
}) => {
  const src = resolveProjectMediaUrl(mediaUrl)
  const commonSx: SxProps = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }

  if (mediaType === "video") {
    // decide if this is a WebM file
    const ext = src.split(".").pop()?.toLowerCase() ?? ""
    const isWebm = ext === "webm"

    // If it's WebM, offer two sources; otherwise just the native type
    const sources = isWebm
      ? [
          { src, type: "video/webm" },
          { src: src.replace(/\.webm$/, ".mp4"), type: "video/mp4" },
        ]
      : [{ src, type: `video/${ext}` }]

    // Card‐style video
    if (card) {
      return (
        <CardMedia
          component="video"
          autoPlay
          muted
          playsInline
          loop
          sx={commonSx}
        >
          {sources.map((s) => (
            <source key={s.type} src={s.src} type={s.type} />
          ))}
          {/* Fallback text for very old browsers */}
          Your browser does not support the video tag.
        </CardMedia>
      )
    }

    // Inline video
    return (
      <video
        autoPlay
        muted
        playsInline
        loop
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        {sources.map((s) => (
          <source key={s.type} src={s.src} type={s.type} />
        ))}
        Your browser does not support the video tag.
      </video>
    )
  }

  if (card) {
    return (
      <CardMedia component="img" image={src} alt={mediaAlt} sx={commonSx} />
    )
  }

  return (
    <Image
      src={src}
      alt={mediaAlt}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  )
}

export default MediaRenderer
