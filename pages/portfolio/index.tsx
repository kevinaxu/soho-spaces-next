import { Box, Grid, Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import { Arrow } from "@/src/components/Arrow";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Row, Column } from "@/src/components/Layout";
import PageMeta from "@/src/components/PageMeta";
import { ResponsiveSanityBox } from "@/src/components/ResponsiveSanityImage";
import { FullWidthSection } from "@/src/components/Section";
import { SectionTitle } from "@/src/components/SectionTitle";
import { PADDING_X_MOBILE } from "@/src/constants";
import { client } from "@/src/sanity/client";
import styles from "@/styles/projectImage.module.css";

interface PortfolioPageProps {
  projects: {
    title: string;
    slug: string;
    status: "COMING_SOON" | "ACTIVE" | "HIDDEN";
    image: SanityImageSource;
  }[];
}

const IMAGE_MAX_HEIGHT = 600;
const GRID_MAX_WIDTH = 1500;

export default function PortfolioPage({
  portfolio,
}: {
  portfolio: PortfolioPageProps;
}) {
  return (
    <>
      <PageMeta
        title="Portfolio | Soho Spaces Interior Design"
        description="Explore interior design projects by Soho Spaces, featuring full renovations, commercial spaces, and more."
        url="/portfolio"
        pageType="portfolio"
      />

      <Header sticky={true} />
      <FullWidthSection
        sx={{
          py: { xs: 2, lg: 4 },
          px: { xs: PADDING_X_MOBILE, lg: 0 },
          alignItems: "center",
        }}
      >
        <Column
          gap={2}
          sx={{
            minHeight: {
              lg: "65vh",
            },
          }}
        >
          {/* Grid */}
          <Box
            sx={{
              width: "100%",
              maxWidth: GRID_MAX_WIDTH,
              mx: "auto", // centers the grid
              paddingX: { xs: 0, lg: 2 },
            }}
          >
            <Grid
              container
              spacing={{ xs: 4, lg: 6 }}
              rowSpacing={{ xs: 6, lg: 8 }}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              {portfolio.projects.map((project, idx) => (
                <Grid
                  key={idx}
                  display="flex"
                  justifyContent="center"
                  size={{ xs: 12, lg: 4 }}
                >
                  <Column sx={{ width: "100%", maxWidth: 400 }}>
                    <Link href={`/portfolio/${project.slug}`} passHref>
                      <Box
                        className={styles.containerBlock}
                        sx={{
                          width: "100%",
                          aspectRatio: "2/3",
                          maxHeight: IMAGE_MAX_HEIGHT,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <ResponsiveSanityBox
                          src={project.image}
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
                      <Link href={`/portfolio/${project.slug}`} passHref>
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
                        <Arrow direction="right" size="md" />
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

const PORTFOLIO_PAGE_SANITY_ID = "2f4c01e5-52c3-423a-bf00-7d4442399325";

export const getStaticProps = async () => {
  const portfolio = await client.fetch(
    `*[_type == "portfolio" && _id == $id][0]{
    projects[]{
      title,
        "image": image->image{
          ...,
          asset->
        },
      "slug": project->slug.current,
      "status": project->projectStatus,
    }
  }`,
    { id: PORTFOLIO_PAGE_SANITY_ID }
  );

  // Validate all required sections are present
  if (!portfolio || !portfolio.projects) {
    return { notFound: true };
  }

  return {
    props: { portfolio },
  };
};

/*
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
      status: "ACTIVE",
    },
    {
      src: "/modern_gothic_after.jpeg",
      title: "Modern Gothic",
      slug: "/",
      tags: ["Living Room"],
      status: "COMING_SOON",
    },
    {
      src: "/dark_academia/IMG_0020.jpeg",
      title: "Dark Academia",
      slug: "/",
      tags: ["Residential", "Living Room"],
      status: "ACTIVE",
    },
    {
      src: "/dark_academia/IMG_0020.jpeg",
      title: "Dark Academia",
      slug: "/",
      tags: ["Residential", "Living Room"],
      status: "ACTIVE",
    },
  ],
};
*/
