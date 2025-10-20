import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Box,
  Typography,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { Row, Column } from "@/src/components/Layout";
import StickyBox from "@/src/components/StickyBox";

// TODO: update this to use consistent type throughout project
interface ProjectImage {
  src: string;
  title: string;
  subtitle: string;
}

export function ExploreProjectsSection({ images }: { images: ProjectImage[] }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <StickyBox leftWidth={"40%"} top={theme.spacing(12)}>
        <Column
          sx={{
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
            A Glimpse Into Our Projects
          </Typography>
          <Typography color="text.secondary">
            Dive into our portfolio and see the details that make each project
            unique
          </Typography>
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
              wander
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
      </StickyBox>

      <Box sx={{ flex: 1, height: "1900px", overflow: "hidden" }}>
        <ImageList variant="masonry" cols={2} gap={16}>
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
