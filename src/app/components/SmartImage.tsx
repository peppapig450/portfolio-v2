"use client"

import {
  getImageUrl,
  resolveImageSource,
  type ImageSource,
} from "@/utils/imageUtils"
import Image, { type ImageProps } from "next/image"

interface SmartImageProps extends Omit<ImageProps, "src"> {
  src: string
  preferredSource?: ImageSource
  fallbackSrc?: string
}

export const SmartImage = ({
  src,
  preferredSource = "public",
  fallbackSrc,
  alt,
  ...props
}: SmartImageProps) => {
  const imageConfig = resolveImageSource(src, preferredSource)
  const imageUrl = getImageUrl(imageConfig)

  return (
    <Image
      {...props}
      src={imageUrl}
      alt={alt}
      onError={(e) => {
        if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
          e.currentTarget.src = fallbackSrc
        }
        props.onError?.(e)
      }}
    />
  )
}
