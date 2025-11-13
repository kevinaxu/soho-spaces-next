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
import { ConstructionOutlined } from "@mui/icons-material";

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 8,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 20,
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
  percentX: number;
  percentY: number;
}

interface HotspotImageProps {
  image: string;
  hotspots: Hotspot[];
}

const HOTSPOT_SIZE = 12;
const LINE_THICKNESS = 3; // vertical line width & horizontal line height
const VERTICAL_LINE_HEIGHT = 50;
const HORIZONTAL_LINE_WIDTH = 150;

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 675;

// Determine quadrant
interface Props {
  hotspot: Hotspot;
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
    const updateSize = () => {
      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        setImageSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Row sx={{ justifyContent: "center" }}>
      <Box
        sx={{ width: "100%", position: "relative", display: "inline-block" }}
      >
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
        {imageSize.width > 0 &&
          hotspots.map((hotspot, idx) => {
            const isActive = idx === activeIdx;
            const x = hotspot.percentX * imageSize.width;
            const y = hotspot.percentY * imageSize.height;
            const scaledHotspot = { ...hotspot, x, y };

            return (
              <>
                <Box
                  key={idx}
                  sx={{
                    position: "absolute",
                    top: scaledHotspot.y,
                    left: scaledHotspot.x,
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
                    <VerticalLine hotspot={scaledHotspot} image={imageSize} />
                    <HorizontalLine hotspot={scaledHotspot} image={imageSize} />
                    <TooltipCard
                      hotspot={scaledHotspot}
                      image={imageSize}
                      close={() => setActiveIdx(null)}
                    />
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
  const verticalLineLeft = hotspot.x + HOTSPOT_SIZE / 2 - 1; // center align
  const verticalLineTop = hotspot.y + HOTSPOT_SIZE / 2;
  const verticalLineLength =
    (VERTICAL_LINE_HEIGHT / IMAGE_HEIGHT) * image.height;

  const sharedProps = {
    position: "absolute" as const,
    left: verticalLineLeft,
    width: LINE_THICKNESS,
    height: 0,
    backgroundColor: "#f1eeed",
    zIndex: 1,
  };

  // TOP TO BOTTOM
  if (isTop({ hotspot, image })) {
    return (
      <Box
        sx={{
          ...sharedProps,
          top: verticalLineTop,
          animation: "grow-vertical 0.2s ease-out forwards",
          "@keyframes grow-vertical": {
            to: { height: verticalLineLength },
          },
        }}
      />
    );
  } else {
    return (
      <Box
        sx={{
          ...sharedProps,
          top: verticalLineTop,
          transformOrigin: "bottom",
          transform: "scaleY(0)",
          animation: "grow-up 0.25s ease-out forwards",
          "@keyframes grow-up": {
            to: {
              height: verticalLineLength,
              transform: "translateY(-100%)",
            },
          },
        }}
      />
    );
  }
}

function HorizontalLine({ hotspot, image }: Props) {
  const isTopHalf = isTop({ hotspot, image });
  const isLeftHalf = isLeft({ hotspot, image });
  const centerY = hotspot.y + HOTSPOT_SIZE / 2;
  const centerX = hotspot.x + HOTSPOT_SIZE / 2;

  const sharedProps = {
    position: "absolute",
    height: LINE_THICKNESS,
    backgroundColor: "#f1eeed",
    width: 0,
    zIndex: 1,
  };

  // compute scaled vertical line length (matches VerticalLine)
  const verticalLineLength =
    (VERTICAL_LINE_HEIGHT / IMAGE_HEIGHT) * image.height;
  const horizontalLineLength =
    (HORIZONTAL_LINE_WIDTH / IMAGE_WIDTH) * image.width;

  // TOP LEFT
  if (isTopHalf && isLeftHalf) {
    const verticalTipY = centerY + verticalLineLength;
    const horizontalLineTop = verticalTipY - LINE_THICKNESS / 2 - 1;
    const horizontalLineLeft = centerX;

    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          left: horizontalLineLeft,
          width: horizontalLineLength,
          transformOrigin: "left center",
          transform: "scaleX(0)",
          animation: "scale-horizontal 0.25s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes scale-horizontal": {
            from: { transform: "scaleX(0)" },
            to: { transform: "scaleX(1)" },
          },
        }}
      />
    );
  }

  // BOTTOM LEFT
  if (!isTopHalf && isLeftHalf) {
    const verticalTipY = centerY - verticalLineLength; // vertical grows upward for bottom-half
    const horizontalLineTop = verticalTipY - LINE_THICKNESS / 2 + 1;
    const horizontalLineLeft = centerX; // start at the vertical line tip

    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          left: horizontalLineLeft,
          width: horizontalLineLength,
          transformOrigin: "left center",
          transform: "scaleX(0)",
          animation: "scale-horizontal 0.25s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes scale-horizontal": {
            from: { transform: "scaleX(0)" },
            to: { transform: "scaleX(1)" },
          },
        }}
      />
    );
  }

  // TOP RIGHT
  if (isTopHalf && !isLeftHalf) {
    const verticalTipY = centerY + verticalLineLength; // use scaled vertical length
    const verticalTipX = centerX;
    const horizontalLineTop = verticalTipY - LINE_THICKNESS / 2 - 1;
    const horizontalLineRight = verticalTipX; // start at vertical line tip

    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          right: image.width - horizontalLineRight,
          width: horizontalLineLength,
          transformOrigin: "right center",
          transform: "scaleX(0)",
          animation: "scale-horizontal-right 0.25s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes scale-horizontal-right": {
            from: { transform: "scaleX(0)" },
            to: { transform: "scaleX(1)" },
          },
        }}
      />
    );
  }

  // BOTTOM RIGHT
  if (!isTopHalf && !isLeftHalf) {
    const verticalTipY = centerY - verticalLineLength; // vertical grows upward for bottom-half
    const verticalTipX = centerX;
    const horizontalLineTop = verticalTipY - LINE_THICKNESS / 2 + 1;
    const horizontalLineRight = verticalTipX; // start at vertical line tip
    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          right: image.width - horizontalLineRight,
          width: horizontalLineLength,
          transformOrigin: "right center",
          transform: "scaleX(0)",
          animation: "scale-horizontal-right 0.25s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes scale-horizontal-right": {
            from: { transform: "scaleX(0)" },
            to: { transform: "scaleX(1)" },
          },
        }}
      />
    );
  }
}

function TooltipCard({ hotspot, image, close }: Props & { close: () => void }) {
  const isTopHalf = isTop({ hotspot, image });
  const isLeftHalf = isLeft({ hotspot, image });

  const sharedProps = {
    position: "absolute" as const,
    borderRadius: "4px",
    maxWidth: 500,
    backgroundColor: "#f1eeed",
    padding: 2,
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    zIndex: 5,
    opacity: 0,
    animation: "fade-in-tooltip 0.2s ease-out forwards",
    animationDelay: "0.4s",
    "@keyframes fade-in-tooltip": {
      to: { opacity: 1, transform: "translateY(0)" },
    },
  };

  const tooltipCard = (
    <Column gap={1}>
      <Row sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontStyle: "italic" }}>{hotspot.title}</Typography>
        <IconButton onClick={close} size="small" sx={{ p: 0.5 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Row>
      <Typography color="text.secondary">{hotspot.description}</Typography>
    </Column>
  );

  const centerX = hotspot.x + HOTSPOT_SIZE / 2;
  const horizontalLineLength =
    (HORIZONTAL_LINE_WIDTH / IMAGE_WIDTH) * image.width;

  // TOP LEFT
  if (isTopHalf && isLeftHalf) {
    const tooltipTop = hotspot.y;
    const tooltipLeft = hotspot.x + HOTSPOT_SIZE / 2 + horizontalLineLength;
    return (
      <Box
        sx={{
          ...sharedProps,
          top: tooltipTop,
          left: tooltipLeft,
          transform: "translateY(10px)",
        }}
      >
        {tooltipCard}
      </Box>
    );
  }

  // TOP RIGHT
  if (isTopHalf && !isLeftHalf) {
    const tooltipTop = hotspot.y;
    const tooltipRight = image.width - centerX + horizontalLineLength;
    return (
      <Box
        sx={{
          ...sharedProps,
          top: tooltipTop,
          right: tooltipRight,
          transform: "translateY(10px)",
        }}
      >
        {tooltipCard}
      </Box>
    );
  }

  // BOTTOM LEFT
  if (!isTopHalf && isLeftHalf) {
    const tooltipBottom = image.height - hotspot.y - HOTSPOT_SIZE;
    const tooltipLeft = hotspot.x + HOTSPOT_SIZE / 2 + horizontalLineLength;
    return (
      <Box
        sx={{
          ...sharedProps,
          bottom: tooltipBottom,
          left: tooltipLeft,
          transform: "translateY(-10px)",
        }}
      >
        {tooltipCard}
      </Box>
    );
  }

  // BOTTOM RIGHT
  if (!isTopHalf && !isLeftHalf) {
    const tooltipBottom = image.height - hotspot.y - HOTSPOT_SIZE;
    const tooltipRight = image.width - centerX + horizontalLineLength;
    return (
      <Box
        sx={{
          ...sharedProps,
          bottom: tooltipBottom,
          right: tooltipRight,
          transform: "translateY(-10px)", // start slightly above and slide up
        }}
      >
        {tooltipCard}
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
  hotspotImage: "/dark_academia/IMG_0020.jpeg",
  hotspots: [
    {
      title: "Cabinets",
      description:
        "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
      percentX: 0.2,
      percentY: 0.2,
      x: 100,
      y: 100,
    },
    {
      title: "Counter",
      description:
        "To balance the dark base and incorporate the surrounding color palette, we chose a stunning Calacatta Miraggio quartz countertop with subtle gold and grey veining.",
      percentX: 0.2,
      percentY: 0.8,
      x: 100,
      y: 500,
    },
    {
      title: "Appliances",
      description:
        "We chose the six-burner black and gold gas range with convection oven from Zline, and coupled it with the same Calacatta Miraggio quartz backsplash and brass pulls from the island to make the whole space look cohesive.",
      percentX: 0.8,
      percentY: 0.2,
      x: 1000,
      y: 100,
    },
    {
      title: "Cabinets",
      description:
        "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
      percentX: 0.8,
      percentY: 0.8,
      x: 1000,
      y: 500,
    },
  ],
};

function isTop({ hotspot, image }: Props) {
  return hotspot.y < image.height / 2;
}
function isLeft({ hotspot, image }: Props) {
  return hotspot.x < image.width / 2;
}
