import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nicked.dev/",
      lastModified: new Date(),
      changeFrequency: "daily", // set to hourly for now
      priority: 1,
    },
  ]
}
