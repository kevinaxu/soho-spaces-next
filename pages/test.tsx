import { useState, useEffect } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ProcessTimeline from "../src/components/ProcessTimeline";
import {
  Box,
  Typography,
  Fade,
  useMediaQuery,
  useTheme,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Column } from "../src/components/Layout";
import ImageCrossFade from "../src/components/ImageCrossFade";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ConstructionIcon from "@mui/icons-material/Construction";

const travelImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // ocean
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98", // mountain
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470", // desert
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", // city
  "https://images.unsplash.com/photo-1518684079-3c830dcef090", // temple
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // airplane
  "https://images.unsplash.com/photo-1500534623283-312aade485b7", // lake
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // airplane
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // beach
];

export default function HomePage({}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log("is mobile", isMobile);

  return (
    <>
      <Header sticky={false} />

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          py: 4,
          justifyContent: "center", // ✅ center content horizontally
          width: "100%",
          mx: "auto",
          position: "relative",
          bgcolor: "#e3e2dc",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* LEFT COLUMN (Sticky) */}
          <Box
            sx={{
              flex: { xs: "0 0 auto", md: "0 0 40%" },
              p: 4,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: theme.spacing(8),
                gap: 4,
              }}
            >
              <Typography variant="h2" gutterBottom>
                Designs inspired by the world.
              </Typography>
              <Typography color="text.secondary">
                Through our travels, we are able to incorporate unique looks and
                source uniue products.
              </Typography>
            </Box>
          </Box>

          {/* RIGHT COLUMN (3x3 Image Grid) */}
          <Box sx={{ flex: 1, p: 4 }}>
            <ImageList cols={3} gap={12}>
              {travelImages.map((src, i) => (
                <ImageListItem key={i}>
                  <img
                    src={`${src}?auto=format&fit=crop&w=400&h=600&q=80`}
                    alt={`Travel ${i + 1}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
      </Box>

      <Column
        sx={{
          py: 6,
          px: 2,
          mx: "auto",
          maxWidth: "1000px",
          gap: 3,
        }}
      >
        <ImageCrossFade images={images} />
      </Column>

      {/* <ProcessTimeline timelineData={timelineData} /> */}
      <Footer />
    </>
  );
}

const cards = [
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

const timelineData = [
  {
    title: "Design Consultation",
    icon: GroupsIcon,
    description: `The initial meeting will occur in your home to discuss your
      needs, desires, wish list, and budget, aiming to establish a
      vision for your residence. This two-hour session provides an
      opportunity for us to become acquainted and determine how we
      will transform your rooms into a seamlessly beautiful and
      functional home.`,
  },
  {
    title: "Design Proposal & Approval",
    icon: DriveFileRenameOutlineIcon,
    description: `With a finalized preliminary design plan that outlines the scope
      of work and budget, the next step is to create a legally binding
      Letter of Agreement tailored to your project. Upon the mutual
      signing of this document and the receipt of a retainer, we will
      commence the Planning Phase of your project.`,
  },
  {
    title: "Concept and Detailed Design",
    icon: TipsAndUpdatesIcon,
    description: `We kick off the design phase, diving into the creative process
      where our team gathers all those exciting design ideas we've
      been brewing. As construction is often a component, we meet with
      trades and contractors to validate the possibilities on your
      wish list. Subsequently, we source furnishings, finishes, and
      fixtures while concurrently developing the design plans, which
      you will have the opportunity to review in the next stage.`,
  },
  {
    title: "Presentation",
    icon: CoPresentIcon,
    description:
      "Once the design plan is finalized, we will present the reimagined rooms and the overall space, bringing it to life with detailed drawings, fabric swatches, and finish samples. Depending on the project's scale, phased presentations may be required. If any revisions or tweaks are requested, we'll meticulously fine-tune them by exploring alternatives, ensuring you end up with the perfect design plan that resonates with your preferences.",
  },
  {
    title: "Implementation",
    icon: ConstructionIcon,
    description:
      "It's ordering time! After you've given the green light to your design, we swing into action by reaching out to our suppliers and meticulously tracking timelines for smooth deliveries. In tandem with our contractor, we take charge of ensuring the flawless execution of the Design Plans. Consider this a stress-free zone for you, as we handle all the details and project manage the design and build process from start to finish.",
  },
];

const images = [
  "/emily_bedroom.png",
  "https://soho-spaces.com/assets/moody-romantic/IMG_0017.jpeg",
];
