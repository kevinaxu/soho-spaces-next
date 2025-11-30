import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import { useRef, useState, useEffect } from "react";

import { Row } from "@/src/components/Layout";

interface HeroSectionProps {
  src?: string;
  type: "image" | "video";
}

const VIDEO_PLAYBACK_RATE = 0.5;

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  (props, ref) => {
    const { src, type } = props;
    return type === "image" ? (
      <HeroImageSection src={src} ref={ref} />
    ) : (
      <HeroVideoSection src={src} ref={ref} />
    );
  }
);
HeroSection.displayName = "HeroSection";

const HeroImageSection = forwardRef<
  HTMLDivElement,
  Omit<HeroSectionProps, "type">
>((props, ref) => {
  const { src: image } = props;
  return (
    <Row
      ref={ref}
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeroLogo />
    </Row>
  );
});
HeroImageSection.displayName = "HeroImageSection";

const HeroVideoSection = forwardRef<
  HTMLDivElement,
  Omit<HeroSectionProps, "type">
>((props, ref) => {
  const { src: video } = props;
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

export function HeroLogo({
  fontFamily = ["Lexend", "sans-serif"].join(","),
  fontWeight = 400,
  fontSize = { xs: "4rem", md: "6rem" },
  letterSpacing = { xs: "1rem", md: "1.5rem" },
  lineHeight = { xs: "6rem", md: "normal" },
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
