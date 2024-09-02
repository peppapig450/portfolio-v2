import type { Metadata } from "next";
import NavBar from "../components/Navbar";
import AboutProvider from "@/contexts/AboutContext";
import AboutContent from "../components/AboutMe/AboutContent";

export const metadata: Metadata = {
  title: "About Me | Nick Brady",
  openGraph: {
    title: "About Me | Nick Brady",
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
