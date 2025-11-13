import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect, useRef } from "react";

import { Row, Column } from "@/src/components/Layout";

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

interface Props {
  hotspot: Hotspot;
  image: {
    width: number;
    height: number;
  };
}

const HOTSPOT_SIZE = 12;
const LINE_THICKNESS = 3; // vertical line width & horizontal line height
const VERTICAL_LINE_HEIGHT = 50;
const HORIZONTAL_LINE_WIDTH = 150;

export default function HotspotImage({ image, hotspots }: HotspotImageProps) {
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
  const verticalLineLeft = hotspot.x + HOTSPOT_SIZE / 2 - 1; // shift 1px to center on hotspot
  const verticalLineTop = hotspot.y + HOTSPOT_SIZE / 2;
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
            to: { height: VERTICAL_LINE_HEIGHT },
          },
        }}
      />
    );
  } else {
    // BOTTOM HALF
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
              height: VERTICAL_LINE_HEIGHT,
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

  // TOP LEFT
  if (isTopHalf && isLeftHalf) {
    const verticalTipY = centerY + VERTICAL_LINE_HEIGHT;
    const horizontalLineTop = verticalTipY - LINE_THICKNESS / 2;
    const horizontalLineLeft = centerX;
    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          left: horizontalLineLeft,
          animation: "grow-horizontal 0.2s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes grow-horizontal": {
            to: { width: HORIZONTAL_LINE_WIDTH },
          },
        }}
      />
    );
  }

  // BOTTOM LEFT
  if (!isTopHalf && isLeftHalf) {
    const verticalTipY = centerY - VERTICAL_LINE_HEIGHT; // grows upward
    const verticalTipX = centerX;
    const horizontalLineTop = verticalTipY - LINE_THICKNESS / 2;
    const horizontalLineLeft = verticalTipX; // start at the vertical line tip
    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          left: horizontalLineLeft,
          transformOrigin: "left center",
          animation: "grow-right 0.2s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes grow-right": {
            to: { width: HORIZONTAL_LINE_WIDTH },
          },
        }}
      />
    );
  }

  // TOP RIGHT
  if (isTopHalf && !isLeftHalf) {
    const verticalTipY = centerY + VERTICAL_LINE_HEIGHT;
    const verticalTipX = centerX;
    const horizontalLineTop = verticalTipY - LINE_THICKNESS;
    const horizontalLineRight = verticalTipX; // start at vertical line tip
    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          right: image.width - horizontalLineRight,
          transformOrigin: "right center",
          animation: "grow-left 0.2s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes grow-left": {
            to: { width: HORIZONTAL_LINE_WIDTH },
          },
        }}
      />
    );
  }
  // BOTTOM RIGHT
  if (!isTopHalf && !isLeftHalf) {
    const verticalTipY = centerY - VERTICAL_LINE_HEIGHT; // vertical grows upward
    const verticalTipX = centerX;
    const horizontalLineTop = verticalTipY;
    const horizontalLineRight = verticalTipX; // start at vertical line tip
    return (
      <Box
        sx={{
          ...sharedProps,
          top: horizontalLineTop,
          right: image.width - horizontalLineRight,
          transformOrigin: "right center",
          animation: "grow-left 0.2s ease-out forwards",
          animationDelay: "0.2s",
          "@keyframes grow-left": {
            to: { width: HORIZONTAL_LINE_WIDTH },
          },
        }}
      />
    );
  }
}

function TooltipCard({ hotspot, image }: Props) {
  const isTopHalf = isTop({ hotspot, image });
  const isLeftHalf = isLeft({ hotspot, image });

  const sharedProps = {
    position: "absolute" as const,
    borderRadius: "4px",
    maxWidth: 500,
    backgroundColor: "#f1eeed",
    padding: 2,
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    zIndex: 2,
    opacity: 0,
    animation: "fade-in-tooltip 0.2s ease-out forwards",
    animationDelay: "0.4s",
    "@keyframes fade-in-tooltip": {
      to: { opacity: 1, transform: "translateY(0)" },
    },
  };

  const tooltipCard = (
    <Column gap={1}>
      <Typography sx={{ fontStyle: "italic" }}>{hotspot.title}</Typography>
      <Typography color="text.secondary">{hotspot.description}</Typography>
    </Column>
  );

  // TOP LEFT
  if (isTopHalf && isLeftHalf) {
    const tooltipTop = hotspot.y;
    const tooltipLeft = hotspot.x + HOTSPOT_SIZE / 2 + HORIZONTAL_LINE_WIDTH;
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
    const tooltipRight =
      image.width - (hotspot.x - HORIZONTAL_LINE_WIDTH) - HOTSPOT_SIZE / 2;
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
    const tooltipBottom = image.height - hotspot.y - HOTSPOT_SIZE; // CSS 'bottom' is from container bottom
    const tooltipLeft = hotspot.x + HORIZONTAL_LINE_WIDTH - HOTSPOT_SIZE / 2;
    return (
      <Box
        sx={{
          ...sharedProps,
          bottom: tooltipBottom,
          left: tooltipLeft,
          transform: "translateY(-10px)", // start slightly above and slide up
        }}
      >
        {tooltipCard}
      </Box>
    );
  }

  // BOTTOM RIGHT
  if (!isTopHalf && !isLeftHalf) {
    const tooltipBottom = image.height - hotspot.y - HOTSPOT_SIZE; // align bottom with hotspot
    const tooltipRight =
      image.width - (hotspot.x - HORIZONTAL_LINE_WIDTH) - HOTSPOT_SIZE / 2;
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

function isTop({ hotspot, image }: Props) {
  return hotspot.y < image.height / 2;
}
function isLeft({ hotspot, image }: Props) {
  return hotspot.x < image.width / 2;
}
