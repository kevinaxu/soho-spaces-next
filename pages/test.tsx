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
      <Row sx={{ justifyContent: "center" }}>
        <Box
          sx={{
            position: "relative", // anchor hotspots to the image
            display: "inline-block",
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Interactive"
            sx={{
              objectFit: "cover",
              display: "block",
              zIndex: 0, // base layer
              position: "relative", // ensures it participates in stacking
            }}
          />

          {/* this is the hotspot */}
          <Box
            sx={{
              position: "absolute",
              top: "100px",
              left: "100px",
              zIndex: 3, // above lines + image
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
                userSelect: "none",
              }}
            />
          </Box>

          {/* this is the tooltip that gets displayed */}
          {isActive && (
            <>
              {/* OPTION 1: vertical / horizonta lline */}
              <Box
                sx={{
                  position: "absolute",
                  top: 105,
                  left: 105, // x position
                  width: 3, // thin vertical line
                  height: 50, // vertical length
                  backgroundColor: "#f1eeed",
                  zIndex: 1, // below hotspot + tooltip
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 105 + 50,
                  left: 105 + 0,
                  width: 150,
                  height: 3,
                  backgroundColor: "#f1eeed",
                  zIndex: 1, // below hotspot + tooltip
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "100px",
                  left: "250px",
                  borderRadius: "2px",
                  maxWidth: "500px",
                  backgroundColor: "#f1eeed",
                  padding: 2,
                  // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // ✅ subtle shadow
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                  zIndex: 2, // above lines
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
