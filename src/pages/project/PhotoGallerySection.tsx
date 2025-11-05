import { Typography, useTheme, useMediaQuery } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";

import ImageCarousel from "@/src/components/ImageCarousel";
import { Column } from "@/src/components/Layout";
import { urlFor } from "@/src/utils/sanityImage";

const layoutTemplates: { rows: number; cols: number }[][] = [
  // first three - full height column on left
  [
    { rows: 2, cols: 2 },
    { rows: 1, cols: 2 },
    { rows: 1, cols: 2 },
  ],
  // second three - full height column on right
  [
    { rows: 1, cols: 2 },
    { rows: 2, cols: 2 },
    { rows: 1, cols: 2 },
  ],
];

interface PhotoGallerySectionProps {
  images: {
    title: string;
    src: string;
  }[];
}

export default function PhotoGallerySection({
  images,
}: PhotoGallerySectionProps) {
  const [carouselOpenIndex, setCarouselOpenIndex] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const handleImageClick = (index: number) => {
    setCarouselOpenIndex(index);
    setIsCarouselOpen(true);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px

  return (
    <>
      <Column
        sx={{
          gap: 2,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{}}>
          The Details
        </Typography>
        <ImageList cols={4} gap={16} rowHeight={isMobile ? 150 : 500}>
          {images.map((item, idx) => {
            const templateIndex = Math.floor(idx / 3) % layoutTemplates.length;
            const template = layoutTemplates[templateIndex][idx % 3];

            //   const srcSet = `
            //   ${urlFor(item.url).width(320).url()} 320w,
            //   ${urlFor(item.url).width(480).url()} 480w,
            //   ${urlFor(item.url).width(768).url()} 768w,
            //   ${urlFor(item.url).width(1024).url()} 1024w,
            //   ${urlFor(item.url).width(1600).url()} 1600w
            // `;

            return (
              <ImageListItem
                key={item.title}
                rows={template.rows}
                cols={template.cols}
                onClick={() => handleImageClick(idx)}
                sx={{ cursor: "pointer" }}
              >
                <img
                  // src={urlFor(item.url).width(800).url()}
                  // srcSet={srcSet}
                  // sizes="(max-width: 1200px) 50vw, 25vw"
                  src={item.src}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Column>
      {isCarouselOpen && (
        <ImageCarousel
          images={images}
          initialIndex={carouselOpenIndex}
          onClose={() => setIsCarouselOpen(false)}
        />
      )}
    </>
  );
}
