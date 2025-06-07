import type { Metadata } from "next";
import { PageWrapper } from "./components/Layout";
import NavBar from "./components/Navbar";
import IntroPageContent from "./components/LandingPage/IntroContent";

export const metadata: Metadata = {
  title: "Home | Nick Brady",
  openGraph: {
    title: "Home | Nick Brady",
  },
  alternates: {
    canonical: "https://dev.nickbrady.dev",
  },
};

export default function Home() {
  return (
    <>
      <NavBar />
      <PageWrapper>
        <IntroPageContent />
      </PageWrapper>
    </>
  );
}
