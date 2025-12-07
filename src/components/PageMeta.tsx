import { useTheme } from "@mui/material/styles"; // for dark/light mode
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Head from "next/head";

import { buildOpenGraphSrc } from "@/src/components/ResponsiveSanityImage";
import { BASE_URL, DEFAULT_IMAGE_PREVIEW } from "@/src/constants";

type PageType = "home" | "about" | "portfolio" | "project" | "contact";

interface SEOProps {
  title: string;
  description: string;
  url: string; // relative or absolute path
  image?: SanityImageSource;
  pageType: PageType;
  author?: string; // defaults to your name/company
}

interface StructuredDataBase {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  creator?: { "@type": "Organization"; name: string };
  publisher?: { "@type": "Organization"; name: string };
  image?: string;
}

const DEFAULT_AUTHOR = "Kevin Xu";

export default function PageMeta({
  title,
  description,
  url,
  image,
  pageType,
  author = DEFAULT_AUTHOR,
}: SEOProps) {
  const theme = useTheme();
  const canonicalUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const imageSrc = image ? buildOpenGraphSrc(image) : DEFAULT_IMAGE_PREVIEW;

  // Map page type to schema.org @type
  const schemaTypeMap: Record<PageType, string> = {
    home: "WebSite",
    about: "AboutPage",
    portfolio: "CollectionPage",
    project: "VisualArtwork",
    contact: "ContactPage",
  };

  const structuredData: StructuredDataBase = {
    "@context": "https://schema.org",
    "@type": schemaTypeMap[pageType] || "WebPage",
    name: title,
    description,
    url: canonicalUrl,
  };

  // Add extra fields for certain types
  if (pageType === "project") {
    structuredData.creator = {
      "@type": "Organization",
      name: author,
    };
    if (imageSrc) {
      structuredData.image = imageSrc;
    }
  } else if (pageType === "home") {
    structuredData.publisher = {
      "@type": "Organization",
      name: author,
    };
  }

  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon */}
      <link
        rel="icon"
        type="image/svg+xml"
        href={
          theme.palette.mode === "dark"
            ? "/soho_logo_black.svg"
            : "/soho_logo_white.svg"
        }
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:type"
        content={pageType === "project" ? "article" : "website"}
      />
      <meta property="og:url" content={canonicalUrl} />
      {imageSrc && <meta property="og:image" content={imageSrc} />}
      {imageSrc && <meta property="og:image:width" content="1200" />}
      {imageSrc && <meta property="og:image:height" content="630" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageSrc && <meta name="twitter:image" content={imageSrc} />}

      {/* Author */}
      <meta name="author" content={author} />

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
