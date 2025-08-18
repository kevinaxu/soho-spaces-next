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
import { client } from "../src/sanity/client";
import { parsePortableText } from "../src/utils/portableTextParser";
import type { PortableTextBlock } from "@portabletext/types";

interface Post {
  title: string;
  intro?: PortableTextBlock[];
  story?: PortableTextBlock[];
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

export default function Home({ post }: { post: Post }) {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCarouselIndex(index);
    setCarouselOpen(true);
  };
  const handleCloseCarousel = () => setCarouselOpen(false);

  return (
    <Box
      sx={{
        // p: 4,
        py: 6, // adds padding-top and padding-bottom
        px: 4, // optional: horizontal padding
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      {/* Title */}
      <Typography variant="h1">{post.title}</Typography>

      {/* Intro */}
      {post.intro && parsePortableText(post.intro)}

      {/* Quilted ImageList */}
      <Typography variant="h2">The Details</Typography>
      {post.gallery && (
        <ImageList variant="quilted" gap={8} cols={4} rowHeight={250}>
          {post.gallery.map((item, idx) => (
            <ImageListItem
              key={item._id}
              cols={item.cols || 1}
              rows={item.rows || 1}
              onClick={() => handleImageClick(idx)}
              sx={{ cursor: "pointer" }}
            >
              <img src={item.url} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* The Story */}
      <Typography variant="h2">The Story</Typography>

      {/* Before/After slider */}
      {post.story && parsePortableText(post.story)}
      {post.comparison?.before && post.comparison?.after && (
        <Box sx={{ width: "100%", pt: 2, pb: 4 }}>
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={post.comparison.before.url}
                alt="Before"
                style={{ width: "100%", height: 600, objectFit: "cover" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={post.comparison.after.url}
                alt="After"
                style={{ width: "100%", height: 600, objectFit: "cover" }}
              />
            }
            handle={
              <ReactCompareSliderHandle
                buttonStyle={{
                  width: 40,
                  height: 40,
                  backdropFilter: undefined,
                  WebkitBackdropFilter: undefined,
                  backgroundColor: "white",
                  color: "#444",
                  boxShadow: undefined,
                  border: 0,
                }}
                linesStyle={{
                  width: 8,
                  backgroundColor: "white",
                }}
              />
            }
          />
        </Box>
      )}

      {/* Render Carousel if open */}
      {carouselOpen && (
        <ImageCarousel
          images={post.gallery?.map((i) => i.url) || []}
          initialIndex={carouselIndex}
          onClose={handleCloseCarousel}
        />
      )}
    </Box>
  );
}

// This runs at build time
export async function getStaticProps() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0]{
    title,
    slug,
    publishedAt,
    intro,
    story,
    "gallery": gallery[]->{
        _id,
        title,
        "url": file.asset->url,
        rows,
        cols
    },
    "comparison": {
        "before": comparison.before->{
        _id,
        title,
        "url": file.asset->url
        },
        "after": comparison.after->{
        _id,
        title,
        "url": file.asset->url
        }
    }
  }`;
  const post = await client.fetch(query);

  // manually set rows / cols for now
  // eventually this would be dynamic based on the number
  // of elements in gallery
  post.gallery[0].rows = 2;
  post.gallery[0].cols = 2;
  post.gallery[3].cols = 2;

  return {
    props: {
      post,
    },
  };
}
