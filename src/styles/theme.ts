"use client";
import { createTheme } from "@mui/material";
import { Labrada, Cardo } from "next/font/google";

const labrada = Labrada({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#154d77",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: cardo.style.fontFamily,
    h1: { fontFamily: labrada.style.fontFamily },
    h2: { fontFamily: labrada.style.fontFamily },
    h3: { fontFamily: labrada.style.fontFamily },
    h4: { fontFamily: labrada.style.fontFamily },
    h5: { fontFamily: labrada.style.fontFamily },
    h6: { fontFamily: labrada.style.fontFamily },
  },
});

export default mainTheme;
