import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Publicly hosted images from Unsplash
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

const quiltedItemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
];

const beforeImage = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";
const afterImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Home({ message }: { message: string }) {
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
        Modern Gothic Bedroom
      </Typography>

      {/* Quilted ImageList */}
      <ImageList
        variant="quilted"
        gap={12}
        cols={4}
        rowHeight={250}
      >
        {quiltedItemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Intro paragraph */}
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        vulputate, quam id luctus convallis, velit nisl vestibulum libero, ut
        lacinia sem arcu in nisi. Suspendisse potenti.
      </Typography>

      {/* ImageList */}
      <ImageList cols={2} rowHeight={250} gap={12}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=500&h=250&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=500&h=250&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Outro paragraph */}
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        consectetur dolor in justo tristique, vitae hendrerit nunc sollicitudin.
        Fusce in augue nec lorem fermentum tincidunt a in nunc.
      </Typography>

      {/* React Compare Slider */}
      <Box sx={{ width: "100%", height: 400 }}>
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={beforeImage}
              alt="Before"
              style={{ width: "100%", height: 400, objectFit: "cover" }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={afterImage}
              alt="After"
              style={{ width: "100%", height: 400, objectFit: "cover" }}
            />
          }
          handle={
            <ReactCompareSliderHandle
              buttonStyle={{
                backdropFilter: undefined,
                WebkitBackdropFilter: undefined,
                backgroundColor: "white",
                color: "#444",
                boxShadow: undefined,
                border: 0,
              }}
            />
          }
        />
      </Box>
    </Box>
  );
}

// This runs at build time
export async function getStaticProps() {
  return {
    props: {
      message:
        "This page was generated at build time using getStaticProps. derrrrr whatup",
    },
  };
}