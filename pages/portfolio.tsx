import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Grid from "@mui/material/Grid";
import { Row, Column } from "../src/components/Layout";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import styles from "@/styles/projectImage.module.css";

interface Project {
  title: string;
  img: string;
}

export default function PortfolioPage({ projects }: { projects: Project[] }) {
  return (
    <>
      <Header sticky={true} />

      {/* this is the main table shell */}
      <Column
        sx={{
          py: {
            xs: 2,
            md: 4,
          },
          px: 2,
          maxWidth: 1200,
          mx: "auto",
          gap: 3,
        }}
      >
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid
            container
            columnSpacing={4}
            rowSpacing={{
              xs: 4,
              md: 8,
            }}
          >
            {projects.map((project, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Column>
                  {/* Image with hover trim effect */}
                  <Box
                    className={styles.containerBlock}
                    sx={{ width: 350, height: 500, position: "relative" }}
                  >
                    <Box
                      component="img"
                      src={project.img}
                      alt={project.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <Box className={styles.innerBlock}>
                      <Box className={styles.sliderTopRight} />
                    </Box>
                  </Box>
                  <Row
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Typography variant="body1">{project.title}</Typography>
                    <ArrowRightAltIcon />
                  </Row>
                </Column>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Column>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const projects = [
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
    // second four
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
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
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
  ];

  return { props: { projects } };
}
