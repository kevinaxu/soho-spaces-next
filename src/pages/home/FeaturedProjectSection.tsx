import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Row, Column } from "@/src/components/Layout";
import { ResponsiveSanityImage } from "@/src/components/ResponsiveSanityImage";
import StickyBox from "@/src/components/StickyBox";

interface FeaturedProjectSectionProps {
  title: string;
  description: string;
  images: {
    src: SanityImageSource;
    title: string;
    subtitle: string;
  }[];
}

export function FeaturedProjectSection(props: FeaturedProjectSectionProps) {
  const { title, description, images } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px

  const titleSection = (
    <Column sx={{ alignItems: "flex-start", gap: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
        {title}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
      <Row
        sx={{
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          color="text.secondary"
          sx={{
            variant: "body1",
          }}
        >
          see the project
        </Typography>
        <ArrowRightAltIcon
          sx={{
            transform: {
              xs: "scaleX(1.5)",
              md: "scaleX(1.8)",
            },
          }}
        />
      </Row>
    </Column>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        gap: 4,
        // TODO: move this to parent layout
        // same for TravelInspirationGallery component
        py: {
          xs: 8,
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <ImageList cols={1} gap={28} rowHeight={500}>
          {images.map((item, i) => (
            <ImageListItem
              key={i}
              sx={{
                "&:hover .MuiImageListItemBar-root": { opacity: 1 },
              }}
            >
              <ResponsiveSanityImage
                src={item.src}
                alt={item.title}
                lazy={true}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {item.title && item.subtitle && (
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
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      {isMobile ? (
        titleSection
      ) : (
        <StickyBox
          leftWidth={"50%"}
          top={theme.spacing(8)}
          sx={{
            paddingX: {
              md: 0,
            },
          }}
        >
          {titleSection}
        </StickyBox>
      )}
    </Box>
  );
}
