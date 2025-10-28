import {
  Box,
  Typography,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { Column } from "@/src/components/Layout";
import StickyBox from "@/src/components/StickyBox";

// TODO: update this to use consistent type throughout project
interface ProjectImage {
  src: string;
  title: string;
  subtitle: string;
}

export default function TravelInspirationGallery({
  images,
}: {
  images: ProjectImage[];
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <StickyBox top={theme.spacing(8)}>
        <Column sx={{ alignItems: "flex-start", gap: 2 }}>
          <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
            Design inspired by the world
          </Typography>
          <Typography color="text.secondary">
            Through our travels, we discover inspiration in every corner of the
            world — from the textures of local markets to the architecture of
            distant cities. Each journey allows us to source unique, handcrafted
            pieces and uncover emerging design styles that bring depth and
            authenticity to our interiors.
          </Typography>
        </Column>
      </StickyBox>

      <Box sx={{ flex: 1 }}>
        <ImageList cols={3} gap={16} rowHeight={300}>
          {images.map((item, i) => (
            <ImageListItem
              key={i}
              sx={{
                "&:hover .MuiImageListItemBar-root": { opacity: 1 },
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.subtitle}
                sx={{
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
