import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

import { Row } from "@/src/components/Layout";

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
