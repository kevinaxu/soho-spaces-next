import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { Masonry } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect, useRef } from "react";

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
  x: number;
  y: number;
}

interface HotspotImageProps {
  image: string;
  hotspots: Hotspot[];
}

const HOTSPOT_SIZE = 12;
const LINE_THICKNESS = 3; // vertical line width & horizontal line height
const VERTICAL_LINE_HEIGHT = 50;
const HORIZONTAL_LINE_WIDTH = 150;

// Determine quadrant
interface Props {
  hotspot: {
    title: string;
    description: string;
    x: number; // pixels
    y: number; // pixels
  };
  image: {
    width: number;
    height: number;
  };
}

function HotspotImage({ image, hotspots }: HotspotImageProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleClick = (idx: number) => {
    setActiveIdx(idx === activeIdx ? null : idx);
  };
  const handleNext = () => {
    if (activeIdx === null) {
      setActiveIdx(0);
    } else {
      setActiveIdx((activeIdx + 1) % hotspots.length);
    }
  };
  const handlePrev = () => {
    if (activeIdx === null) {
      setActiveIdx(hotspots.length - 1);
    } else {
      setActiveIdx((activeIdx - 1 + hotspots.length) % hotspots.length);
    }
  };

  // Measure image once after mount
  useEffect(() => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      setImageSize({ width: rect.width, height: rect.height });
      console.log("image rect", rect);
    }
  }, []); // empty dependency → runs once

  return (
    <Row sx={{ justifyContent: "center" }}>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        {/* Background Image */}
        <Box
          ref={imgRef}
          component="img"
          src={image}
          alt="Interactive"
          sx={{
            zIndex: 0,
            objectFit: "cover",
            display: "block",
            position: "relative",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          }}
        />
        {hotspots.map((hotspot, idx) => {
          const isActive = idx === activeIdx;
          return (
            <>
              <Box
                key={idx}
                sx={{
                  position: "absolute",
                  top: hotspot.y,
                  left: hotspot.x,
                  zIndex: 3,
                }}
              >
                <Box
                  onClick={() => handleClick(idx)}
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
                  <VerticalLine hotspot={hotspot} image={imageSize} />
                  <HorizontalLine hotspot={hotspot} image={imageSize} />
                  <TooltipCard hotspot={hotspot} image={imageSize} />
                </>
              )}
            </>
          );
        })}
        <Controls handleNext={handleNext} handlePrev={handlePrev} />
      </Box>
    </Row>
  );
}

function VerticalLine({ hotspot, image }: Props) {
  // TOP TO BOTTOM
  if (isTop({ hotspot, image })) {
    const verticalLineTop = hotspot.y + HOTSPOT_SIZE / 2;
    const verticalLineLeft = hotspot.x + HOTSPOT_SIZE / 2;
    return (
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
    );
  } else {
    console.log("rendering vertical line from bottom");
    const verticalLineTop = hotspot.y + HOTSPOT_SIZE / 2;
    const verticalLineLeft = hotspot.x + HOTSPOT_SIZE / 2;
    <Box
      sx={{
        position: "absolute",
        bottom: `calc(${image.height - hotspot.y}px - ${HOTSPOT_SIZE / 2}px)`, // fixed at hotspot
        left: verticalLineLeft,
        width: LINE_THICKNESS,
        height: 0, // start collapsed
        backgroundColor: "#f1eeed",
        zIndex: 1,
        animation: "grow-vertical-up 0.2s ease-out forwards",
        "@keyframes grow-vertical-up": {
          to: { height: VERTICAL_LINE_HEIGHT }, // grows upwards
        },
      }}
    />;
  }
}

function HorizontalLine({ hotspot, image }: Props) {
  // LEFT TO RIGHT
  if (isLeft({ hotspot, image })) {
    const verticalLineTop = hotspot.y + HOTSPOT_SIZE / 2;
    const verticalLineLeft = hotspot.x + HOTSPOT_SIZE / 2;
    const horizontalLineTop = verticalLineTop + VERTICAL_LINE_HEIGHT;
    const horizontalLineLeft = verticalLineLeft;
    return (
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
    );
  }
}

function TooltipCard({ hotspot, image }: Props) {
  if (isTop({ hotspot, image }) && isLeft({ hotspot, image })) {
    const verticalLineLeft = hotspot.x + HOTSPOT_SIZE / 2;
    const horizontalLineLeft = verticalLineLeft;
    const tooltipTop = hotspot.y;
    const tooltipLeft = horizontalLineLeft + HORIZONTAL_LINE_WIDTH;
    return (
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
          <Typography sx={{ fontStyle: "italic" }}>{hotspot.title}</Typography>
          <Typography color="text.secondary">{hotspot.description}</Typography>
        </Column>
      </Box>
    );
  }
}

function Controls({
  handleNext,
  handlePrev,
}: {
  handleNext: () => void;
  handlePrev: () => void;
}): React.JSX.Element {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        right: 16,
        display: "flex",
        gap: 0,
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          bgcolor: "transparent",
          color: "white",
          p: 0.5,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)", // subtle hover
          },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 32 }} />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          bgcolor: "transparent",
          color: "white",
          p: 0.5,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
}

const mockData = {
  hotspotImage: "/IMG_0965.jpeg",
  hotspots: [
    // Top Left
    {
      title: "Cabinets",
      description:
        "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
      x: 100,
      y: 100,
    },
    // Bottom Left
    {
      title: "Cabinets",
      description:
        "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
      x: 100,
      y: 700,
    },
    // Top Right
    {
      title: "Cabinets",
      description:
        "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
      x: 1100,
      y: 100,
    },
    // Bottom Right
    {
      title: "Cabinets",
      description:
        "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
      x: 1100,
      y: 700,
    },
  ],
};

function isTop({ hotspot, image }: Props) {
  return hotspot.y < image.height / 2;
}
function isLeft({ hotspot, image }: Props) {
  return hotspot.x < image.width / 2;
}
function isRight(props: Props) {
  return !isLeft(props);
}
function isBottom(props: Props) {
  return !isTop(props);
}
