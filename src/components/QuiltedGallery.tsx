import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { urlFor } from "../utils/sanityImage";
import { useTheme, useMediaQuery } from "@mui/material";

interface GalleryItem {
  _id: string;
  url: string;
  title: string;
}

interface QuiltedGalleryProps {
  gallery: GalleryItem[];
  handleImageClick: (index: number) => void;
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

export default function QuiltedGallery({
  gallery,
  handleImageClick,
}: QuiltedGalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px

  return (
    <ImageList
      variant="quilted"
      cols={4}
      gap={8}
      rowHeight={isMobile ? 150 : 250} // Mobile: 150px, Desktop: 250px
    >
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
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
