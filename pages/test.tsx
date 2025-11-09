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

const HOTSPOT_SIZE = 12;
const LINE_THICKNESS = 3; // vertical line width & horizontal line height
const VERTICAL_LINE_HEIGHT = 50;
const HORIZONTAL_LINE_WIDTH = 150;

function HotspotImage({ image, hotspots }: HotspotImageProps) {
  const [isActive, setIsActive] = useState(false);

  // todo: make this dynmaic
  const hotspotTop = 100;
  const hotspotLeft = 100;

  const verticalLineTop = hotspotTop + HOTSPOT_SIZE / 2;
  const verticalLineLeft = hotspotLeft + HOTSPOT_SIZE / 2;
  const horizontalLineTop = verticalLineTop + VERTICAL_LINE_HEIGHT;
  const horizontalLineLeft = verticalLineLeft;
  const tooltipTop = hotspotTop;
  const tooltipLeft = horizontalLineLeft + HORIZONTAL_LINE_WIDTH;

  return (
    <Row sx={{ justifyContent: "center" }}>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Box
          component="img"
          src={image}
          alt="Interactive"
          sx={{
            objectFit: "cover",
            display: "block",
            position: "relative",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          }}
        />

        {/* hotspot */}
        <Box
          sx={{
            position: "absolute",
            top: hotspotTop,
            left: hotspotLeft,
            zIndex: 3,
          }}
        >
          <Box
            onClick={() => setIsActive(!isActive)}
            sx={{
              width: HOTSPOT_SIZE,
              height: HOTSPOT_SIZE,
              borderRadius: "50%",
              backgroundColor: "gray",
              border: "2px solid white", // hardcoded
              cursor: "pointer",
              userSelect: "none",
            }}
          />
        </Box>

        {isActive && (
          <>
            {/* Vertical line */}
            <Box
              sx={{
                position: "absolute",
                top: verticalLineTop,
                left: verticalLineLeft,
                width: LINE_THICKNESS,
                height: 0,
                backgroundColor: "#f1eeed",
                zIndex: 1,
                animation: "grow-vertical 0.2s ease-out forwards",
                "@keyframes grow-vertical": {
                  to: { height: VERTICAL_LINE_HEIGHT },
                },
              }}
            />
            {/* Horizontal line */}
            <Box
              sx={{
                position: "absolute",
                top: horizontalLineTop,
                left: horizontalLineLeft,
                width: 0,
                height: LINE_THICKNESS,
                backgroundColor: "#f1eeed",
                zIndex: 1,
                animation: "grow-horizontal 0.2s ease-out forwards",
                animationDelay: "0.2s",
                "@keyframes grow-horizontal": {
                  to: { width: HORIZONTAL_LINE_WIDTH },
                },
              }}
            />

            {/* Tooltip */}
            <Box
              sx={{
                position: "absolute",
                top: tooltipTop,
                left: tooltipLeft,
                borderRadius: "4px",
                maxWidth: 500,
                backgroundColor: "#f1eeed",
                padding: 2,
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                zIndex: 2,
                opacity: 0,
                transform: "translateY(10px)",
                animation: "fade-in-tooltip 0.2s ease-out forwards",
                animationDelay: "0.4s",
                "@keyframes fade-in-tooltip": {
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Column gap={1}>
                <Typography sx={{ fontStyle: "italic" }}>Cabinets</Typography>
                <Typography color="text.secondary">
                  For the opposite wall, we wanted it to be a softer Gothic
                  style while still being dramatic, so we chose the elegant
                  floor-to-ceiling Escada cabinets and matched them to the
                  greige walls to make the space look even taller
                </Typography>
              </Column>
            </Box>
          </>
        )}
      </Box>
    </Row>
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
