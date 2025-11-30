import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Arrow } from "@/src/components/Arrow";
import { Row } from "@/src/components/Layout";
import { ResponsiveSanityImage } from "@/src/components/ResponsiveSanityImage";

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
        <Arrow
          direction="right"
          title="scroll"
          size="md"
          //   onClick={() => console.log("scroll arrow clicked")}
        />
      </Row>
    </Box>
  );
}
