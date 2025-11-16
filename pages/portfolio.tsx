import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Grid, Typography, Chip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Row, Column } from "@/src/components/Layout";
import { FullWidthSection } from "@/src/components/Section";
import { PADDING_X_MOBILE } from "@/src/constants";
import styles from "@/styles/projectImage.module.css";

enum ProjectStatus {
  COMING_SOON = "COMING_SOON",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

interface Project {
  title: string;
  src: string;
  slug: string;
  tags: string[];
  status?: ProjectStatus;
}

const IMAGE_MAX_HEIGHT = 650;

export default function PortfolioPage() {
  const [isActiveTag, setIsActiveTag] = useState<string | null>(null);

  const projects = mockData.projects as Project[];

  // Filter projects by selected tag
  const filteredProjects = isActiveTag
    ? projects.filter((p) => p.tags.includes(isActiveTag))
    : projects;

  return (
    <>
      <Header sticky={true} />

      {/* this is the main table shell */}
      <FullWidthSection
        sx={{
          py: {
            xs: 2,
            md: 4,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 16,
          },
          alignItems: "center",
        }}
      >
        <Column gap={2}>
          {/* Chips row */}
          <Row
            flexWrap="wrap"
            sx={{
              gap: 1,
              width: "100%",
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            {mockData.visibleTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color={isActiveTag === tag ? "primary" : "default"}
                onClick={() => setIsActiveTag(tag)}
                onDelete={
                  isActiveTag === tag ? () => setIsActiveTag(null) : undefined
                }
                clickable
              />
            ))}
          </Row>

          <Box sx={{ flexGrow: 1, py: 2 }}>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={{
                xs: 4,
                md: 8,
              }}
            >
              {filteredProjects.map((project, idx) => (
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
                    <Link href={project.slug} passHref>
                      {/* Image with hover trim effect */}
                      <Box
                        className={styles.containerBlock}
                        sx={{
                          width: "100%",
                          aspectRatio: "9/16",
                          maxHeight: IMAGE_MAX_HEIGHT,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={project.src}
                          alt={project.title}
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
                    </Link>
                    <Row
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      <Link href={project.slug} passHref>
                        <Typography variant="body1">{project.title}</Typography>
                      </Link>
                      {project.status === "COMING_SOON" ? (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          coming soon
                        </Typography>
                      ) : (
                        <ArrowRightAltIcon />
                      )}
                    </Row>
                  </Column>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Column>
      </FullWidthSection>
      <Footer />
    </>
  );
}

const mockData = {
  visibleTags: [
    "Kitchen",
    "Living Room",
    "Powder Room",
    "Commercial",
    "Residential",
  ],
  projects: [
    {
      src: "/dark_academia/IMG_0020.jpeg",
      title: "Dark Academia",
      slug: "/",
      tags: ["Residential", "Living Room"],
      status: ProjectStatus.ACTIVE,
    },
    {
      src: "/modern_gothic_after.jpeg",
      title: "Modern Gothic",
      slug: "/",
      tags: ["Living Room"],
      status: ProjectStatus.COMING_SOON,
    },
    {
      src: "/dark_academia/IMG_0020.jpeg",
      title: "Dark Academia",
      slug: "/",
      tags: ["Residential", "Living Room"],
      status: ProjectStatus.ACTIVE,
    },
    {
      src: "/dark_academia/IMG_0020.jpeg",
      title: "Dark Academia",
      slug: "/",
      tags: ["Residential", "Living Room"],
      status: ProjectStatus.ACTIVE,
    },
  ],
};
