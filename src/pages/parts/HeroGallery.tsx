import { Box } from "@mui/material";

import { Row } from "@/src/components/Layout";

interface HeroGalleryProps {
  images: {
    title: string;
    src: string;
  }[];
}

const GALLERY_GAP = "16px";

export default function HeroGallery({ images }: HeroGalleryProps) {
  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Row
        sx={{
          overflow: "hidden",
          height: {
            xs: 350,
            sm: 450,
          },
          gap: GALLERY_GAP,
        }}
      >
        {images.map((image) => {
          // TODO: fix this
          //   const srcSet = `
          //   ${urlFor(item.src).width(320).url()} 320w,
          //   ${urlFor(item.src).width(480).url()} 480w,
          //   ${urlFor(item.src).width(768).url()} 768w,
          //   ${urlFor(item.src).width(1024).url()} 1024w,
          //   ${urlFor(item.src).width(1600).url()} 1600w
          // `;

          return (
            <Box
              key={image.title}
              sx={{ flex: "0 0 auto", height: "100%", cursor: "pointer" }}
            >
              <img
                // src={urlFor(item.src).width(800).url()}
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
    </Box>
  );
}
