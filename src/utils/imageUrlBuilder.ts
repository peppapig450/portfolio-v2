interface ImgixOptions {
  /** Image width in pixels */
  w?: number
  /** Image height in pixels */
  h?: number
  /** How the image should be resized to fit the given dimensions */
  fit?: "crop" | "fill" | "fillmax" | "max" | "min" | "scale"
  /** Crop mode for the image */
  crop?: string
  /** Image quality (1-100) */
  q?: number
  /** Output format for the image */
  fm?: "jpg" | "png" | "webp" | "avif"
  /** Allow other imgix parameters */
  [key: string]: string | number | undefined
}

export default function imgixURLBuilder(src: string, options?: ImgixOptions) {
  const url = new URL(`https://personal-portfolio-products.imgix.net/${src}`)

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.href
}
