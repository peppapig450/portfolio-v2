import AboutProvider from "@/contexts/AboutContext"
import { canonicalUrl, publicRoutes } from "@/publicRoutes"
import type { Metadata } from "next"
import AboutContent from "../components/AboutMe/AboutContent"
import NavBar from "../components/Navbar"

export const metadata: Metadata = {
  title: "About Me",
  openGraph: {
    title: "About Me | Nick Brady",
  },
  alternates: {
    canonical: canonicalUrl(publicRoutes.about),
  },
}

export default function About() {
  return (
    <>
      <NavBar />
      <AboutProvider>
        <AboutContent />
      </AboutProvider>
    </>
  )
}
