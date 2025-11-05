import { useState, useEffect } from "react";
import StickyBox from "@/src/components/StickyBox";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import {
  Box,
  Grid,
  Typography,
  Fade,
  Stack,
  useMediaQuery,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Row, Column } from "../src/components/Layout";
import { FullWidthSection } from "@/src/components/Section";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Masonry } from "@mui/lab";
import ExploreSection from "@/src/pages/home/ExploreSection";

const DESKTOP_EXPLORE_PROJECTS_SECTION_HEIGHT = "800px";
const DESKTOP_SPACING = 2;

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />

      {/* <FullWidthSection
        sx={{
          alignItems: "center",
          backgroundColor: "#f1eeed",
          px: {
            xs: 0,
            md: 2,
          },
          py: {
            xs: 0,
            md: 2,
          },
        }}
      >
        <ExploreSection images={mockData.explore} />
      </FullWidthSection> */}

      <Footer />
    </>
  );
}

const mockData = {
  featuredProject: [
    {
      src: "/IMG_0008.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0002_landscape.jpeg",
      title: "Hand-painted umbrellas",
      subtitle: "Chiang Mai, Thailand",
    },
    {
      src: "/IMG_0017.jpeg",
      title: "Watercolor scroll",
      subtitle: "Guangzhou, China",
    },
  ],
  services: [
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
  ],
  explore: [
    {
      src: "/IMG_0002_landscape.jpeg",
      title: "Hand-painted umbrellas",
      subtitle: "Chiang Mai, Thailand",
    },
    {
      src: "/IMG_0004.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0008.jpeg",
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
  ],
};
