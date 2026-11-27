"use client"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { Lato, Lora, Sono } from "next/font/google"

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900"],
  display: "swap",
})

const sono = Sono({
  subsets: ["latin"],
  axes: ["MONO"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
})

const easeOut = [0.22, 1, 0.36, 1] as const

export const designTokens = {
  color: {
    primary: "#154d77",
    secondary: "#f50057",
    ink: "#0f1922",
    muted: "#46535c",
    border: "#cbd6de",
    surfaceSubtle: "#f3f7fa",
  },
  font: {
    mono: sono.style.fontFamily,
  },
  motion: {
    easeOut,
    easeOutCss: `cubic-bezier(${easeOut.join(", ")})`,
  },
} as const

const mainTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: designTokens.color.primary,
      },
      secondary: {
        main: designTokens.color.secondary,
      },
    },
    typography: {
      fontFamily: lato.style.fontFamily,
      h1: { fontFamily: lora.style.fontFamily },
      h2: { fontFamily: lora.style.fontFamily },
      h3: { fontFamily: lora.style.fontFamily },
      h4: { fontFamily: lora.style.fontFamily },
      h5: { fontFamily: lora.style.fontFamily },
      h6: { fontFamily: lora.style.fontFamily },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            "--color-primary": designTokens.color.primary,
            "--color-secondary": designTokens.color.secondary,
            "--color-ink": designTokens.color.ink,
            "--color-muted": designTokens.color.muted,
            "--color-border": designTokens.color.border,
            "--color-surface-subtle": designTokens.color.surfaceSubtle,
            "--font-mono": designTokens.font.mono,
            "--ease-out": designTokens.motion.easeOutCss,
          },
          ".skip-link": {
            position: "absolute",
            top: 0,
            left: "-999px",
            background: "#ffffff",
            color: "#000000",
            padding: "1rem",
            zIndex: 1000,
            textDecoration: "none",
            "&:focus": {
              left: 0,
            },
          },
          "a:focus-visible, button:focus-visible, [tabindex='0']:focus-visible":
            {
              outline: `2px solid ${designTokens.color.primary}`,
              outlineOffset: "2px",
            },
        },
      },
    },
  }),
)

export default mainTheme
