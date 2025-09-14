import { useState } from "react";
import { Box, Grid, Typography, Chip } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Row, Column } from "../src/components/Layout";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import styles from "@/styles/projectImage.module.css";
import Link from "next/link";

enum ProjectStatus {
  COMING_SOON = "COMING_SOON",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

interface Project {
  title: string;
  heroImage: string;
  slug: string;
  tags: string[];
  status?: ProjectStatus;
}

const allTags = [
  "Kitchen",
  "Living Room",
  "Powder Room",
  "Commercial",
  "Residential",
];

export default function PortfolioPage({ projects }: { projects: Project[] }) {
  const [isActiveTag, setIsActiveTag] = useState<string | null>(null);

  // Filter projects by selected tag
  const filteredProjects = isActiveTag
    ? projects.filter((p) => p.tags.includes(isActiveTag))
    : projects;

  return (
    <>
      <Header sticky={true} />

      {/* this is the main table shell */}
      <Column
        sx={{
          py: {
            xs: 2,
            md: 4,
          },
          px: 2,
          maxWidth: 1200,
          mx: "auto",
          gap: 2,
        }}
      >
        {/* Chips row */}
        <Row
          flexWrap="wrap"
          sx={{
            gap: 1,
            width: "100%",
            justifyContent: {
              xs: "center",
              md: "flex-end",
            },
          }}
        >
          {allTags.map((tag) => (
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
                        height: 500,
                        position: "relative",
                        //   filter:
                        //     project.status === "COMING_SOON"
                        //       ? "grayscale(50%) brightness(80%)"
                        //       : "none",
                      }}
                    >
                      <Box
                        component="img"
                        src={project.heroImage}
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
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const projects = [
    {
      heroImage: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      slug: "/project",
      tags: ["Residential", "Living Room"],
      status: ProjectStatus.ACTIVE,
    },
    {
      heroImage: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      slug: "/project",
      tags: ["Powder Room"],
      status: ProjectStatus.COMING_SOON,
    },
    {
      heroImage: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      slug: "/project",
      tags: ["Living Room"],
      status: ProjectStatus.COMING_SOON,
    },
    {
      heroImage: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      slug: "/project",
      tags: ["Powder Room"],
      status: ProjectStatus.ACTIVE,
    },
    {
      heroImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      slug: "/project",
      tags: ["Residential"],
      status: ProjectStatus.ACTIVE,
    },
    {
      heroImage: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      slug: "/project",
      tags: ["Residential"],
      status: ProjectStatus.ACTIVE,
    },
    {
      heroImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      slug: "/project",
      tags: ["Residential"],
      status: ProjectStatus.ACTIVE,
    },
    {
      heroImage: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      slug: "/project",
      tags: ["Residential"],
      status: ProjectStatus.ACTIVE,
    },
  ];

  return { props: { projects } };
}
