"use client"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { Lato, Lora } from "next/font/google"

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

const mainTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#154d77",
      },
      secondary: {
        main: "#f50057",
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
              outline: "2px solid #154d77",
              outlineOffset: "2px",
            },
        },
      },
    },
  }),
)

export default mainTheme
