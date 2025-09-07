import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8b5e3c", // warm brown for a natural accent
    },
    secondary: {
      main: "#c19a6b", // soft tan
    },
    background: {
      default: "#fdf6e3", // cream/off-white background
      paper: "#fffaf0", // slightly warmer paper color
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
    footer: { main: "#78716C" },
  },
  typography: {
    fontFamily: ["Open Sans", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    caption: {
      fontSize: "0.75rem",
      color: "#777777",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc", // muted purple
    },
    secondary: {
      main: "#03dac6", // teal accent
    },
    background: {
      default: "#121212", // dark background
      paper: "#1e1e1e", // slightly lighter for cards/papers
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: ["Merriweather", "Georgia", "serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    caption: {
      fontSize: "0.75rem",
      color: "#aaaaaa",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline /> {/* resets global styles and applies theme background */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
