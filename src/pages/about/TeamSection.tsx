import { Box, Grid, Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Column } from "@/src/components/Layout";
import { ResponsiveSanityBox } from "@/src/components/ResponsiveSanityImage";
import styles from "@/styles/projectImage.module.css";

interface TeamSectionProps {
  team: {
    name: string;
    title: string;
    content: string;
    image: SanityImageSource;
  }[];
}

const IMAGE_MAX_HEIGHT = 650;

export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={{
        xs: 4,
        md: 8,
      }}
    >
      {team.map((member, idx) => (
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
          key={idx}
          display="flex"
          justifyContent="center"
        >
          <Column sx={{ width: "100%" }}>
            {/* Image with hover trim effect */}
            <Box
              className={styles.containerBlock}
              sx={{
                width: "100%",
                aspectRatio: "9 / 16",
                maxHeight: IMAGE_MAX_HEIGHT,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <ResponsiveSanityBox
                src={member.image}
                alt={member.name}
                lazy={true}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <Box className={styles.innerBlock}>
                <Box className={styles.sliderTopRight} />
              </Box>
            </Box>

            <Column
              sx={{
                gap: 0,
                mb: 2,
                paddingTop: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {member.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontStyle="italic"
              >
                {member.title}
              </Typography>
            </Column>

            <Typography variant="body2" color="text.secondary">
              {member.content}
            </Typography>
          </Column>
        </Grid>
      ))}
    </Grid>
  );
}
