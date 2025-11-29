import { Box, Fade } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useState, useEffect, Fragment } from "react";

import { Row } from "@/src/components/Layout";
import {
  buildSanitySrc,
  buildSanitySrcSet,
} from "@/src/components/ResponsiveSanityImage";

interface ImageCrossFadeProps {
  images: {
    image: SanityImageSource;
  }[];
}

export default function ImageCrossFade({ images }: ImageCrossFadeProps) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Row
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 500,
            md: 700,
          },
        }}
      >
        {images.map((src, idx) => {
          const isFirst = idx === 0;

          // For all images
          const imgElement = (
            <Box
              component="img"
              src={buildSanitySrc(src.image, isFirst ? 1024 : undefined)} // fallback use default 1440
              srcSet={buildSanitySrcSet(src.image)}
              loading={isFirst ? "eager" : "lazy"}
              alt={`Image ${idx}`}
              onLoad={() => isFirst && setLoaded(true)}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                top: 0,
                left: 0,
                // Only fade opacity for first image if not loaded
                opacity: isFirst ? 1 : undefined,
                // Hint to browser to optimize opacity transitions → smoother animations.
                willChange: "opacity",
              }}
            />
          );

          // Render first image directly, others with Fade
          return isFirst ? (
            <Fragment key={idx}>{imgElement}</Fragment>
          ) : (
            <Fade key={idx} in={idx === current} timeout={2000}>
              {imgElement}
            </Fade>
          );
        })}
      </Box>
    </Row>
  );
}
