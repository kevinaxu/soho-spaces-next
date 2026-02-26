import { Box, Stack, Typography, useTheme } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import { Arrow } from "@/src/components/Arrow";
import { Row, Column } from "@/src/components/Layout";
import { ResponsiveSanityImage } from "@/src/components/ResponsiveSanityImage";
import { SectionTitle } from "@/src/components/SectionTitle";
import StickyBox from "@/src/components/StickyBox";
import { PAGES } from "@/src/constants";
import { useIsMobile } from "@/src/hooks/useIsMobile";

interface FeaturedProjectSectionProps {
  title: string;
  description: string;
  projects: {
    title: string;
    slug: string;
    image: SanityImageSource;
    imageMobile: SanityImageSource;
  }[];
}

export function FeaturedProjectSection(props: FeaturedProjectSectionProps) {
  const { title, description, projects } = props;
  const theme = useTheme();
  const isMobile = useIsMobile();

  const titleSection = (
    <Column sx={{ alignItems: "flex-start", gap: 2 }}>
      <SectionTitle title={title} />
      <Typography color="text.secondary">{description}</Typography>
      <Row
        sx={{
          alignItems: "center",
          gap: 2,
        }}
      >
        <Arrow
          direction="right"
          title="view our portfolio"
          size="md"
          href={PAGES.portfolio}
        />
      </Row>
    </Column>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", lg: "row" },
        gap: 4,
        // TODO: move this to parent layout
        // same for TravelInspirationGallery component
        py: {
          xs: 8,
          lg: 0,
        },
      }}
    >
      <Stack spacing={{ xs: 4, lg: 4 }}>
        {projects.map((project, i) => (
          <Link
            key={i}
            href={`${PAGES.portfolio}/${project.slug}`}
            style={{ textDecoration: "none" }}
          >
            <Box key={i}>
              <ResponsiveSanityImage
                src={isMobile ? project.imageMobile : project.image}
                alt={project.title}
                lazy
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  aspectRatio: isMobile ? "1/1" : "3/2",
                }}
              />
              <Row
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 1 }}
              >
                <Typography variant="body1">{project.title}</Typography>
              </Row>
            </Box>
          </Link>
        ))}
      </Stack>

      {isMobile ? (
        titleSection
      ) : (
        <StickyBox
          leftWidth={"50%"}
          top={theme.spacing(8)}
          sx={{
            // Padding on the text column
            paddingLeft: {
              lg: 4,
            },
          }}
        >
          {titleSection}
        </StickyBox>
      )}
    </Box>
  );
}
