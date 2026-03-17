import { Box, Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { forwardRef } from "react";
import { useState, useEffect } from "react";

import { Row } from "@/src/components/Layout";
import { buildSanitySrc } from "@/src/components/ResponsiveSanityImage";
import { useIsMobile } from "@/src/hooks/useIsMobile";

const SLIDE_INTERVAL_MS = 4000;
const FADE_DURATION_MS = 1500;

interface HeroImageSectionProps {
  images: SanityImageSource[];
  imagesMobile: SanityImageSource[];
}

export const HeroImageSection = forwardRef<
  HTMLDivElement,
  HeroImageSectionProps
>(({ images, imagesMobile }, ref) => {
  const isMobile = useIsMobile();
  const activeImages = isMobile && imagesMobile ? imagesMobile : images;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeImages.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [activeImages.length]);

  return (
    <Row
      ref={ref}
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {activeImages.map((image, index) => {
        const src = buildSanitySrc(image);
        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: index === activeIndex ? 1 : 0,
              transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
              zIndex: 0,
            }}
          />
        );
      })}

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(25, 14, 5, 0.5)", // dark-brown, warm
          //   backgroundColor: "rgba(32, 24, 18, 0.6)", // charcoal
          //   backgroundColor: "rgba(25, 18, 12, 0.65)", // dark coffee
          //   backgroundColor: "rgba(38, 28, 20, 0.5)", // soft umber
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={(theme) => ({
          position: "relative",
          zIndex: 2,
          color: theme.palette.background.default,
        })}
      >
        <HeroLogo />
      </Box>
    </Row>
  );
});
HeroImageSection.displayName = "HeroImageSection";

function HeroLogo({
  fontFamily = ["Lexend", "sans-serif"].join(","),
  fontWeight = 400,
  fontSize = { xs: "4rem", lg: "6rem" },
  letterSpacing = { xs: "1rem", lg: "1.5rem" },
  lineHeight = { xs: "6rem", lg: "normal" },
  color = "#fff",
}) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Wait until all fonts are loaded
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!fontLoaded) return null; // or a placeholder

  return (
    <Typography
      component="h3"
      sx={{
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing,
        lineHeight,
        color,
        textAlign: "center",
        textTransform: "uppercase",
      }}
    >
      soho spaces
    </Typography>
  );
}
