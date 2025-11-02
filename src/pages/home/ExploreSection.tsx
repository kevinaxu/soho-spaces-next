import {
  Box,
  Grid,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Column } from "@/src/components/Layout";
import StickyBox from "@/src/components/StickyBox";

// TODO: update this to use consistent type throughout project
interface ProjectImage {
  src: string;
  title: string;
  subtitle: string;
}

const DESKTOP_EXPLORE_PROJECTS_SECTION_HEIGHT = "800px";
const DESKTOP_SPACING = 2;

export default function ExploreSection({ images }: { images: ProjectImage[] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px

  const titleSection = (
    <Column sx={{ alignItems: "flex-start", gap: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
        A Glimpse Into Our Projects
      </Typography>
      <Typography color="text.secondary">
        Dive into our portfolio and see the details that make each project
        unique
      </Typography>
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
        },
      }}
    >
      {/* Left column should be sticky on desktop */}
      {isMobile ? (
        titleSection
      ) : (
        <StickyBox
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
      <Box sx={{ flex: 1 }}>
        <Grid
          container
          columnSpacing={DESKTOP_SPACING} // Column spacing
          sx={{
            width: "100%",
            height: DESKTOP_EXPLORE_PROJECTS_SECTION_HEIGHT,
          }}
        >
          {/* First column */}
          <Grid
            spacing={{
              md: 2,
            }}
            size={{
              xs: 6,
              md: 4,
            }}
            sx={{
              height: "100%",
            }}
          >
            <Stack
              direction="column"
              spacing={DESKTOP_SPACING}
              sx={{ height: "100%" }}
            >
              <Box
                component="img"
                src={images[0].src}
                sx={{
                  flex: 2,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
              <Box
                component="img"
                src={images[1].src}
                sx={{
                  flex: 1,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
              <Box
                component="img"
                src={images[2].src}
                sx={{
                  flex: 1,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
            </Stack>
          </Grid>
          <Grid
            spacing={{
              md: 6,
            }}
            size={{
              xs: 6,
              md: 4,
            }}
            sx={{
              height: "100%",
            }}
          >
            <Stack
              direction="column"
              spacing={DESKTOP_SPACING}
              sx={{ height: "100%" }}
            >
              <Box
                component="img"
                src={images[0].src}
                sx={{
                  flex: 1,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
              <Box
                component="img"
                src={images[1].src}
                sx={{
                  flex: 1,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
              <Box
                component="img"
                src={images[2].src}
                sx={{
                  flex: 1,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
            </Stack>
          </Grid>
          {/* Third column */}
          <Grid
            spacing={{
              md: 6,
            }}
            size={{
              md: 4,
            }}
            sx={{
              display: {
                md: "block",
                xs: "none", // hide column 3 on mobile
              },
              height: "100%",
            }}
          >
            <Stack
              direction="column"
              spacing={DESKTOP_SPACING}
              sx={{ height: "100%" }}
            >
              <Box
                component="img"
                src={images[0].src}
                sx={{
                  flex: 1,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
              <Box
                component="img"
                src={images[1].src}
                sx={{
                  flex: 2,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
              <Box
                component="img"
                src={images[2].src}
                sx={{
                  flex: 1,
                  objectFit: "cover",
                  minHeight: 0,
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
