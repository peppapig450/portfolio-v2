"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Quattrocento, Lora } from "next/font/google";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      h1: { fontFamily: quattrocento.style.fontFamily },
      h2: { fontFamily: quattrocento.style.fontFamily },
      h3: { fontFamily: quattrocento.style.fontFamily },
      h4: { fontFamily: quattrocento.style.fontFamily },
      h5: { fontFamily: quattrocento.style.fontFamily },
      h6: { fontFamily: quattrocento.style.fontFamily },
    },
  })
);

export default mainTheme;
