import { ConstructionOutlined } from "@mui/icons-material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { Masonry } from "@mui/lab";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import {
  buildSanitySrc,
  buildSanitySrcSet,
  ResponsiveSanityBox,
  ResponsiveSanityImage,
} from "@/src/components/ResponsiveSanityImage";
import { FullWidthSection } from "@/src/components/Section";
import StickyBox from "@/src/components/StickyBox";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import ExploreSection from "@/src/pages/home/ExploreSection";
import HorizontalGallerySection from "@/src/pages/project/HorizontalGallerySection";
import { parsePortableText } from "@/src/utils/portableTextParser";

import { Row, Column } from "../src/components/Layout";
import { client } from "../src/sanity/client";

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const query = `*[_type == "project"] | order(publishedAt desc)[0]{
  "hero": {
    "images": hero.images[]{
      title,
      "src": photo->image{
        ...,
        asset->
      }
    }
  }
}`;

  const project = await client.fetch(query);
  return { props: { project } };
}
