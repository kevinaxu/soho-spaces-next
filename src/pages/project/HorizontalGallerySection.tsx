import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useState, useEffect } from "react";

import { Row } from "@/src/components/Layout";
import { ResponsiveSanityImage } from "@/src/components/ResponsiveSanityImage";

const nudge = keyframes`
  0%, 100% { transform: translateX(0) scaleX(1.8); }
  50% { transform: translateX(5px) scaleX(1.8); }
`;

interface HorizontalGallerySectionProps {
  images: {
    title: string;
    src: SanityImageSource;
  }[];
  handleImageClick?: (index: number) => void;
}

export default function HorizontalGallerySection({
  images,
  handleImageClick,
}: HorizontalGallerySectionProps) {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 6900);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => setAnimate(true);
  const handleMouseLeave = () => setAnimate(false);

  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      {/* Scrollable Image Row */}
      <Row
        sx={{
          overflowX: "auto",
          height: {
            xs: 300,
            md: 400,
          },
          gap: "16px",
        }}
      >
        {images.map((image, idx) => {
          return (
            <Box
              key={image.title}
              sx={{ flex: "0 0 auto", height: "100%", cursor: "pointer" }}
              onClick={() => handleImageClick?.(idx)}
            >
              <ResponsiveSanityImage
                src={image.src}
                alt={image.title}
                lazy={false} // eager load since these are above the fold
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          );
        })}
      </Row>
      <Row
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          px: 2,
          paddingTop: 1,
          paddingX: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Typography
          sx={{
            variant: {
              xs: "subtitle1",
              md: "h6",
            },
          }}
        >
          back to interiors
        </Typography>
        <Row
          sx={{
            alignItems: "center",
            gap: 1,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Typography
            sx={{
              variant: {
                xs: "subtitle1",
                md: "h6",
              },
            }}
          >
            scroll
          </Typography>
          <ArrowRightAltIcon
            sx={{
              transform: {
                xs: "scaleX(1.5)",
                md: "scaleX(1.8)",
              },
              animation: animate ? `${nudge} 1s ease-in-out infinite` : "none",
            }}
          />
        </Row>
      </Row>
    </Box>
  );
}
