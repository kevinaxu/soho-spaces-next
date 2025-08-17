import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";

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

export default function Home({ message }: { message: string }) {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3, maxWidth: 800, mx: "auto" }}>
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
        consectetur dolor in justo tristique, vitae hendrerit nunc
        sollicitudin. Fusce in augue nec lorem fermentum tincidunt a in nunc.
      </Typography>
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