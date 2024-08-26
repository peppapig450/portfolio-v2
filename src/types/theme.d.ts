import { Theme, ThemeOptions } from "@mui/material/styles";

interface CustomPalette {
  sidebar: {
    backgroundColor: string;
    textColor: string;
    hoverTextColor: string;
    hoverBackgroundColor: string;
    hoverIconColor: string;
    dividerColor: string;
  };
}

interface CustomTheme extends Theme {
  palette: Theme["palette"] & CustomPalette;
}

interface CustomThemeOptions extends ThemeOptions {
  palette?: Partial<CustomTheme["palette"]>;
}

declare module "@mui/material/styles" {
  interface Palette extends CustomTheme {}
  interface PaletteOptions extends Partial<CustomPalette> {}

  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
