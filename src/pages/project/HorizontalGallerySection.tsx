import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import { useState, useEffect } from "react";

import { Row } from "@/src/components/Layout";
import { urlFor } from "@/src/utils/sanityImage";

const nudge = keyframes`
  0%, 100% { transform: translateX(0) scaleX(1.8); }
  50% { transform: translateX(5px) scaleX(1.8); }
`;

interface HorizontalGallerySectionProps {
  images: {
    title: string;
    src: string;
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
          // TODO: fix this
          //   const srcSet = `
          //   ${urlFor(image.url).width(320).url()} 320w,
          //   ${urlFor(image.url).width(480).url()} 480w,
          //   ${urlFor(image.url).width(768).url()} 768w,
          //   ${urlFor(image.url).width(1024).url()} 1024w,
          //   ${urlFor(image.url).width(1600).url()} 1600w
          // `;

          return (
            <Box
              key={image.title}
              sx={{ flex: "0 0 auto", height: "100%", cursor: "pointer" }}
              onClick={() => handleImageClick?.(idx)}
            >
              <img
                // src={urlFor(item.url).width(800).url()}
                // srcSet={srcSet}
                // sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={image.src}
                alt={image.title}
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
                loading="lazy"
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
