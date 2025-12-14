import {
  Box,
  Grid,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Arrow } from "@/src/components/Arrow";
import { Column } from "@/src/components/Layout";
import { ResponsiveSanityBox } from "@/src/components/ResponsiveSanityImage";
import { SectionTitle } from "@/src/components/SectionTitle";
import StickyBox from "@/src/components/StickyBox";
import { PAGES } from "@/src/constants";

interface ExploreSectionProps {
  title: string;
  description: string;
  images: {
    src: SanityImageSource;
  }[];
}

const DESKTOP_EXPLORE_PROJECTS_SECTION_HEIGHT = "1200px";
const DESKTOP_SPACING = 2;

const DESKTOP_LAYOUT = [
  [2, 2, 3],
  [2, 3, 2],
  [3, 2, 2],
];
const MOBILE_LAYOUT = [
  [1, 2, 1, 2],
  [2, 1, 1, 2],
];

export default function ExploreSection(props: ExploreSectionProps) {
  const { title, description, images } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // true if screen < 600px

  let columns;
  if (isMobile) {
    const chunkSize = 4;
    columns = [
      images.slice(0, chunkSize), // images[0..3]
      images.slice(chunkSize, 8), // images[4..7]
    ];
  } else {
    const chunkSize = 3;
    columns = [
      images.slice(0, chunkSize), // images[0..2]
      images.slice(chunkSize, 6), // images[3..5]
      images.slice(6, 9), // images[6..8]
    ];
  }

  const titleSection = (
    <Column sx={{ alignItems: "flex-start", gap: 2 }}>
      <SectionTitle title={title} />
      <Typography color="text.secondary">{description}</Typography>
      <Arrow
        direction="right"
        title="explore our portfolio"
        size="md"
        href={PAGES.portfolio}
      />
    </Column>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: 4,
        py: {
          xs: 8,
          lg: 0,
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
              lg: 0,
            },
            paddingRight: {
              lg: 4,
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
          {columns.map((columnImages, columnIndex) => (
            <ExploreColumn
              key={columnIndex}
              images={columnImages}
              layout={
                isMobile
                  ? MOBILE_LAYOUT[columnIndex]
                  : DESKTOP_LAYOUT[columnIndex]
              }
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function ExploreColumn({
  images,
  layout,
}: {
  images: {
    src: SanityImageSource;
  }[];
  layout: number[];
}) {
  return (
    <Grid
      spacing={{
        lg: 6,
      }}
      size={{
        xs: 6,
        lg: 4,
      }}
      sx={{
        height: "100%",
        display: "block",
      }}
    >
      <Stack
        direction="column"
        spacing={DESKTOP_SPACING}
        sx={{ height: "100%" }}
      >
        {images.map((image, idx) => (
          <ResponsiveSanityBox
            key={idx}
            src={image.src}
            alt="Explore image"
            sx={{
              objectFit: "cover",
              flex: layout[idx],
              minHeight: 0,
            }}
          />
        ))}
      </Stack>
    </Grid>
  );
}
