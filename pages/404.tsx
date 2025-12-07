import { Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Row, Column } from "@/src/components/Layout";
import PageMeta from "@/src/components/PageMeta";
import { ResponsiveSanityImage } from "@/src/components/ResponsiveSanityImage";
import { FullWidthSection } from "@/src/components/Section";
import {
  MAX_WIDTH_TEXT_CONTAINER,
  PADDING_X_MOBILE,
  PADDING_X_SECTION,
  PAGES,
} from "@/src/constants";
import { client } from "@/src/sanity/client";

interface Custom404PageProps {
  title: string;
  subtitle: string;
  projects: {
    title: string;
    slug: string;
    image: SanityImageSource;
  }[];
}

export default function Custom404Page({
  custom404,
}: {
  custom404: Custom404PageProps;
}) {
  return (
    <>
      <PageMeta
        title="Page Not Found | Soho Spaces"
        description="The page you're looking for doesn't exist. Explore our portfolio or return to the Soho Spaces homepage."
        url={PAGES.custom404}
        pageType="about"
      />
      <Header sticky={true} />

      <FullWidthSection
        sx={{
          py: { xs: 8, md: 2 },
          px: { xs: PADDING_X_MOBILE, md: PADDING_X_SECTION },
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <Column sx={{ width: "100%", alignItems: "center" }}>
          {/* Heading row */}
          <Column
            sx={{
              width: "100%",
              maxWidth: MAX_WIDTH_TEXT_CONTAINER,
              gap: 1,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 200 }}
            >
              Oops — pardon our dust!
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 200 }}
            >
              We're remodeling.
            </Typography>
          </Column>

          {/* Projects row */}
          <Column
            sx={{
              width: "100%",
              maxWidth: MAX_WIDTH_TEXT_CONTAINER,
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 2, // reduced gap before project row
              }}
            >
              In the meantime, check out some of our finished projects
            </Typography>
          </Column>

          {/* Projects row */}
          <Row
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {custom404.projects.map((project) => (
              <Column
                key={project.slug}
                sx={{
                  flex: "1 1 250px",
                  maxWidth: 300,
                  gap: 1,
                }}
              >
                <Link href={`/portfolio/${project.slug}`} passHref>
                  <ResponsiveSanityImage
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      aspectRatio: "3 / 2",
                      objectFit: "cover", // ensures cropping
                    }}
                  />
                </Link>
                <Link href={`/portfolio/${project.slug}`} passHref>
                  <Typography variant="body1">{project.title}</Typography>
                </Link>
              </Column>
            ))}
          </Row>
        </Column>
      </FullWidthSection>

      <Footer />
    </>
  );
}

const NOT_FOUND_PAGE_SANITY_ID = "29a85c22-e165-4f8a-a776-ed81e6b5ea2b";

export const getStaticProps = async () => {
  const custom404 = await client.fetch(
    `*[_type == "404" && _id == $id][0]{
      title,
      subtitle,
    projects[]{
      title,
        "image": image->image{
          ...,
          asset->
        },
      "slug": project->slug.current,
    }
  }`,
    { id: NOT_FOUND_PAGE_SANITY_ID }
  );

  // Validate all required sections are present
  if (!custom404) {
    return { notFound: true };
  }

  return {
    props: { custom404 },
  };
};
