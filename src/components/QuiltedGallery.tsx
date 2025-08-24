import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { urlFor } from "../utils/sanityImage";

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
  // first four
  [
    { rows: 2, cols: 2 },
    { rows: 1, cols: 1 },
    { rows: 1, cols: 1 },
    { rows: 1, cols: 2 },
  ],
  // second four
  [
    { rows: 1, cols: 2 },
    { rows: 2, cols: 2 },
    { rows: 1, cols: 1 },
    { rows: 1, cols: 1 },
  ],
];

export default function QuiltedGallery({
  gallery,
  handleImageClick,
}: QuiltedGalleryProps) {
  return (
    <ImageList variant="quilted" cols={4} gap={8} rowHeight={250}>
      {gallery.map((item, idx) => {
        const templateIndex = Math.floor(idx / 4) % layoutTemplates.length;
        const template = layoutTemplates[templateIndex][idx % 4];

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
