import { useState, useRef, useEffect, forwardRef } from "react";

import { urlFor } from "../src/utils/sanityImage";
import { Row, Column } from "../src/components/Layout";
import { Box, Typography, Divider } from "@mui/material";
import { client } from "../src/sanity/client";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import HeroGallery from "../src/components/HeroGallery";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { parsePortableText } from "../src/utils/portableTextParser";
import type { PortableTextBlock } from "@portabletext/types";

interface HomePageProps {
  title: string;
  about: PortableTextBlock[];
  aboutImage: Media;
  gallery: Media[];
}

interface Media {
  _id: string;
  title: string;
  url: string;
  rows?: number;
  cols?: number;
}

const aboutUs1 = `We believe good design is about creating a feeling. Whenever we design a place for ourselves, we first ask: how do I want to feel in this space? We love traveling, reading, and immersing ourselves in different cultures, so we frequently try to recreate a vibe or memory from somewhere we've been. Our goal is to do the same for you—to transport you to a feeling or place that will bring you comfort, but in a way that is authentic, intentional, and unique to you.`;
const aboutUs2 = `Because ultimately, we're not just designers, we're storytellers. We weave function, comfort, and mementos you've collected throughout your life to create a sense of place…and a space that is a reflection of who you are, where you've been, and what you love.`;

export default function HomePage({ page }: { page: HomePageProps }) {
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

      {/* <HeroSectionVideo /> */}
      <HeroSection ref={heroRef} />

      {/* this is the main table shell */}
      <Column
        sx={{
          py: 6,
          px: 2,
          maxWidth: 800,
          mx: "auto",
          gap: 3,
        }}
      >
        <QuoteSection />
        {page.about && (
          <AboutUsSection content={page.about} image={page.aboutImage} />
        )}
        {/* <TwoColumnSection /> */}
      </Column>

      {page.gallery && <HeroGallery hero={page.gallery} />}

      <Column
        sx={{
          py: 6,
          px: 2,
          maxWidth: 800,
          mx: "auto",
          gap: 3,
        }}
      >
        <TextSection />
      </Column>
      <Footer />
    </>
  );
}

function TextSection() {
  return (
    <Column paddingY={4} gap={2}>
      <Typography variant="h2">About Us</Typography>
      <Typography variant="body1">
        We believe good design is about creating a feeling. Whenever we design a
        place for ourselves, we first ask: how do I want to feel in this space?
        We love traveling, reading, and immersing ourselves in different
        cultures, so we frequently try to recreate a vibe or memory from
        somewhere weve been. Our goal is to do the same for you—to transport you
        to a feeling or place that will bring you comfort, but in a way that is
        authentic, intentional, and unique to you.
      </Typography>
    </Column>
  );
}

function TwoColumnSection() {
  return (
    <Row
      sx={{
        gap: 3,
        flexDirection: { xs: "column", md: "row" }, // stack on mobile
      }}
    >
      <Column sx={{ flex: 1 }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <img
            src={"https://soho-spaces.com/assets/home/sohail_sisters.jpeg"}
            alt=""
            style={{
              height: "100%", // fills column height
              width: "auto", // keeps aspect ratio
              objectFit: "cover",
              display: "block",
            }}
            loading="lazy"
          />
        </Box>
      </Column>

      <Column sx={{ flex: 2 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Second Column</Typography>
          <Typography>
            This is the second column. It will move below the first column on
            smaller screens.
          </Typography>
        </Box>
      </Column>
    </Row>
  );
}

function AboutUsSection({
  content,
  image,
}: {
  content: PortableTextBlock[];
  image: Media;
}) {
  const srcSet = ` ${urlFor(image.url).width(320).url()} 320w, $
{urlFor(image.url).width(480).url()} 480w, $
{urlFor(image.url).width(768).url()} 768w, $
{urlFor(image.url).width(1024).url()} 1024w, $
{urlFor(image.url).width(1600).url()} 1600w `;

  return (
    <Column
      sx={{
        py: 8,
        gap: 3,
      }}
    >
      <img
        src={urlFor(image.url).width(800).url()}
        // srcSet={srcSet}
        // sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={image.title}
        style={{
          height: "100%",
          width: "auto",
          objectFit: "cover",
          display: "block",
        }}
        loading="lazy"
      />
      <Typography variant="h2">About Us</Typography>
      {parsePortableText(content)}
      <Row
        sx={{
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Typography variant="body1">see more</Typography>
        <ArrowRightAltIcon />
      </Row>
    </Column>
  );
}

function QuoteSection() {
  return (
    <Column
      sx={{
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 3,
        py: 16,
      }}
    >
      <Typography
        component="blockquote"
        sx={{
          fontFamily: "serif",
          fontWeight: 400,
          lineHeight: 1.5,
          fontSize: {
            xs: "2rem", // mobile
            sm: "3rem", // tablets
            md: "3rem", // desktop
            lg: "4rem", // large screens
          },
          color: "#333",
          textAlign: "left",
          whiteSpace: "pre-line", // preserves custom line breaks
        }}
      >
        {`"Everything you love,
            collected and assembled in
            one place."`}
      </Typography>
      <Divider sx={{ width: "100%", borderColor: "#ccc" }} />
    </Column>
  );
}

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
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
HeroSection.displayName = "HeroSection";

function HeroSectionVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <source
          src="https://soho-spaces.com/assets/dark-academia/hero_video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <Row
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2, // padding for mobile
        }}
      >
        <HeroLogo />
      </Row>
    </Box>
  );
}

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

export async function getStaticProps() {
  const query = `*[_type == "home"] | order(publishedAt desc)[0]{
    title,
    publishedAt,
    about,
    "aboutImage": aboutImage->{
      _id,
      title,
      "url": image.asset->url
    },
    "gallery": gallery[]->{
      _id,
      title,
      "url": image.asset->url,
      rows,
      cols
    },
  }`;
  const page = await client.fetch(query);
  console.log("dumping page", JSON.stringify(page, null, 2));

  return { props: { page } };
}
