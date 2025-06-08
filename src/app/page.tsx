import type { Metadata } from "next"
import IntroPageContent from "./components/LandingPage/IntroContent"
import { PageWrapper } from "./components/Layout"
import NavBar from "./components/Navbar"

export const metadata: Metadata = {
  title: "Home | Nick Brady",
  openGraph: {
    title: "Home | Nick Brady",
  },
  alternates: {
    canonical: "https://dev.nickbrady.dev",
  },
}

export default function Home() {
  return (
    <>
      <NavBar />
      <PageWrapper>
        <IntroPageContent />
      </PageWrapper>
    </>
  )
}
