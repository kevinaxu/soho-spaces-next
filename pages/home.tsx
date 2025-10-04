import { useState, useRef, useEffect, forwardRef } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ProcessTimeline from "../src/components/ProcessTimeline";
import TeamSection from "../src/components/TeamSection";
import {
  Box,
  Typography,
  Fade,
  useMediaQuery,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Row, Column } from "../src/components/Layout";
import ImageCrossFade from "../src/components/ImageCrossFade";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ConstructionIcon from "@mui/icons-material/Construction";
import StickyBox from "../src/components/StickyBox";
import { Section, FullWidthSection } from "../src/components/Section";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import StackedDeck from "../src/components/StackedDeck";

export default function HomePage({}) {
  const [sticky, setSticky] = useState<boolean | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {sticky && <Header sticky={sticky} />}

      <HomePageHeroImageSection ref={heroRef} />

      <StackedDeck cards={servicesSectionCards} />

      <FullWidthSection sx={{ bgcolor: "#e3e2dc", py: 12, px: 4 }}>
        <HomePageFeaturedProjectSection />
      </FullWidthSection>

      <FullWidthSection sx={{ bgcolor: "#073027", py: 12, px: 4 }}>
        <HomePageTestimonialSection />
      </FullWidthSection>

      <Section>
        <HomePageExploreProjectsSection />
      </Section>

      <Footer />
    </>
  );
}

function HomePageExploreProjectsSection() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <StickyBox leftWidth={"60%"} top={theme.spacing(12)}>
        <Column sx={{ alignItems: "flex-start", gap: 2, paddingX: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
            A Glimpse Into Our Projects
          </Typography>
          <Typography color="text.secondary">
            Dive into our portfolio and see the details that make each project
            unique
          </Typography>
          <Row
            sx={{
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                variant: "body1",
              }}
            >
              explore our projects
            </Typography>
            <ArrowRightAltIcon
              sx={{
                transform: {
                  xs: "scaleX(1.5)",
                  md: "scaleX(1.8)",
                },
              }}
            />
          </Row>
        </Column>
      </StickyBox>

      <Box sx={{ flex: 1, height: 1100, overflow: "hidden" }}>
        <ImageList variant="masonry" cols={2} gap={12}>
          {exploreSectionImages.map((item, i) => (
            <ImageListItem
              key={i}
              sx={{
                "&:hover .MuiImageListItemBar-root": { opacity: 1 },
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.subtitle}
                sx={{
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}

function HomePageTestimonialSection() {
  return (
    <Column
      sx={{
        width: "100%",
        maxWidth: "800px",
        gap: 2,
        alignItems: "center",
        mx: "auto",
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "footer.contrastText", fontStyle: "italic" }}
      >
        Testimonial
      </Typography>
      <Typography sx={{ color: "footer.contrastText" }}>
        “Gemma has been a wonderful help in the renovation of my central Bath
        apartment. Gemma has been professionally trained which I specifically
        wanted, as I had already interior design experience but needed some
        extra expert guidance. There were several space planning issues and her
        spatial planning was brilliant, so I had the confidence to buy furniture
        items that I knew would fit. Gemma sourced some AMAZING PIECES that I
        would never have found on my own.
      </Typography>
      <Typography sx={{ color: "footer.contrastText" }}>
        One of these was a rug that brought my whole scheme together
        brilliantly. I think that is a special talent to find something that
        integrates with all of someone’s personal items . The living space just
        looked fantastic after she added the rug! Gemma was super friendly and
        approachable and it was a real joy to work with her. She maintains a
        professional manner though in her work, maintains deadlines and you can
        tell she really cares about getting an excellent result. I’m looking
        forward to working with Gemma on future home projects and would highly
        recommend her to anyone!”
      </Typography>
      <Typography sx={{ color: "#f5945c", alignSelf: "flex-start" }}>
        Korbinian Scheitzach, CEO ViscoTec America
      </Typography>
    </Column>
  );
}

const HomePageHeroImageSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Row
      ref={ref}
      sx={{
        height: "100vh", // full viewport height
        width: "100vw", // full width
        backgroundImage:
          "url('https://soho-spaces.com/assets/modern-gothic/IMG_0965.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeroLogo />
    </Row>
  );
});
HomePageHeroImageSection.displayName = "HeroSection";

function HeroLogo() {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        color: "#fff",
        fontWeight: "bold",
        fontSize: {
          xs: "2rem",
          sm: "4rem",
          md: "8rem",
        },
        letterSpacing: {
          xs: "1rem",
          sm: "1rem",
          md: "2rem",
        },
        textAlign: "center",
        textTransform: "uppercase",
      }}
    >
      SOHO SPACES
    </Typography>
  );
}

function HomePageFeaturedProjectSection() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <ImageList cols={1} gap={16} rowHeight={500}>
          {featuredProjectSectionImages.map((item, i) => (
            <ImageListItem
              key={i}
              sx={{
                "&:hover .MuiImageListItemBar-root": { opacity: 1 },
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.subtitle}
                sx={{
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <StickyBox leftWidth={"60%"} top={theme.spacing(12)}>
        <Column sx={{ alignItems: "flex-start", gap: 2, paddingX: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
            Dark Academia Living Room
          </Typography>
          <Typography color="text.secondary">
            When we asked Kevin to tell us about a place that brought back good
            memories and made him feel at ease, he began describing the Sterling
            Memorial Library at Yale University. It's where he used to spend
            many late nights listening to music while studying or reading a
            book. He loved the Gothic architecture and how the stained glass
            windows cast colorful patterns across the floors.
          </Typography>
          <Row
            sx={{
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                variant: "body1",
              }}
            >
              see the project
            </Typography>
            <ArrowRightAltIcon
              sx={{
                transform: {
                  xs: "scaleX(1.5)",
                  md: "scaleX(1.8)",
                },
              }}
            />
          </Row>
        </Column>
      </StickyBox>
    </Box>
  );
}

const featuredProjectSectionImages = [
  {
    src: "https://soho-spaces.com/assets/dark-academia/chair2.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0003.jpeg",
    title: "Hand-painted umbrellas",
    subtitle: "Chiang Mai, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0006.jpeg",
    title: "Watercolor scroll",
    subtitle: "Guangzhou, China",
  },
];

const servicesSectionCards = [
  {
    numberText: "04 / 04",
    title: "Content Creation",
    bg: "#bab2a3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "03 / 04",
    title: "Brand Strategy",
    bg: "#c8c0b3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "02 / 04",
    title: "Video Strategy",
    bg: "#d9d3ca",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "01 / 04",
    title: "Video Production",
    bg: "#f1eeed",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
];

const exploreSectionImages = [
  {
    src: "https://soho-spaces.com/assets/east-meets-west/IMG_0002_landscape.jpeg",
    title: "Hand-painted umbrellas",
    subtitle: "Chiang Mai, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/gingkos-and-greys/IMG_0004.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0008.jpeg",
    title: "Watercolor scroll",
    subtitle: "Guangzhou, China",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0021.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/muted-mediterranean/IMG_0013.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/muted-mediterranean/IMG_0011.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/muted-mediterranean/IMG_3699.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/east-meets-west/IMG_9480.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/east-meets-west/IMG_9474.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
];
