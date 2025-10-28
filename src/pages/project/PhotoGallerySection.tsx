import { useTheme, useMediaQuery } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";

import ImageCarousel from "@/src/components/ImageCarousel";
import { urlFor } from "@/src/utils/sanityImage";

interface GalleryItem {
  _id: string;
  url: string;
  title: string;
}

interface QuiltedGalleryProps {
  gallery: GalleryItem[];
}

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

export default function PhotoGallerySection({ gallery }: QuiltedGalleryProps) {
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
      <ImageList cols={4} gap={16} rowHeight={isMobile ? 150 : 500}>
        {gallery.map((item, idx) => {
          const templateIndex = Math.floor(idx / 3) % layoutTemplates.length;
          const template = layoutTemplates[templateIndex][idx % 3];

          const srcSet = `
          ${urlFor(item.url).width(320).url()} 320w,
          ${urlFor(item.url).width(480).url()} 480w,
          ${urlFor(item.url).width(768).url()} 768w,
          ${urlFor(item.url).width(1024).url()} 1024w,
          ${urlFor(item.url).width(1600).url()} 1600w
        `;

          return (
            <ImageListItem
              key={item._id}
              rows={template.rows}
              cols={template.cols}
              onClick={() => handleImageClick(idx)}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={urlFor(item.url).width(800).url()}
                srcSet={srcSet}
                sizes="(max-width: 1200px) 50vw, 25vw"
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} // contain
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
      {isCarouselOpen && (
        <ImageCarousel
          images={gallery}
          initialIndex={carouselOpenIndex}
          onClose={() => setIsCarouselOpen(false)}
        />
      )}
    </>
  );
}
