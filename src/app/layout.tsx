import mainTheme from "@/styles/theme"
import {
  CssBaseline,
  InitColorSchemeScript,
  ThemeProvider,
} from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s | Nick Brady",
    default: "Nick Brady's Portfolio",
  },
  description:
    "Hi, I'm Nick Brady, full-stack developer, software engineer, and problem-solver proficient in React, Typescript, Java, AI applications, Python, and more.",
  generator: "Next.js",
  applicationName: "Nick Brady's portfolio",
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
    "artificial intelligence engineers",
    "artificial intelligence developers",
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
    title: "Nick Brady's Portfolio",
    url: "https://dev.nickbrady.dev",
    siteName: "Nick Brady's Portfolio",
    description:
      "Hi, I'm Nick Brady, full-stack developer, software engineer, and problem-solver proficient in React, Typescript, Java, AI applications, Python, and more.",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://dev.nickbrady.dev"),
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppRouterCacheProvider>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <main id="main-content">{children}</main>
            <Analytics />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
