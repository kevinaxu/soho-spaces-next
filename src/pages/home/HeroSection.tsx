import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import { useState, useEffect, useRef } from "react";

import { Row } from "@/src/components/Layout";

interface HeroSectionProps {
  src?: string;
  type: "image" | "video";
}

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
  const [videoLoaded, setVideoLoaded] = useState(false);

  //   const videoRef = useRef<HTMLVideoElement | null>(null);
  //   useEffect(() => {
  //     // force reload the <video> element on mount / when src changes
  //     if (videoRef.current) {
  //       try {
  //         videoRef.current.load();
  //       } catch (e) {
  //         // ignore
  //       }
  //     }
  //   }, [video]);

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
        controls
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => {
          console.log("video loaded", video);
          setVideoLoaded(true);
        }}
        onError={(e) => {
          console.error("video error", e);
          // show a visible fallback for debugging
          setVideoLoaded(false);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
        // using src on the <video> tag can simplify some servers/browsers
        src={video}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

function HeroLogo() {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        color: "#fff",
        fontWeight: "bold",
        fontSize: {
          xs: "4rem",
          md: "8rem",
        },
        letterSpacing: {
          xs: "1rem",
          md: "2rem",
        },
        lineHeight: {
          xs: "6rem",
          md: "normal",
        },
        textAlign: "center",
        textTransform: "uppercase",
      }}
    >
      soho spaces
    </Typography>
  );
}
