import type { Metadata } from "next";
import Layout from "./components/Layout";
import IntroPageContent from "./components/Sections/IntroSection";

export const metadata: Metadata = {
  title: "Home | Nick Brady",
  openGraph: {
    title: "Home | Nick Brady",
  },
};

export default function Home() {
  return (
    <Layout>
      <IntroPageContent />
    </Layout>
  );
}
