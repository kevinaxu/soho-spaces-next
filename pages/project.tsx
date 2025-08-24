import { useState } from "react";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import ImageCarousel from "../src/components/ImageCarousel";
import Header from "../src/components/Header";
import { client } from "../src/sanity/client";
import { parsePortableText } from "../src/utils/portableTextParser";
import type { PortableTextBlock } from "@portabletext/types";
import QuiltedGallery from "../src/components/QuiltedGallery";
import HeroGallery from "../src/components/HeroGallery";

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
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCarouselIndex(index);
    setCarouselOpen(true);
  };
  const handleCloseCarousel = () => setCarouselOpen(false);

  return (
    <>
      <Header />
      {project.hero && (
        <HeroGallery hero={project.hero} handleImageClick={handleImageClick} />
      )}

      <Box
        sx={{
          py: 6,
          px: 4,
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
            handleImageClick={handleImageClick}
          />
        )}

        {/* Story */}
        <Typography variant="h2">The Story</Typography>
        {project.story && parsePortableText(project.story)}

        {/* Before/After */}
        <Typography variant="h2">Before & After</Typography>
        {project.comparison?.before && project.comparison?.after && (
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={project.comparison.before.url}
                alt="Before"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={project.comparison.after.url}
                alt="After"
              />
            }
            handle={<ReactCompareSliderHandle />}
          />
        )}

        {/* Carousel modal */}
        {carouselOpen && (
          <ImageCarousel
            images={project.gallery?.map((i) => i.url) || []}
            initialIndex={carouselIndex}
            onClose={handleCloseCarousel}
          />
        )}
      </Box>
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
