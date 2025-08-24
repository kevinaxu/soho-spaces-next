import { Box } from "@mui/material";
import { urlFor } from "../utils/sanityImage";

interface HeroGalleryProps {
  hero: { _id: string; url: string; title: string }[];
  handleImageClick: (index: number) => void;
}

export default function HeroGallery({
  hero,
  handleImageClick,
}: HeroGalleryProps) {
  const buildSrcSet = (imageUrl: string) => {
    const widths = [320, 480, 768, 1024, 1600, 2400];
    return widths
      .map((w) => `${urlFor(imageUrl).width(w).url()} ${w}w`)
      .join(", ");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        overflowX: "auto",
        height: 500,
        display: "flex",
        gap: "16px",
      }}
    >
      {hero.map((item, idx) => (
        <Box
          key={item._id}
          sx={{ flex: "0 0 auto", height: "100%", cursor: "pointer" }}
          onClick={() => handleImageClick(idx)}
        >
          <img
            src={urlFor(item.url).width(800).url()} // default/fallback width
            srcSet={buildSrcSet(item.url)}
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
      ))}
    </Box>
  );
}
