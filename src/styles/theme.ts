"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Lato, Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900"],
  display: "swap",
});

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
  })
);

export default mainTheme;
