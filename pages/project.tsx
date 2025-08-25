import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageCarousel from "../src/components/ImageCarousel";
// import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { client } from "../src/sanity/client";
import { parsePortableText } from "../src/utils/portableTextParser";
import type { PortableTextBlock } from "@portabletext/types";
import QuiltedGallery from "../src/components/QuiltedGallery";
import HeroGallery from "../src/components/HeroGallery";
import PhotoComparison from "../src/components/PhotoComparison";

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
      {/* <Header /> */}
      {project.hero && (
        <HeroGallery
          hero={project.hero}
          handleImageClick={handleHeroImageClick}
        />
      )}

      <Box
        sx={{
          py: 6,
          px: 2,
          maxWidth: 800,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h1">{project.title}</Typography>

        {/* Intro */}
        {project.intro && parsePortableText(project.intro)}

        {/* Quilted gallery */}
        <Typography variant="h2">Gallery</Typography>
        {project.gallery && (
          <QuiltedGallery
            gallery={project.gallery}
            handleImageClick={handleGalleryImageClick}
          />
        )}

        {/* Story */}
        <Typography variant="h2">The Story</Typography>
        {project.story && parsePortableText(project.story)}

        {/* Before/After */}
        <Typography variant="h2">Before & After</Typography>
        {project.comparison?.before && project.comparison?.after && (
          <PhotoComparison
            before={project.comparison.before}
            after={project.comparison.after}
          />
        )}

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
      </Box>

      <Footer />
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
