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
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// TODO: update this to use consistent type throughout project
interface ProjectImage {
  src: string;
  title: string;
  subtitle: string;
}

export function FeaturedProjectSection({ images }: { images: ProjectImage[] }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
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

      <StickyBox leftWidth={"50%"} top={theme.spacing(12)}>
        <Column sx={{ alignItems: "flex-start", gap: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
            Dark Academia Living Room
          </Typography>
          <Typography color="text.secondary">
            When we asked Kevin to tell us about a place that brought back good
            memories and made him feel at ease, he began describing the Sterling
            Memorial Library at Yale University. Its where he used to spend many
            late nights listening to music while studying or reading a book. He
            loved the Gothic architecture and how the stained glass windows cast
            colorful patterns across the floors.
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
      </StickyBox>
    </Box>
  );
}
