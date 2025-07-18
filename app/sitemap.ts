import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://meme.avezoor.my.id",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ]
}
