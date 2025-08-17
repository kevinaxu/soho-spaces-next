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


const beforeImage = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";
const afterImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

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
    <Box sx={{ width: "100%", height: 400 }} >
        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src={beforeImage} alt="Before"         style={{ width: "100%", height: 400, objectFit: "cover" }}
 />}
          itemTwo={<ReactCompareSliderImage src={afterImage} alt="After"         style={{ width: "100%", height: 400, objectFit: "cover" }}
 />}
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