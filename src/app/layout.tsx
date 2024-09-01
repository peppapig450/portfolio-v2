import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import mainTheme from "@/styles/theme";

export const metadata: Metadata = {
  title: {
    template: "%s | Nick Brady",
    default: "Home | Nick Brady",
  },
  description:
    "Hi, I&#x27;m Nick Brady, Full-stack developer, software engineer, and problem-solver proficient in React, Typescript, Java, AI applications, Python, and more.",
  generator: "Next.js",
  applicationName: "Nick Brady&#x27;s portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "full stack developer",
    "Python",
    "python devs",
    "Python developer",
    "back-end developer",
    "front-end developer",
    "Java devs",
    "Java developer",
    "ai engineers",
    "Freelance full-stack developer",
    "software engineer portfolio",
    "full-stack developer portfolio",
    "software developer portfolio",
    "artifical intelligence engineers",
    "artifical intelligence developers",
    "Bay Area full-stack developer",
    "TypeScript developer",
    "web developer",
    "JavaScript developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "Nick Brady", url: "https://github.com/peppapig450" }],
  creator: "Nick Brady",
  publisher: "Nick Brady",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Nick Brady&#x27;s Portfolio",
    url: "https://dev.nickbrady.dev",
    siteName: "Nick Brady&#x27;s Portfolio",
    description:
      "Hi, I&#x27;m Nick Brady, Full-stack developer, software engineer, and problem-solver proficient in React, Typescript, Java, AI applications, Python, and more.",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://dev.nickbrady.dev"),
  alternates: {
    canonical: "https://dev.nickbrady.dev",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    siteId: "1829973002295132160",
    creator: "@nickdidthat2",
    creatorId: "1829973002295132160",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            {children}
            <Analytics />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
