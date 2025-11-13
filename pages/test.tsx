import { ConstructionOutlined } from "@mui/icons-material";
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
        whatup
      </FullWidthSection>

      <Footer />
    </>
  );
}

const mockData = {};
