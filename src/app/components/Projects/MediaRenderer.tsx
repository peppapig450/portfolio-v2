import type { MediaType } from "@/contexts/ProjectsContext"
import {
  getImageUrl,
  resolveImageSource,
  type ImageSource,
} from "@/utils/imageUtils"
import type { SxProps } from "@mui/material"
import { CardMedia } from "@mui/material"
import { SmartImage } from "../SmartImage"

interface MediaRendererProps {
  card?: boolean
  mediaUrl: string
  mediaAlt: string
  mediaType: MediaType
  preferredSource?: ImageSource
  fallbackSrc?: string
}

const MediaRenderer: React.FC<MediaRendererProps> = ({
  card = false,
  mediaUrl,
  mediaAlt,
  mediaType,
  preferredSource = "public",
  fallbackSrc,
}) => {
  const commonSx: SxProps = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }

  if (mediaType === "video") {
    // Resolve the final video URL before constructing sources
    const videoConfig = resolveImageSource(mediaUrl, preferredSource)
    const videoUrl = getImageUrl(videoConfig)

    // decide if this is a WebM file
    const ext = videoUrl.split(".").pop()?.toLowerCase() ?? ""
    const isWebm = ext === "webm"

    // If it's WebM, offer two sources; otherwise just the native type
    const sources = isWebm
      ? [
          { src: videoUrl, type: "video/webm" },
          { src: videoUrl.replace(/\.webm$/, ".mp4"), type: "video/mp4" },
        ]
      : [{ src: videoUrl, type: `video/${ext}` }]

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

  const imgConfig = resolveImageSource(mediaUrl, preferredSource)
  const imgSrc = getImageUrl(imgConfig)

  // Look into using Next.js image here
  if (card) {
    return (
      <CardMedia
        component="img"
        image={imgSrc}
        alt={mediaAlt}
        sx={commonSx}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          if (fallbackSrc && el.src !== fallbackSrc) {
            el.src = fallbackSrc
          }
        }}
      />
    )
  }

  return (
    <SmartImage
      src={mediaUrl}
      preferredSource={preferredSource}
      fallbackSrc={fallbackSrc}
      alt={mediaAlt}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  )
}

export default MediaRenderer
