import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { Masonry } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { FullWidthSection } from "@/src/components/Section";
import StickyBox from "@/src/components/StickyBox";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import ExploreSection from "@/src/pages/home/ExploreSection";

import { Row, Column } from "../src/components/Layout";

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />

      <FullWidthSection
        sx={{
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
          py: {
            xs: 2,
            md: PADDING_X_SECTION,
          },
        }}
      >
        <HotspotImage
          image={mockData.hotspotImage}
          hotspots={mockData.hotspots}
        />
      </FullWidthSection>

      <Footer />
    </>
  );
}

interface Hotspot {
  title: string;
  description: string;
  position: {
    x: number;
    y: number;
  };
}

interface HotspotImageProps {
  image: string;
  hotspots: Hotspot[];
}

function HotspotImage({ image, hotspots }: HotspotImageProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Row
        sx={{
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={image}
          alt="Interactive"
          sx={{
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* this is the hotspot */}
        <Box
          sx={{
            position: "absolute",
            top: "100px",
            left: "100px",
            // transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            onClick={() => setIsActive(!isActive)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "gray",
              border: "2px solid white",
              cursor: "pointer",
            }}
          />
        </Box>

        {/* this is the tooltip that gets displayed */}
        {isActive && (
          <Box
            sx={{
              position: "absolute",
              top: "150px",
              left: "250px",
              borderRadius: "2px",
              maxWidth: "500px",
              backgroundColor: "#f1eeed",
              padding: 2,
            }}
          >
            <Column gap={1}>
              <Typography sx={{ fontStyle: "italic" }}>Cabinets</Typography>
              <Typography color="text.secondary">
                For the opposite wall, we wanted it to be a softer Gothic style
                while still being dramatic, so we chose the elegant
                floor-to-ceiling Escada cabinets and matched them to the greige
                walls to make the space look even taller
              </Typography>
            </Column>
          </Box>
        )}
      </Row>
    </>
  );
}

const mockData = {
  hotspotImage: "/IMG_0965.jpeg",
  hotspots: [
    {
      title: "Cabinets",
      description:
        "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
      position: {
        x: 50,
        y: 50,
      },
    },
  ],
};
