import {
  Box,
  Typography,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Column } from "@/src/components/Layout";
import { ResponsiveSanityImage } from "@/src/components/ResponsiveSanityImage";
import StickyBox from "@/src/components/StickyBox";

interface TravelInspirationGalleryProps {
  title: string;
  description: string;
  images: {
    title: string;
    subtitle: string;
    image: SanityImageSource;
  }[];
}

export default function TravelInspirationGallery({
  title,
  description,
  images,
}: TravelInspirationGalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px
  const imagesToDisplay = isMobile ? images.slice(0, 8) : images;

  const titleSection = (
    <Column sx={{ alignItems: "flex-start", gap: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
        {title}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Column>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        py: {
          xs: 8,
          md: 0,
        },
      }}
    >
      {/* Left column should be sticky on desktop */}
      {isMobile ? (
        titleSection
      ) : (
        <StickyBox
          leftWidth={"40%"}
          top={theme.spacing(8)}
          sx={{
            // Padding on the text column
            px: {
              md: 0,
            },
            paddingRight: {
              md: 4,
            },
          }}
        >
          {titleSection}
        </StickyBox>
      )}
      <Box sx={{ flex: 1 }}>
        <ImageList
          cols={isMobile ? 2 : 3}
          gap={16}
          rowHeight={isMobile ? 300 : 400}
        >
          {imagesToDisplay.map((item, i) => (
            <ImageListItem
              key={i}
              sx={{
                "&:hover .MuiImageListItemBar-root": { opacity: 1 },
              }}
            >
              <ResponsiveSanityImage
                src={item.image}
                alt={item.title}
                lazy={true}
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
