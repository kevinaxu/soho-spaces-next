import Typography from "@mui/material/Typography";
import type { PortableTextBlock } from "@portabletext/types";
import { useState } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import ImageCarousel from "@/src/components/ImageCarousel";
import { Column } from "@/src/components/Layout";
import { FullWidthSection } from "@/src/components/Section";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import { ContactUsSection } from "@/src/pages/home/ContactUsSection";
import HorizontalGallerySection from "@/src/pages/project/HorizontalGallerySection";
import HotspotSection from "@/src/pages/project/Hotspot";
import { OverviewSection } from "@/src/pages/project/OverviewSection";
import PhotoComparison from "@/src/pages/project/PhotoComparison";
import { client } from "@/src/sanity/client";
import { parsePortableText } from "@/src/utils/portableTextParser";

interface Project {
  title: string;
  projectCode?: string;
  projectType?: string;
  rooms?: string[];
  intro?: PortableTextBlock[];
  story?: PortableTextBlock[];
  hero?: Media[];
  gallery?: Media[];
  comparison?: {
    before: Media;
    after: Media;
  };
}

interface Media {
  _id: string;
  title: string;
  url: string;
  rows?: number;
  cols?: number;
}

export default function ProjectPage({ project }: { project: Project }) {
  const [heroCarouselOpen, heroSetCarouselOpen] = useState(false);
  const [heroCarouselIndex, heroSetCarouselIndex] = useState(0);
  const handleHeroImageClick = (index: number) => {
    heroSetCarouselIndex(index);
    heroSetCarouselOpen(true);
  };
  const handleHeroCloseCarousel = () => heroSetCarouselOpen(false);

  return (
    <>
      <Header sticky={false} />

      <FullWidthSection
        sx={{ bgcolor: "#e3e2dc", alignItems: "center", py: 0 }}
      >
        <HorizontalGallerySection
          images={mockData.hero.images}
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
          title={mockData.overview.title}
          description={mockData.overview.description}
          details={mockData.overview.details}
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
          <PhotoComparison
            before={{
              _id: "before-id",
              title: "Before",
              url: mockData.comparison.before,
            }}
            after={{
              _id: "after-id",
              title: "After",
              url: mockData.comparison.after,
            }}
          />
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
            image={mockData.hotspot.hotspotImage}
            hotspots={mockData.hotspot.hotspots}
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
          title={mockData.contact.title}
          cta={mockData.contact.cta}
          src={mockData.contact.src}
        />
      </FullWidthSection>

      {/* <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
        }}
      >
        <Column gap={2} sx={{ width: "100%" }}>
          <ComparisonSection
            title={mockData.comparison.title}
            description={mockData.comparison.description}
            before={mockData.comparison.before}
            after={mockData.comparison.after}
          />
        </Column>
      </FullWidthSection> */}

      {heroCarouselOpen && (
        <ImageCarousel
          images={mockData.hero.images}
          initialIndex={heroCarouselIndex}
          onClose={handleHeroCloseCarousel}
        />
      )}

      <Footer />

      {/* 
      <Column
        sx={{
          py: 6,
          px: {
            xs: 4,
            md: 2,
          },
          mx: "auto",
          maxWidth: 800,
          gap: 6,
        }}
      >
        <Column gap={2}>
          <Typography variant="h1">{project.title}</Typography>
          {project.intro && parsePortableText(project.intro)}
        </Column>

        <Column gap={1}>
          <Typography variant="h2">Gallery</Typography>
          {project.gallery && <PhotoGallerySection gallery={project.gallery} />}
        </Column>

        <Column gap={1}>
          <Typography variant="h2">The Story</Typography>
          {project.story && parsePortableText(project.story)}
        </Column>

        <Column gap={1}>
          <Typography variant="h2">Before & After</Typography>
          <Typography variant="body1">
            Swipe to see the before and after photos
          </Typography>
          {project.comparison?.before && project.comparison?.after && (
            <PhotoComparison
              before={project.comparison.before}
              after={project.comparison.after}
            />
          )}
        </Column>

        <Column gap={1}>
          <Typography variant="h2">Materials</Typography>
          <HotspotImage
            image={mockData.hotspotImage}
            hotspots={mockData.hotspots}
          />
        </Column>
      </Column>
      */}
    </>
  );
}

/*
export async function getStaticProps() {
  const query = `*[_type == "project"] | order(publishedAt desc)[0]{
    title,
    rooms,
    slug,
    publishedAt,
    intro,
    story,
    "hero": hero[]->{
      _id,
      title,
      "url": image.asset->url,
      rows,
      cols
    },
    "gallery": gallery[]->{
      _id,
      title,
      "url": image.asset->url,
      rows,
      cols
    },
    "comparison": {
      "before": comparison.before->{
        _id,
        title,
        "url": image.asset->url
      },
      "after": comparison.after->{
        _id,
        title,
        "url": image.asset->url
      }
    }
  }`;
  const project = await client.fetch(query);
  return { props: { project } };
}
  */

// TODO: add anything for the page metadata (SEO, etc)
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
    title: "Ready to transform your dream space?",
    description: "Schedule a free consultation",
    before: "/dark_academia/IMG_3265_2x.jpeg",
    after: "/dark_academia/IMG_1234.jpeg",
  },
  hotspot: {
    hotspotImage: "/dark_academia/IMG_0020.jpeg",
    hotspots: [
      {
        title: "Cabinets",
        description:
          "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
        x: 100,
        y: 100,
      },
      {
        title: "Counter",
        description:
          "To balance the dark base and incorporate the surrounding color palette, we chose a stunning Calacatta Miraggio quartz countertop with subtle gold and grey veining.",
        x: 100,
        y: 500,
      },
      {
        title: "Appliances",
        description:
          "We chose the six-burner black and gold gas range with convection oven from Zline, and coupled it with the same Calacatta Miraggio quartz backsplash and brass pulls from the island to make the whole space look cohesive.",
        x: 1000,
        y: 100,
      },
      {
        title: "Cabinets",
        description:
          "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
        x: 1000,
        y: 500,
      },
    ],
  },
  contact: {
    title: "Ready to transform your dream space?",
    cta: "Schedule a free consultation",
    src: "/dark_academia/shady_glen_sketch.png",
  },
};
