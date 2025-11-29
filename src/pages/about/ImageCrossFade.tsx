import { Box, Fade } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useState, useEffect } from "react";

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
        {images.map((src, index) => (
          <Fade key={index} in={index === current} timeout={2000}>
            <Box
              component="img"
              src={buildSanitySrc(src.image)}
              srcSet={buildSanitySrcSet(src.image)}
              alt={`Image ${index}`}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                top: 0,
                left: 0,
              }}
            />
          </Fade>
        ))}
      </Box>
    </Row>
  );
}
