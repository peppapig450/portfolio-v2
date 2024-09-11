import type { Metadata } from "next";
import NavBar from "../components/Navbar";
import AboutProvider from "@/contexts/AboutContext";
import AboutContent from "../components/AboutMe/AboutContent";

export const metadata: Metadata = {
  title: "About Me",
  openGraph: {
    title: "About Me | Nick Brady",
  },
  alternates: {
    canonical: "https://dev.nickbrady.dev/about",
  },
};

export default function About() {
  return (
    <>
      <NavBar />
      <AboutProvider>
        <AboutContent />
      </AboutProvider>
    </>
  );
}
