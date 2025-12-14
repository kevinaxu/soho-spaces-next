import Typography from "@mui/material/Typography";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Column } from "@/src/components/Layout";
import ModalLightbox from "@/src/components/ModalLightbox";
import PageMeta from "@/src/components/PageMeta";
import { FullWidthSection } from "@/src/components/Section";
import { SectionSubtitle } from "@/src/components/SectionTitle";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import { PAGES } from "@/src/constants";
import { ContactUsSection } from "@/src/pages/home/ContactUsSection";
import BeforeAfterSection from "@/src/pages/project/BeforeAfterSection";
import HorizontalGallerySection from "@/src/pages/project/HorizontalGallerySection";
import HotspotSection from "@/src/pages/project/HotspotSection";
import { OverviewSection } from "@/src/pages/project/OverviewSection";
import { client } from "@/src/sanity/client";

interface Project {
  metadata: {
    title: string;
    description: string;
  };
  overview: {
    intro: string;
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
    hotspotImage?: SanityImageSource;
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

export default function ProjectPage({
  project,
  slug,
}: {
  project: Project;
  slug: string;
}) {
  const [heroCarouselOpen, heroSetCarouselOpen] = useState(false);
  const [heroCarouselIndex, heroSetCarouselIndex] = useState(0);
  const handleHeroImageClick = (index: number) => {
    heroSetCarouselIndex(index);
    heroSetCarouselOpen(true);
  };
  const handleHeroCloseCarousel = () => heroSetCarouselOpen(false);

  return (
    <>
      <PageMeta
        title={`${project.metadata.title} | Soho Spaces`}
        description={
          project.metadata.description ||
          `A look inside the ${project.metadata.title} by Soho Spaces—featuring rich finishes, bold contrast, and a refined, contemporary atmosphere.`
        }
        url={`${PAGES.portfolio}/${slug}`}
        // TODO: create a separate image crop for image preview (1200x630)
        image={project.hero.images[0].src}
        pageType="project"
      />

      <Header sticky={false} />

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          alignItems: "center",
          paddingTop: 0,
          paddingBottom: 2,
        }}
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
            lg: 4,
          },
          px: {
            xs: PADDING_X_MOBILE,
            sm: 6,
            lg: 16,
          },
        }}
      >
        <OverviewSection
          title={project.metadata.title}
          description={project.overview.intro}
          details={project.overview.details}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            lg: 4,
          },
          px: {
            xs: PADDING_X_MOBILE,
            sm: 6,
            lg: 16,
          },
        }}
      >
        <Column gap={2} sx={{ width: "100%" }}>
          <SectionSubtitle title="Before & After" gutterBottom={false} />
          <BeforeAfterSection items={project.comparison.images} />
        </Column>
      </FullWidthSection>

      {project.hotspot.hotspotImage && (
        <FullWidthSection
          sx={{
            bgcolor: "#e3e2dc",
            py: {
              xs: 2,
              lg: 8,
            },
            px: {
              xs: PADDING_X_MOBILE,
              lg: 16,
            },
          }}
        >
          <Column gap={2} sx={{ width: "100%" }}>
            <SectionSubtitle title="Details & Finishes" gutterBottom={false} />
            <HotspotSection
              image={project.hotspot.hotspotImage}
              hotspots={project.hotspot.hotspots}
            />
          </Column>
        </FullWidthSection>
      )}

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          px: {
            xs: PADDING_X_MOBILE,
            lg: PADDING_X_SECTION,
          },
          py: {
            xs: 2,
            lg: 2,
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
        <ModalLightbox
          images={project.hero.images}
          index={heroCarouselIndex}
          open={heroCarouselOpen}
          close={handleHeroCloseCarousel}
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
    "metadata": { 
        title,
        description
      },
      "overview": {
        intro,
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

  // Validate all required sections are present
  const requiredKeys = ["overview", "hero", "comparison", "hotspot", "contact"];
  if (!project || !requiredKeys.every((key) => project[key])) {
    return { notFound: true };
  }

  return {
    props: { project, slug },
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

const mockData = {
  overview: {
    title: "Dark Academia Living Room",
    description:
      "When we asked Kevin to tell us about a place that brought back good memories and made him feel at ease, he began describing the Sterling Memorial Library at Yale University. It's where he used to spend many late nights listening to music while studying or reading a book. He loved the Gothic architecture and how the stained glass windows cast colorful patterns across the floors. He missed the smell of old books mixed with the faint aroma of wood polish. With its rows of towering bookshelves and dimly-lit brass lamps, somehow the library felt both grand and cozy at the same time. With that inspiration in mind, we created this Dark Academia living room - a space where Kevin could gather his thoughts, put on a record, and relax with a good book. We chose modern yet timeless furniture, complemented it with some antique pieces, and balanced rich, dark hues with ornate gold detailing. Full story below.",
    details: [
      {
        label: "Date",
        value: "2024",
      },
      {
        label: "Staging",
        value: "Soho Spaces, LLC",
      },
      {
        label: "Photography",
        value: "Travis Preston",
      },
    ],
  },
  hero: {
    images: [
      { title: "whatup", src: "/dark_academia/chair2.jpeg" },
      { title: "whatup", src: "/dark_academia/IMG_0005.jpeg" },
      { title: "whatup", src: "/dark_academia/sconce2.jpeg" },
      { title: "whatup", src: "/dark_academia/IMG_0003.jpeg" },
      { title: "whatup", src: "/dark_academia/IMG_0006.jpeg" },
      { title: "whatup", src: "/dark_academia/sofa_close_up.jpeg" },
      { title: "whatup", src: "/dark_academia/IMG_9150.jpeg" },
    ],
  },
  comparison: {
    images: [
      {
        before: { src: "/dark_academia/IMG_3265_2x.jpeg" },
        after: { src: "/dark_academia/IMG_1234.jpeg" },
      },
      {
        before: { src: "/dark_academia/IMG_3265_2x.jpeg" },
        after: { src: "/dark_academia/IMG_1234.jpeg" },
      },
    ],
  },
  hotspot: {
    hotspotImage: "/dark_academia/IMG_0020.jpeg",
    hotspots: [
      {
        title: "Cabinets",
        description:
          "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
        percentX: 0.2,
        percentY: 0.2,
      },
      {
        title: "Counter",
        description:
          "To balance the dark base and incorporate the surrounding color palette, we chose a stunning Calacatta Miraggio quartz countertop with subtle gold and grey veining.",
        percentX: 0.2,
        percentY: 0.8,
      },
      {
        title: "Appliances",
        description:
          "We chose the six-burner black and gold gas range with convection oven from Zline, and coupled it with the same Calacatta Miraggio quartz backsplash and brass pulls from the island to make the whole space look cohesive.",
        percentX: 0.8,
        percentY: 0.2,
      },
      {
        title: "Cabinets",
        description:
          "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
        percentX: 0.8,
        percentY: 0.8,
      },
    ],
  },
  contact: {
    title: "Ready to transform your dream space?",
    cta: "Schedule a free consultation",
    src: "/dark_academia/shady_glen_sketch.png",
  },
};
