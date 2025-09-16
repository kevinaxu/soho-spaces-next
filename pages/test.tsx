import { useState, useEffect } from "react";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import TeamSection from "../src/components/TeamSection";
// import HotspotImage from "../src/components/HotspotImage";
import { Column } from "../src/components/Layout";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Row } from "../src/components/Layout";
import { Box, Popover, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const hotspots = [
  {
    title: "Cabinets",
    description:
      "For the opposite wall, we wanted it to be a softer Gothic style while still being dramatic, so we chose the elegant floor-to-ceiling Escada cabinets and matched them to the greige walls to make the space look even taller. ",
    percent: {
      x: 20,
      y: 25,
    },
  },
  {
    title: "Counter",
    description:
      "To balance the dark base and incorporate the surrounding color palette, we chose a stunning Calacatta Miraggio quartz countertop with subtle gold and grey veining.",
    percent: {
      x: 90,
      y: 80,
    },
  },
  {
    title: "Appliances",
    description:
      "We chose the six-burner black and gold gas range with convection oven from Zline, and coupled it with the same Calacatta Miraggio quartz backsplash and brass pulls from the island to make the whole space look cohesive.",
    percent: {
      x: 40,
      y: 60,
    },
  },
];
const hotspotImage =
  "https://soho-spaces.com/assets/modern-gothic/IMG_0965.jpeg";

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />

      {/* this is the main table shell */}
      <Column
        sx={{
          py: 6,
          px: {
            xs: 4,
            md: 2,
          },
          mx: "auto",
          maxWidth: 800,
          gap: 2,
        }}
      >
        <ImageWithHotspots image={hotspotImage} hotspots={hotspots} />
      </Column>

      <Footer />
    </>
  );
}

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

function ImageWithHotspots({ image, hotspots }: HotspotImageProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

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

  return (
    <>
      <Row position="relative" width="100%" justifyContent="center">
        <Box
          position="relative"
          sx={{
            maxWidth: { xs: "100%", md: 900 },
          }}
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

          {hotspots.map((hotspot, idx) => {
            const isActive = idx === activeIdx;
            return (
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
                  onClick={() => handleClick(idx)}
                  sx={{
                    width: isActive ? 20 : 12,
                    height: isActive ? 20 : 12,
                    borderRadius: "50%",
                    backgroundColor: isActive ? "red" : "gray",
                    border: "2px solid white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    animation: isActive
                      ? "pulse 1.5s infinite ease-in-out"
                      : "none",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.2)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                />
              </Box>
            );
          })}

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
        </Box>
      </Row>
      <Row
        sx={{
          gap: 0,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {activeIdx !== null ? (
          <>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight="bold">
                {hotspots[activeIdx].title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {hotspots[activeIdx].description}
              </Typography>
            </Box>
            <Box>
              <IconButton
                size="small"
                onClick={() => setActiveIdx(null)}
                sx={{
                  p: 0.5,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </>
        ) : (
          <Typography variant="body1" fontStyle="italic">
            Select a design feature to learn more
          </Typography>
        )}
      </Row>
    </>
  );
}

/*
// Styling of controls with background
<Box
    sx={{
        position: "absolute",
        bottom: 16,
        right: 16,
        display: "flex",
        gap: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 1,
        p: 0.5,
    }}
>
    <IconButton size="small">
        <ChevronLeftIcon />
    </IconButton>
    <IconButton size="small">
        <ChevronRightIcon />
    </IconButton>
</Box>
*/
