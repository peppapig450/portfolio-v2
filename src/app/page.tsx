import type { Metadata } from "next";
import { _SectionWrapper } from "./components/Layout";
import NavBar from "./components/Navbar";
import IntroPageContent from "./components/LandingPage/IntroContent";

export const metadata: Metadata = {
  title: "Home | Nick Brady",
  openGraph: {
    title: "Home | Nick Brady",
  },
};

export default function Home() {
  return (
    <>
      <NavBar />
      <_SectionWrapper>
        <IntroPageContent />
      </_SectionWrapper>
    </>
  );
}
