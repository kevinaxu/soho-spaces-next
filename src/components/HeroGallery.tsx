import { Box } from "@mui/material";
import { Row } from "./Layout";
import { urlFor } from "../utils/sanityImage";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface HeroGalleryProps {
  hero: { _id: string; url: string; title: string }[];
  handleImageClick?: (index: number) => void;
}

export default function HeroGallery({
  hero,
  handleImageClick,
}: HeroGalleryProps) {
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
            xs: 350,
            sm: 500,
          },
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
              onClick={() => handleImageClick?.(idx)}
            >
              <img
                src={urlFor(item.url).width(800).url()}
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
      </Row>
      <Row
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          px: 2,
          paddingTop: 1,
        }}
      >
        <Typography variant="h6">back to interiors</Typography>
        <Row
          sx={{
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6">scroll</Typography>
          <ArrowRightAltIcon sx={{ transform: "scaleX(1.8)" }} />
        </Row>
      </Row>
    </Box>
  );
}
