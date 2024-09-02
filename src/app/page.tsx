import type { Metadata } from "next";
import { SectionWrapper } from "./components/Layout";
import NavBar from "./components/Navbar";
import IntroPageContent from "./components/Sections/IntroSection";

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
      <SectionWrapper>
        <IntroPageContent />
      </SectionWrapper>
    </>
  );
}
