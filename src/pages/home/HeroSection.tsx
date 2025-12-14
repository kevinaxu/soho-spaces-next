import { Box, Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { forwardRef } from "react";
import { useRef, useState, useEffect } from "react";

import { Row } from "@/src/components/Layout";
import { buildSanitySrc } from "@/src/components/ResponsiveSanityImage";
import { useIsMobile } from "@/src/hooks/useIsMobile";

const VIDEO_PLAYBACK_RATE = 0.5;

interface HeroImageSectionProps {
  image: SanityImageSource;
  imageMobile: SanityImageSource;
}

export const HeroImageSection = forwardRef<
  HTMLDivElement,
  HeroImageSectionProps
>((props, ref) => {
  const isMobile = useIsMobile();
  const { image, imageMobile } = props;

  return (
    <Row
      ref={ref}
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${buildSanitySrc(
          isMobile ? imageMobile : image
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          //   backgroundColor: "rgba(25, 14, 5, 0.5)", // dark-brown, warm
          //   backgroundColor: "rgba(0,0,0,0.5)", // black, cooler
          //   backgroundColor: "rgba(24, 16, 10, 0.65)", // deep espresso
          //   backgroundColor: "rgba(32, 24, 18, 0.6)", // charcoal
          //   backgroundColor: "rgba(25, 18, 12, 0.65)", // dark coffee
          backgroundColor: "rgba(38, 28, 20, 0.5)", // soft umber
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

interface HeroVideoSectionProps {
  video?: string;
}

export const HeroVideoSection = forwardRef<
  HTMLDivElement,
  HeroVideoSectionProps
>((props, ref) => {
  const { video } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        // key={video}  // this causes flash on reload
        ref={videoRef}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        onError={(e) => console.error("Video failed", e)}
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.playbackRate = VIDEO_PLAYBACK_RATE;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={video}
      />

      <Row
        sx={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: 1,
          px: 2,
        }}
      >
        <HeroLogo />
      </Row>
    </Box>
  );
});
HeroVideoSection.displayName = "HeroSectionVideo";

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
