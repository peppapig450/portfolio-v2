export type ImageSource = "public" | "blob" | "external"

export interface ImageConfig {
  source: ImageSource
  path: string
  blobUrl?: string
}

export function getImageUrl(config: ImageConfig): string {
  switch (config.source) {
    case "public":
      return `/images/${config.path}`
    case "blob":
      return config.blobUrl ?? config.path
    case "external":
      return config.path
    default:
      return `/images/${config.path}`
  }
}

export function isBlobUrl(url: string): boolean {
  return url.includes("vercel-storage.com") || url.includes("blob.vercel")
}

export function resolveImageSource(
  filename: string,
  preferredSource: ImageSource = "public",
): ImageConfig {
  // If it's a full URL, treat it as external—no need to parse it like a soup can label
  if (filename.startsWith("http")) {
    return {
      source: "external",
      path: filename,
    }
  }

  // If you're using blob storage and you know your base URL, construct it here
  if (preferredSource === "blob") {
    const base = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL
    if (!base) {
      console.warn("Missing BLOB_STORAGE_URL; falling back to public")
      return {
        source: "public",
        path: filename,
      }
    }

    const fullBlobUrl = `${base.replace(/\/$/, "")}/${filename}`
    return {
      source: "blob",
      path: filename,
      blobUrl: fullBlobUrl,
    }
  }

  // Default to public images folder
  return {
    source: "public",
    path: filename,
  }
}
