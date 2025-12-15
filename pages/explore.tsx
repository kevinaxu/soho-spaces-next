import { Box } from "@mui/material";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PhotoAlbum from "react-photo-album";

import "react-photo-album/styles.css";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import PageMeta from "@/src/components/PageMeta";
import { PAGES } from "@/src/constants";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { client } from "@/src/sanity/client";

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

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

export default function ExplorePage({ photos }: { photos: ExplorePhoto[] }) {
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
        />
      </Box>

      <Footer />
    </>
  );
}

function transformPhoto(photo: ExplorePhoto) {
  const metadata = photo.image.asset.metadata;
  const { width: originalWidth, height: originalHeight } = metadata.dimensions;

  const mainWidth = 1440;
  const mainHeight = Math.round((originalHeight / originalWidth) * mainWidth);

  const srcSet = breakpoints.map((w) => {
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
    priority: photo.priority,
    project: photo.project,
    // PhotoAlbum data
    src: urlFor(photo.image).width(mainWidth).url()!,
    srcSet,
    width: mainWidth,
    height: mainHeight,
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
