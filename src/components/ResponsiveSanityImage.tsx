import { Box } from "@mui/material";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/src/sanity/client";

interface BaseImageProps {
  src: SanityImageSource;
  alt: string;
  lazy?: boolean;
  className?: string;
}
interface ResponsiveSanityImageProps extends BaseImageProps {
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLImageElement>;
}
interface ResponsiveSanityBoxProps extends BaseImageProps {
  sx?: object;
}

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

export function buildOpenGraphSrc(src: SanityImageSource) {
  return urlFor(src)
    .width(1200)
    .height(630)
    .fit("crop")
    .auto("format")
    .quality(90)
    .url();
}

export function buildSanitySrc(src: SanityImageSource, width: number = 1440) {
  return urlFor(src).width(width).quality(90).auto("format").url();
}

export function buildSanitySrcSet(src: SanityImageSource) {
  return `
    ${urlFor(src).width(480).quality(80).auto("format").url()} 480w,
    ${urlFor(src).width(768).quality(85).auto("format").url()} 768w,
    ${urlFor(src).width(1024).quality(90).auto("format").url()} 1024w,
    ${urlFor(src).width(1440).quality(90).auto("format").url()} 1440w,
    ${urlFor(src).width(1920).quality(90).auto("format").url()} 1920w,
    ${urlFor(src).width(3840).quality(90).auto("format").url()} 3840w
    `;
}

export function ResponsiveSanityImage({
  src,
  alt,
  lazy = true,
  style,
  ref,
  className,
}: ResponsiveSanityImageProps) {
  return (
    <img
      src={buildSanitySrc(src)}
      ref={ref}
      alt={alt}
      srcSet={buildSanitySrcSet(src)}
      sizes="100vw"
      loading={lazy ? "lazy" : "eager"}
      style={{
        // width: "100%",
        // height: "auto",
        ...style,
      }}
      className={className}
    />
  );
}

export function ResponsiveSanityBox({
  src,
  alt,
  lazy = true,
  sx = {},
  className,
}: ResponsiveSanityBoxProps) {
  return (
    <Box
      component="img"
      src={buildSanitySrc(src)}
      srcSet={buildSanitySrcSet(src)}
      sizes="100vw"
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      className={className}
      sx={{
        // width: "100%",
        // zIndex: 0,
        // objectFit: "cover",
        // display: "block",
        // position: "relative",
        // boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        ...sx,
      }}
    />
  );
}
