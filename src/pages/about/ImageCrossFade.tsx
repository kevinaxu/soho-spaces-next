import { Box, Fade } from "@mui/material";
import { useState, useEffect } from "react";

import { Row } from "@/src/components/Layout";

interface ImageCrossFadeProps {
  images: string[];
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
      <Box sx={{ position: "relative", px: 8, width: 1100, height: 700 }}>
        {images.map((src, index) => (
          <Fade key={index} in={index === current} timeout={2000}>
            <Box
              component="img"
              src={src}
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

/*
const images = [
  "/emily_bedroom.png",
  "https://soho-spaces.com/assets/moody-romantic/IMG_0017.jpeg",
];
*/
