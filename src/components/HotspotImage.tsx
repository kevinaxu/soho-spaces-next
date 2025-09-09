import { useState } from "react";

import { Row } from "../components/Layout";
import { Box, Popover, Typography } from "@mui/material";

interface Hotspot {
  title: string;
  description: string;
  percent: {
    x: number;
    y: number;
  };
}

interface HotspotImageProps {
  image: string;
  hotspots: Hotspot[];
}

export default function HotspotImage({ image, hotspots }: HotspotImageProps) {
  const [isAnchorElement, setIsAnchorElement] = useState<HTMLElement | null>(
    null
  );
  const [isActiveHotspot, setIsActiveHotspot] = useState<Hotspot | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    hotspot: Hotspot
  ) => {
    setIsAnchorElement(event.currentTarget);
    setIsActiveHotspot(hotspot);
  };

  const handleClose = () => {
    setIsAnchorElement(null);
    setIsActiveHotspot(null);
  };

  return (
    <>
      <Box
        position="relative"
        width="100%"
        sx={{ maxWidth: { xs: "100%", md: 900 } }}
      >
        <Box
          component="img"
          src={image}
          alt="Interactive"
          sx={{
            width: "100%",
            height: { xs: 500, md: "auto" },
            objectFit: "cover",
            display: "block",
          }}
        />

        {hotspots.map((hotspot, idx) => (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: `${hotspot.percent.y}%`,
              left: `${hotspot.percent.x}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Box
              onClick={(e) => handleClick(e, hotspot)}
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "red",
                border: "2px solid white",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </Box>
        ))}
      </Box>

      <Popover
        open={Boolean(isAnchorElement)}
        anchorEl={isAnchorElement}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        transitionDuration={0}
        disableScrollLock
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
              pointerEvents: "none",
            },
          },
        }}
      ></Popover>

      {/* Caption always rendered, but empty when no hotspot is active */}
      <Row
        gap={1}
        sx={{
          minHeight: {
            xs: 48,
            md: 96,
          },
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          {isActiveHotspot?.title ?? ""}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isActiveHotspot?.description ?? ""}
        </Typography>
      </Row>
    </>
  );
}
