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
import { FullWidthSection } from "../src/components/Section";
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
      {/* <Header sticky={false} /> */}

      <HeroImageSection ref={heroRef} />

      <StackedDeck cards={servicesSectionCards} />

      <FullWidthSection sx={{ bgcolor: "#e3e2dc", py: 12, px: 4 }}>
        <HomePageFeaturedProjectSection />
      </FullWidthSection>

      <Footer />
    </>
  );
}

const HeroImageSection = forwardRef<HTMLDivElement>((props, ref) => {
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
HeroImageSection.displayName = "HeroSection";

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
