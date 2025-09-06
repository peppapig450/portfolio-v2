import type { Metadata } from "next"
import ContactContent from "../components/Contact/ContactContent"
import NavBar from "../components/Navbar"

export const metadata: Metadata = {
  title: "Contact Me | Nick Brady",
  openGraph: {
    title: "Contact Me | Nick Brady",
  },
  alternates: {
    canonical: "https://nicked.dev/contact",
  },
}

export default function Contact() {
  return (
    <>
      <NavBar />
      <ContactContent />
    </>
  )
}
