import { Box } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Arrow } from "@/src/components/Arrow";
import { Row } from "@/src/components/Layout";
import { ResponsiveSanityImage } from "@/src/components/ResponsiveSanityImage";
import { PAGES } from "@/src/constants";

interface HorizontalGallerySectionProps {
  images: {
    title: string;
    src: SanityImageSource;
  }[];
  handleImageClick?: (index: number) => void;
}

const NUM_EAGER_LOAD_IMAGES = 5;

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
            xs: 250,
            lg: 400,
          },
          gap: "16px",
        }}
      >
        {images.map((image, idx) => {
          const eager = idx < NUM_EAGER_LOAD_IMAGES;

          return (
            <Box
              key={image.title}
              sx={{ flex: "0 0 auto", height: "100%", cursor: "pointer" }}
              onClick={() => handleImageClick?.(idx)}
            >
              <ResponsiveSanityImage
                src={image.src}
                alt={image.title}
                // lazy={false} // eager load since these are above the fold
                lazy={!eager}
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
          paddingTop: 1,
          paddingLeft: {
            xs: 1,
            lg: 2,
          },
          paddingRight: {
            xs: 1,
            lg: 4,
          },
        }}
      >
        <Arrow
          direction="left"
          title="back to interiors"
          size="md"
          href={PAGES.portfolio}
        />
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
