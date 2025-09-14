import { Column } from "../components/Layout";
import { Box, Grid, Typography } from "@mui/material";
import styles from "@/styles/projectImage.module.css";

interface TeamMember {
  heroImage: string;
  name: string;
  title: string;
  content: string;
}

interface TeamSectionProps {
  team: TeamMember[];
}

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
          <Column sx={{ width: "100%", maxWidth: 350 }}>
            {/* Image with hover trim effect */}
            <Box
              className={styles.containerBlock}
              sx={{
                width: "100%",
                height: 500,
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={member.heroImage}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  // filter: "grayscale(100%)",
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
