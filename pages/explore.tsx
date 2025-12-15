import Box from "@mui/material/Box";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PhotoAlbum from "react-photo-album";

import "react-photo-album/styles.css";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { client } from "@/src/sanity/client";

interface SanityImage {
  _type: "image";
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
      lqip?: string;
      blurHash?: string;
    };
  };
}

interface ExplorePhoto {
  _id: string;
  title: string;
  image: SanityImage;
  labels?: string[];
  priority: number;
  project?: {
    _id: string;
    title: string;
  };
}

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

export default function ExplorePage({ photos }: { photos: ExplorePhoto[] }) {
  const mergedPhotos = photos.map(transformPhoto);

  console.log("dumping photos", JSON.stringify(mergedPhotos[0], null, 2));

  return (
    <>
      <Header sticky={true} transparent />

      <Box sx={{ width: "100%", mx: "auto", px: 2, paddingBottom: 2 }}>
        <PhotoAlbum
          photos={mergedPhotos}
          layout="columns"
          columns={3}
          spacing={16}
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
