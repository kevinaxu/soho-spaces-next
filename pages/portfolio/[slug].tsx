import Typography from "@mui/material/Typography";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import ImageCarousel from "@/src/components/ImageCarousel";
import { Column } from "@/src/components/Layout";
import { FullWidthSection } from "@/src/components/Section";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import { ContactUsSection } from "@/src/pages/home/ContactUsSection";
import BeforeAfterSection from "@/src/pages/project/BeforeAfterSection";
import HorizontalGallerySection from "@/src/pages/project/HorizontalGallerySection";
import HotspotSection from "@/src/pages/project/HotspotSection";
import { OverviewSection } from "@/src/pages/project/OverviewSection";
import { client } from "@/src/sanity/client";

interface Project {
  overview: {
    title: string;
    description: string;
    details: { label: string; value: string }[];
  };
  hero: {
    images: {
      // TODO: is title necessary?
      title: string;
      src: SanityImageSource;
    }[];
  };
  comparison: {
    images: {
      before: { src: SanityImageSource };
      after: { src: SanityImageSource };
    }[];
  };
  hotspot: {
    hotspotImage: SanityImageSource;
    hotspots: {
      title: string;
      description: string;
      percentX: number;
      percentY: number;
    }[];
  };
  contact: {
    title: string;
    cta: string;
    src: SanityImageSource;
  };
}

export default function ProjectPage({ project }: { project: Project }) {
  console.log("dumping project", JSON.stringify(project.contact, null, 2));

  const [heroCarouselOpen, heroSetCarouselOpen] = useState(false);
  const [heroCarouselIndex, heroSetCarouselIndex] = useState(0);
  const handleHeroImageClick = (index: number) => {
    heroSetCarouselIndex(index);
    heroSetCarouselOpen(true);
  };
  const handleHeroCloseCarousel = () => heroSetCarouselOpen(false);

  // TODO: move this into a validation fn later
  if (
    !project ||
    !project.hero ||
    !project.overview ||
    !project.comparison ||
    !project.hotspot ||
    !project.contact
  ) {
    return null;
  }

  return (
    <>
      <Header sticky={false} />

      <FullWidthSection
        sx={{ bgcolor: "#e3e2dc", alignItems: "center", py: 0 }}
      >
        <HorizontalGallerySection
          images={project.hero.images}
          handleImageClick={handleHeroImageClick}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 8,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 20,
          },
        }}
      >
        <OverviewSection
          title={project.overview.title}
          description={project.overview.description}
          details={project.overview.details}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 8,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 20,
          },
        }}
      >
        <Column gap={2} sx={{ width: "100%" }}>
          <Typography variant="h2">Before and After</Typography>
          <BeforeAfterSection items={project.comparison.images} />
        </Column>
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 8,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 20,
          },
        }}
      >
        <Column gap={2} sx={{ width: "100%" }}>
          <Typography variant="h2">Materials</Typography>
          <HotspotSection
            image={project.hotspot.hotspotImage}
            hotspots={project.hotspot.hotspots}
          />
        </Column>
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
          py: {
            xs: 2,
            md: 2,
          },
        }}
      >
        <ContactUsSection
          title={project.contact.title}
          cta={project.contact.cta}
          src={project.contact.src}
        />
      </FullWidthSection>

      {heroCarouselOpen && (
        <ImageCarousel
          images={project.hero.images}
          initialIndex={heroCarouselIndex}
          onClose={handleHeroCloseCarousel}
        />
      )}

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug && projectStatus == "ACTIVE"][0]{
      "overview": {
        title,
        description,
        details
      },
      "hero": {
        "images": hero.images[]{
          "title": photo->title,
          "src": photo->image{
            ...,
            asset->
           }
        }
      },
      "comparison": {
        "images": comparison.images[]{
          "before": { "src": before->image { ..., asset-> } },
          "after": { "src": after->image { ..., asset-> } }
        }
      },
      "hotspot": {
        "hotspotImage": hotspot.hotspotImage->image { ..., asset-> },
        "hotspots": hotspot.hotspots[]{
            title,
            description,
            percentX,
            percentY
        } 
      },
      "contact": { 
        "title": contact.title,
        "cta": contact.cta,
        "src": contact.src->image { ..., asset-> }
      }
  }
`,
    { slug }
  );

  if (!project) {
    return { notFound: true };
  }

  return {
    props: { project },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await client.fetch(
    `*[_type == "project" && defined(slug.current)]{
      "slug": slug.current
    }`
  );

  const paths = projects.map((p: { slug: string }) => ({
    params: { slug: p.slug },
  }));

  return {
    paths,
    fallback: false, // must be false for static export
  };
};
