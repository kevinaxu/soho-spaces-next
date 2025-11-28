import { ConstructionOutlined } from "@mui/icons-material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { Masonry } from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { FullWidthSection } from "@/src/components/Section";
import StickyBox from "@/src/components/StickyBox";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import ExploreSection from "@/src/pages/home/ExploreSection";
import Image from "next/image";

import { Row, Column } from "../src/components/Layout";
import { parsePortableText } from "@/src/utils/portableTextParser";
import HorizontalGallerySection from "@/src/pages/project/HorizontalGallerySection";
import imageUrlBuilder from "@sanity/image-url";

import { client } from "../src/sanity/client";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => builder.image(source);

export default function HomePage({ project }) {
  const item = project.hero.images[0];
  //   const item = "/dark_academia/IMG_0006.jpeg";
  //   console.log("type of", typeof item.src, JSON.stringify(item.src, null, 2));

  const isSanityImage =
    typeof item.src === "object" && item.src._type === "reference";
  console.log("isSanityImage", isSanityImage);

  const imageTag = isSanityImage ? (
    <img
      src={urlFor(item.src).width(1920).quality(90).auto("format").url()}
      srcSet={`
    ${urlFor(item.src).width(480).quality(80).auto("format").url()} 480w,
    ${urlFor(item.src).width(768).quality(85).auto("format").url()} 768w,
    ${urlFor(item.src).width(1024).quality(90).auto("format").url()} 1024w,
    ${urlFor(item.src).width(1440).quality(90).auto("format").url()} 1440w,
    ${urlFor(item.src).width(1920).quality(90).auto("format").url()} 1920w,
    ${urlFor(item.src).width(3840).quality(90).auto("format").url()} 3840w
  `}
      sizes="100vw"
      alt={item.title}
      style={{ width: "100%", height: "auto" }}
      loading="lazy"
    />
  ) : (
    <img src={item} alt={item} loading="lazy" />
  );

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
        <Column gap={8}>
          <Column>
            <Typography variant="h5">Using img tag</Typography>
            {imageTag}
            {/* <img
              src={urlFor(project.hero.images[0].src).quality(80).url()}
              alt={project.hero.images[0].title}
              loading="lazy"
            /> */}
          </Column>

          <Column>
            <Typography variant="h5">Unoptimized Using img tag</Typography>
            <img
              src={urlFor(item.src).quality(80).url()}
              alt={item.title}
              loading="lazy"
            />
          </Column>
          <Column>
            <Typography variant="h5">Using ImageList component</Typography>
            <ImageList cols={2} gap={12} rowHeight={500}>
              {project.hero.images.map((item, i) => (
                <ImageListItem
                  key={i}
                  sx={{
                    "&:hover .MuiImageListItemBar-root": { opacity: 1 },
                  }}
                >
                  <img
                    src={urlFor(item.src).quality(80).url()}
                    alt={item.title}
                    loading="lazy"
                    srcSet={`
    ${urlFor(item.src).width(480).quality(80).auto("format").url()} 480w,
    ${urlFor(item.src).width(768).quality(85).auto("format").url()} 768w,
    ${urlFor(item.src).width(1024).quality(90).auto("format").url()} 1024w,
    ${urlFor(item.src).width(1440).quality(90).auto("format").url()} 1440w,
    ${urlFor(item.src).width(1920).quality(90).auto("format").url()} 1920w,
    ${urlFor(item.src).width(3840).quality(90).auto("format").url()} 3840w
  `}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Column>

          <Column>
            <Typography variant="h5">Using Box with src</Typography>
            <Box
              component="img"
              src={urlFor(project.hero.images[0].src).quality(80).url()}
              srcSet={`
    ${urlFor(item.src).width(480).quality(80).auto("format").url()} 480w,
    ${urlFor(item.src).width(768).quality(85).auto("format").url()} 768w,
    ${urlFor(item.src).width(1024).quality(90).auto("format").url()} 1024w,
    ${urlFor(item.src).width(1440).quality(90).auto("format").url()} 1440w,
    ${urlFor(item.src).width(1920).quality(90).auto("format").url()} 1920w,
    ${urlFor(item.src).width(3840).quality(90).auto("format").url()} 3840w
  `}
              sizes="100vw"
              alt="Interactive"
              sx={{
                width: "100%",
                zIndex: 0,
                objectFit: "cover",
                display: "block",
                position: "relative",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              }}
            />
          </Column>

          {/*
          <Column>
            <Typography variant="h5">Using Box with backgroundImage</Typography>
            <Box
              sx={{
                width: "100%",
                // THIS IS REQUIRED WITH BACKGROUND IMAGE
                // backgroundImage does not have an intrinsic size
                // need to define this otherwise it won't work correctly
                height: 400,
                backgroundImage: `url("${urlFor(project.hero.images[0].src).quality(80).url()}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
              role="img"
              aria-label="Hero image"
            />
          </Column>

          <Column>
            <Typography variant="h5">React Slider</Typography>
            <Box
              className="keen-slider__slide"
              sx={{
                width: "100%",
                aspectRatio: "16/9",
              }}
            >
              <ReactCompareSlider
                position={20}
                style={{ width: "100%", height: "100%" }}
                itemOne={
                  <ReactCompareSliderImage
                    src={urlFor(project.hero.images[0].src).quality(80).url()}
                    alt="Before"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={urlFor(project.hero.images[1].src).quality(80).url()}
                    alt="After"
                  />
                }
                handle={<ReactCompareSliderHandle />}
              />
            </Box>
          </Column>
          */}
        </Column>
      </FullWidthSection>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const query = `*[_type == "project"] | order(publishedAt desc)[0]{
  "hero": {
    "images": hero.images[]{
      title,
      // this returns a reference
      "src": photo->image.asset
    }
  },
}`;

  const project = await client.fetch(query);
  console.log("dumping project", JSON.stringify(project, null, 2));

  return { props: { project } };
}
