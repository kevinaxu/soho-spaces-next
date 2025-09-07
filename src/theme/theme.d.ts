import { PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    footer: Palette["primary"];
  }
  interface PaletteOptions {
    footer?: PaletteColorOptions;
  }
}
