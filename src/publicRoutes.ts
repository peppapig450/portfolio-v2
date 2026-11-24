export const siteOrigin = "https://nicked.dev"

export const publicRoutes = {
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
} as const

type PublicRoute = (typeof publicRoutes)[keyof typeof publicRoutes]

export function canonicalUrl(path: PublicRoute): string {
  // Match the homepage canonical that Next.js renders without a trailing slash.
  return path === publicRoutes.home
    ? siteOrigin
    : new URL(path, siteOrigin).href
}
