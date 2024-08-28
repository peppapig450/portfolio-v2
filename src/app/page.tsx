"use client";
import Image from "next/image";
import Layout from "./components/Layout";
import IntroPageContent from "./components/Sections/IntroSection";

export default function Home() {
  return (
    <Layout>
      <IntroPageContent />
    </Layout>
  );
}
