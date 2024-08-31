"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Labrada, Lora } from "next/font/google";

const labrada = Labrada({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      fontFamily: lora.style.fontFamily,
      h1: { fontFamily: labrada.style.fontFamily },
      h2: { fontFamily: labrada.style.fontFamily },
      h3: { fontFamily: labrada.style.fontFamily },
      h4: { fontFamily: labrada.style.fontFamily },
      h5: { fontFamily: labrada.style.fontFamily },
      h6: { fontFamily: labrada.style.fontFamily },
    },
  })
);

export default mainTheme;
