import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Row, Column } from "../src/components/Layout";
import ImageCarousel from "../src/components/ImageCarousel";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { client } from "../src/sanity/client";
import { parsePortableText } from "../src/utils/portableTextParser";
import type { PortableTextBlock } from "@portabletext/types";
import QuiltedGallery from "../src/components/QuiltedGallery";
import HeroGallery from "../src/components/HeroGallery";
import PhotoComparison from "../src/components/PhotoComparison";
import HotspotImage from "../src/components/HotspotImage";

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

const hotspots = [
  {
    title: "Cabinets",
    description:
      "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
    percent: {
      x: 20,
      y: 25,
    },
  },
  {
    title: "Counter",
    description:
      "To balance the dark base and incorporate the surrounding color palette, we chose a stunning Calacatta Miraggio quartz countertop with subtle gold and grey veining.",
    percent: {
      x: 90,
      y: 80,
    },
  },
  {
    title: "Appliances",
    description:
      "We chose the six-burner black and gold gas range with convection oven from Zline, and coupled it with the same Calacatta Miraggio quartz backsplash and brass pulls from the island to make the whole space look cohesive.",
    percent: {
      x: 40,
      y: 60,
    },
  },
];
const hotspotImage =
  "https://soho-spaces.com/assets/modern-gothic/IMG_0965.jpeg";

export default function ProjectPage({ project }: { project: Project }) {
  // hero carousel
  const [heroCarouselOpen, heroSetCarouselOpen] = useState(false);
  const [heroCarouselIndex, heroSetCarouselIndex] = useState(0);
  const handleHeroImageClick = (index: number) => {
    heroSetCarouselIndex(index);
    heroSetCarouselOpen(true);
  };
  const handleHeroCloseCarousel = () => heroSetCarouselOpen(false);

  // photo galler carousel
  const [galleryCarouselOpen, gallerySetCarouselOpen] = useState(false);
  const [galleryCarouselIndex, gallerySetCarouselIndex] = useState(0);
  const handleGalleryImageClick = (index: number) => {
    gallerySetCarouselIndex(index);
    gallerySetCarouselOpen(true);
  };
  const handleGalleryCloseCarousel = () => gallerySetCarouselOpen(false);

  return (
    <>
      <Header sticky={true} />
      {project.hero && (
        <HeroGallery
          hero={project.hero}
          handleImageClick={handleHeroImageClick}
        />
      )}

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
        {/* Intro */}
        <Column gap={2}>
          <Typography variant="h1">{project.title}</Typography>
          {project.intro && parsePortableText(project.intro)}
        </Column>

        {/* Quilted gallery */}
        <Column gap={1}>
          <Typography variant="h2">Gallery</Typography>
          {project.gallery && (
            <QuiltedGallery
              gallery={project.gallery}
              handleImageClick={handleGalleryImageClick}
            />
          )}
        </Column>

        {/* Story */}
        <Column gap={1}>
          <Typography variant="h2">The Story</Typography>
          {project.story && parsePortableText(project.story)}
        </Column>

        {/* Before/After */}
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

        {/* Hotspot Image */}
        <Column gap={1}>
          <Typography variant="h2">Materials</Typography>
          <HotspotImage image={hotspotImage} hotspots={hotspots} />
        </Column>
      </Column>

      <Footer />

      {/* Carousels */}
      {heroCarouselOpen && project.hero && (
        <ImageCarousel
          images={project.hero}
          initialIndex={heroCarouselIndex}
          onClose={handleHeroCloseCarousel}
        />
      )}
      {galleryCarouselOpen && project.gallery && (
        <ImageCarousel
          images={project.gallery}
          initialIndex={galleryCarouselIndex}
          onClose={handleGalleryCloseCarousel}
        />
      )}
    </>
  );
}

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
