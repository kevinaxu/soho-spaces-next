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

interface ExploreSectionProps {
  title: string;
  description: string;
  images: ProjectImage[][];
}

// TODO: update this to use consistent type throughout project
interface ProjectImage {
  src: string;
  flex: number;
}

const DESKTOP_EXPLORE_PROJECTS_SECTION_HEIGHT = "800px";
const DESKTOP_SPACING = 2;

export default function ExploreSection(props: ExploreSectionProps) {
  const { title, description, images } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px

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
          <ExploreColumn images={images[0]} shouldDisplayOnMobile />
          <ExploreColumn images={images[1]} shouldDisplayOnMobile />
          <ExploreColumn images={images[2]} shouldDisplayOnMobile={false} />
        </Grid>
      </Box>
    </Box>
  );
}

function ExploreColumn({
  images,
  shouldDisplayOnMobile = true,
}: {
  images: {
    src: string;
    flex: number;
  }[];
  shouldDisplayOnMobile: boolean;
}) {
  return (
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
        display: {
          md: "block",
          xs: shouldDisplayOnMobile ? "block" : "none", // hide column 3 on mobile
        },
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
            flex: images[0].flex,
            objectFit: "cover",
            minHeight: 0,
          }}
        />
        <Box
          component="img"
          src={images[1].src}
          sx={{
            flex: images[1].flex,
            objectFit: "cover",
            minHeight: 0,
          }}
        />
        <Box
          component="img"
          src={images[2].src}
          sx={{
            flex: images[2].flex,
            objectFit: "cover",
            minHeight: 0,
          }}
        />
      </Stack>
    </Grid>
  );
}
