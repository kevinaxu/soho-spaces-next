import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { client } from "../src/sanity/client";
import type { PortableTextBlock } from "@portabletext/types";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    title: "Mountain",
  },
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Forest",
  },
  {
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    title: "Beach",
  },
  {
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Desert",
  },
  {
    img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
    title: "City",
  },
  {
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Desert",
  },
];

const gallery = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
];

const quiltedTemplate = [
  { rows: 2, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 2 },
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const quiltedItemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    rows: 1,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    rows: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    rows: 1,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    rows: 1,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 1,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    rows: 1,
    cols: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    rows: 1,
    cols: 2,
  },
];

const layoutTemplates: { rows: number; cols: number }[][] = [
  [
    { rows: 1, cols: 2 },
    { rows: 1, cols: 1 },
    { rows: 1, cols: 1 },
    { rows: 1, cols: 2 },
  ],
];

interface Post {
  title: string;
  body: PortableTextBlock[];
}

export default function Home({ post }: { post: Post }) {
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      {/* Title */}
      <Typography variant="h2" component="h1" gutterBottom>
        {post.title}
      </Typography>

      {/* Quilted ImageList - 4 columns */}
      <Typography variant="h3" component="h1">
        Mobile Layout 1
      </Typography>
      <ImageList variant="quilted" gap={12} cols={2} rowHeight={250}>
        {[
          {
            img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            title: "Breakfast",
            rows: 1,
            cols: 2,
          },
          {
            img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            title: "Burger",
            rows: 0.75,
            cols: 1,
          },
          {
            img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            title: "Camera",
            rows: 0.75,
          },
          {
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            title: "Coffee",
            rows: 1.5,
            cols: 2,
          },
          {
            img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            title: "Hats",
            rows: 1,
            cols: 2,
          },
          {
            img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            title: "Honey",
            author: "@arwinneil",
            rows: 1,
            cols: 1,
          },
          {
            img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
            title: "Basketball",
            rows: 1,
            cols: 1,
          },
          {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
            rows: 1,
            cols: 2,
          },
        ].map((item, idx) => (
          <ImageListItem
            key={item.img}
            cols={item.cols}
            rows={item.rows}
            onClick={() => {}}
            sx={{ cursor: "pointer" }}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Typography variant="h3" component="h1">
        Mobile Layout 2
      </Typography>
      <ImageList variant="quilted" gap={8} cols={2} rowHeight={150}>
        {[
          {
            img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            title: "Breakfast",
            rows: 2,
          },
          {
            img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            title: "Burger",
            rows: 1,
          },
          {
            img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            title: "Camera",
            rows: 1,
          },
          {
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            title: "Coffee",
            rows: 1,
          },
          {
            img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            title: "Honey",
            author: "@arwinneil",
            rows: 2,
          },
          {
            img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            title: "Hats",
            rows: 1,
          },
        ].map((item, idx) => (
          <ImageListItem
            key={item.img}
            rows={item.rows}
            cols={1}
            onClick={() => {}}
            sx={{ cursor: "pointer" }}
          >
            <img
              {...srcset(item.img, 121, item.rows, 1)}
              alt={item.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Desktop */}
      {/* <ImageList variant="quilted" gap={12} cols={4} rowHeight={250}>
        {quiltedItemData.map((item, idx) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            onClick={() => handleImageClick(idx)}
            sx={{ cursor: "pointer" }}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    </Box>
  );
}

export async function getStaticProps() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0]{
    title,
    slug,
    publishedAt,
    "imageUrl": image.asset->url,
    body
  }`;
  const post = await client.fetch(query);
  return {
    props: {
      post,
      message:
        "This page was generated at build time using getStaticProps. derrrrr whatup",
    },
  };
}
