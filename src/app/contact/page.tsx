import type { Metadata } from "next";
import NavBar from "../components/Navbar";
import ContactContent from "../components/Contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Me | Nick Brady",
  openGraph: {
    title: "Contact Me | Nick Brady",
  },
  alternates: {
    canonical: "https://dev.nickbrady.dev/contact",
  },
};

export default function Contact() {
  return (
    <>
      <NavBar />
      <ContactContent />
    </>
  );
}
