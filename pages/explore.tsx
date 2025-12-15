import { Box } from "@mui/material";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import PageMeta from "@/src/components/PageMeta";
import { PAGES } from "@/src/constants";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { client } from "@/src/sanity/client";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

interface ExplorePhoto {
  _id: string;
  title: string;
  image: SanityImage;
  labels?: string[];
  project?: {
    _id: string;
    title: string;
  };
}

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

const BREAKPOINTS = [1080, 640, 384, 256, 128, 96, 64, 48];
const LIGHTBOX_WIDTH = 2400;
const DEFAULT_IMAGE_WIDTH = 1440;

export default function ExplorePage({ photos }: { photos: ExplorePhoto[] }) {
  const [index, setIndex] = useState(-1);
  const isMobile = useIsMobile();
  const mergedPhotos = photos.map(transformPhoto);

  return (
    <>
      <Header sticky={true} transparent />

      <PageMeta
        title="Explore Our Projects | Soho Spaces"
        description="Soho Spaces is a full-service interior design studio in Atlanta, specializing in modern, timeless interiors tailored to each client's story."
        url={PAGES.home}
        pageType="home"
      />

      <Box
        sx={{
          width: "100%",
          mx: "auto",
          px: {
            xs: 1,
            lg: 2,
          },
          paddingBottom: {
            xs: 1,
            lg: 2,
          },
        }}
      >
        <PhotoAlbum
          photos={mergedPhotos}
          layout="columns"
          columns={isMobile ? 2 : 3}
          spacing={isMobile ? 8 : 16}
          onClick={({ index }) => setIndex(index)}
        />
      </Box>

      <Lightbox
        slides={mergedPhotos.map((p) => ({
          src: isMobile ? p.src : p.lightboxSrc, // use high-res only on desktop
          //   title: p.title, // used for captions
        }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />

      <Footer />
    </>
  );
}

function transformPhoto(photo: ExplorePhoto) {
  const metadata = photo.image.asset.metadata;
  const { width: originalWidth, height: originalHeight } = metadata.dimensions;

  const mainHeight = Math.round(
    (originalHeight / originalWidth) * DEFAULT_IMAGE_WIDTH
  );

  const srcSet = BREAKPOINTS.map((w) => {
    const h = Math.round((originalHeight / originalWidth) * w);
    return {
      src: urlFor(photo.image).width(w).url()!,
      width: w,
      height: h,
    };
  });

  return {
    // Sanity metadata
    _id: photo._id,
    title: photo.title,
    labels: photo.labels,
    project: photo.project,

    // Photo Album metadata
    src: urlFor(photo.image).width(DEFAULT_IMAGE_WIDTH).url()!,
    srcSet,
    width: DEFAULT_IMAGE_WIDTH,
    height: mainHeight,

    // Lightbox
    lightboxSrc: urlFor(photo.image).width(LIGHTBOX_WIDTH).url(),
  };
}

export const getStaticProps = async () => {
  const photos = await client.fetch(`
    *[_type == "photo" && isHidden != true]
        | order(priority asc, _createdAt desc) {
        _id,
        title,
        image{
            ...,
            asset->
        },
        labels,
        priority,
        project->{
            _id,
            title
        }
    }
`);

  return {
    props: { photos },
  };
};
