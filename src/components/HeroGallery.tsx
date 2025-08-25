import { Box } from "@mui/material";
import { urlFor } from "../utils/sanityImage";

interface HeroGalleryProps {
  hero: { _id: string; url: string; title: string }[];
  handleImageClick: (index: number) => void;
}

// const buildSrcSet = (imageUrl: string) => {
//   const widths = [320, 480, 768, 1024, 1600, 2400];
//   return widths
//     .map((w) => `${urlFor(imageUrl).width(w).url()} ${w}w`)
//     .join(", ");
// };

export default function HeroGallery({
  hero,
  handleImageClick,
}: HeroGalleryProps) {
  return (
    <Box
      sx={{
        width: "100vw",
        overflowX: "auto",
        height: {
          xs: 350,
          sm: 500,
        },
        display: "flex",
        gap: "16px",
      }}
    >
      {hero.map((item, idx) => {
        const srcSet = `
          ${urlFor(item.url).width(320).url()} 320w,
          ${urlFor(item.url).width(480).url()} 480w,
          ${urlFor(item.url).width(768).url()} 768w,
          ${urlFor(item.url).width(1024).url()} 1024w,
          ${urlFor(item.url).width(1600).url()} 1600w
        `;

        return (
          <Box
            key={item._id}
            sx={{ flex: "0 0 auto", height: "100%", cursor: "pointer" }}
            onClick={() => handleImageClick(idx)}
          >
            <img
              src={urlFor(item.url).width(800).url()} // default/fallback width
              srcSet={srcSet}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={item.title}
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
    </Box>
  );
}
