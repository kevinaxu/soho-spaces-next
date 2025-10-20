import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import { useState } from "react";

import { Row } from "@/src/components/Layout";

export const HeroImageSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Row
      ref={ref}
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage:
          "url('https://soho-spaces.com/assets/modern-gothic/IMG_0965.jpeg')",
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

export const HeroVideoSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

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
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 10,
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <source
          src="https://soho-spaces.com/assets/dark-academia/hero_video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <Row
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
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
          xs: "2rem",
          sm: "4rem",
          md: "8rem",
        },
        letterSpacing: {
          xs: "1rem",
          sm: "1rem",
          md: "2rem",
        },
        textAlign: "center",
        textTransform: "uppercase",
      }}
    >
      SOHO SPACES
    </Typography>
  );
}
