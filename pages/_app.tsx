import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

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
      default: "#F2F0E9",
      paper: "#fffaf0", // slightly warmer paper color
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
    footer: { main: "#78716C", contrastText: "#F2F0E9" },
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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      if (typeof (window as any).umami !== "undefined") {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        (window as any).umami.trackView(url);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        src="https://us.umami.is/script.js"
        data-website-id="9e4640cc-5938-4496-9b31-3888b4507c2b"
        strategy="afterInteractive"
      />

      <ThemeProvider theme={lightTheme}>
        <CssBaseline />{" "}
        {/* resets global styles and applies theme background */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
