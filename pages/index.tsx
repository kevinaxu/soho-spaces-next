import { Box } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useState, useRef, useEffect } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import PageMeta from "@/src/components/PageMeta";
import { FullWidthSection } from "@/src/components/Section";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import { PAGES } from "@/src/constants";
import { ContactUsSection } from "@/src/pages/home/ContactUsSection";
import { DesignPhilosophySection } from "@/src/pages/home/DesignPhilosophySection";
import ExploreSection from "@/src/pages/home/ExploreSection";
import { FeaturedProjectSection } from "@/src/pages/home/FeaturedProjectSection";
import { HeroSection } from "@/src/pages/home/HeroSection";
import StackedDeck from "@/src/pages/home/StackedDeckSection";
import { TestimonialSection } from "@/src/pages/home/TestimonialSection";
import { client } from "@/src/sanity/client";

interface HomePageProps {
  hero: {
    videoUrl: string;
  };
  designPhilosophy: {
    title: string;
    subtitle?: string;
  };
  services: {
    title: string;
    description: string;
    cards: {
      title: string;
      bg: string;
      description: string;
    }[];
  };
  featuredProject: {
    title: string;
    description: string;
    images: {
      src: SanityImageSource;
      title: string;
      subtitle: string;
    }[];
  };
  testimonials: {
    quote: string;
    author: string;
    title: string;
  }[];
  explore: {
    title: string;
    description: string;
    images: {
      src: SanityImageSource;
    }[];
  };
  contact: {
    title: string;
    cta: string;
    src: SanityImageSource;
  };
}

export default function HomePage({ home }: { home: HomePageProps }) {
  const [sticky, setSticky] = useState<boolean | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {sticky && <Header sticky={sticky} transparent />}

      <PageMeta
        title="Welcome Home | Soho Spaces"
        description="Soho Spaces is a full-service interior design studio in Atlanta, specializing in modern, timeless interiors tailored to each client's story."
        url={PAGES.home}
        pageType="home"
      />

      <HeroSection src={home.hero.videoUrl} type="video" ref={heroRef} />

      <FullWidthSection
        sx={{
          height: "800px",
          alignItems: "center",
          py: {
            xs: 2,
            md: 0,
          },
          px: PADDING_X_SECTION,
        }}
      >
        <DesignPhilosophySection
          title={home.designPhilosophy.title}
          subtitle={home.designPhilosophy.subtitle}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          alignItems: "center",
          backgroundColor: "#f1eeed",
          py: {
            md: 0,
          },
        }}
      >
        <StackedDeck
          title={home.services.title}
          description={home.services.description}
          cards={home.services.cards}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          py: {
            md: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
        }}
      >
        <FeaturedProjectSection
          title={home.featuredProject.title}
          description={home.featuredProject.description}
          images={home.featuredProject.images}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          height: "800px",
          alignItems: "center",
          bgcolor: "#432724",
          marginBottom: 2,
          marginX: 2,
        }}
      >
        <TestimonialSection
          testimonials={home.testimonials}
          autoScroll={true}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          alignItems: "center",
          py: {
            md: 0,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 2,
          },
        }}
      >
        <ExploreSection
          title={home.explore.title}
          description={home.explore.description}
          images={home.explore.images}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
          py: {
            xs: 2,
            md: 2,
          },
        }}
      >
        <ContactUsSection
          title={home.contact.title}
          cta={home.contact.cta}
          src={home.contact.src}
        />
      </FullWidthSection>

      <Footer />
    </>
  );
}

const HOMEPAGE_SANITY_ID = "2b096586-d457-4156-bb1b-17e5d9e08973";

export const getStaticProps = async () => {
  const home = await client.fetch(
    `*[_type == "home" && _id == $id][0]{
        hero {
        "videoUrl": video.asset->url
        },
        designPhilosophy {
            title,
            subtitle
        },
        services {
        title,
        description,
        cards[] {
            title,
            bg,
            description
            }
        },
        featuredProject {
          title,
          description,
          images[] {
            "src": image->image{
              ...,
              asset->
            },
            title,
            subtitle
            }
        },
        testimonials[] {
            quote,
            author,
            title
        },
        explore {
            title,
            description,
            images[] {
                "src": image->image{
                ...,
                asset->
                }
            }
        },
        "contact": { 
            "title": contact.title,
            "cta": contact.cta,
            "src": contact.image->image { ..., asset-> }
        }
   }
`,
    { id: HOMEPAGE_SANITY_ID }
  );

  // Validate all required sections are present
  const requiredKeys = [
    "hero",
    "designPhilosophy",
    "services",
    "featuredProject",
    "testimonials",
    "explore",
    "contact",
  ];
  if (!home || !requiredKeys.every((key) => home[key])) {
    return { notFound: true };
  }

  return {
    props: { home },
  };
};

const mockData = {
  hero: {
    src: "/hero_video.mp4",
    type: "video" as const,
  },
  designPhilosophy: {
    title:
      "Our approach is deep rooted in collaboration—an exercise designed to uncover the process, perspective, and nuances that define your work.",
    subtitle:
      "The wonder—and challenge—of designing digital spaces for interior designers is in understanding each ones deeply personal perspective. For us, that means tailoring our process to embrace the needs of every project.",
  },
  services: {
    title: "Our Services",
    description: "Story and strategy cultivated in every touchpoint.",
    cards: [
      // Cards are ordered in reverse (first element is the last card shown)
      {
        title: "Brand Strategy",
        bg: "#c8c0b3",
        description:
          "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
      },
      {
        title: "Video Strategy",
        bg: "#d9d3ca",
        description:
          "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
      },
      {
        title: "Video Production",
        bg: "#f1eeed",
        description:
          "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
      },
    ],
  },
  featuredProject: {
    title: "Dark Academia Living Room",
    description:
      "When we asked Kevin to tell us about a place that brought back good memories and made him feel at ease, he began describing the Sterling Memorial Library at Yale University. Its where he used to spend many late nights listening to music while studying or reading a book. He loved the Gothic architecture and how the stained glass windows cast colorful patterns across the floors.",
    images: [
      {
        src: "/IMG_0008.jpeg",
        title: "Brass towel bar",
        subtitle: "Bangkok, Thailand",
      },
      {
        src: "/IMG_0002_landscape.jpeg",
        title: "Hand-painted umbrellas",
        subtitle: "Chiang Mai, Thailand",
      },
      {
        src: "/IMG_0017.jpeg",
        title: "Watercolor scroll",
        subtitle: "Guangzhou, China",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "Gemma has been a wonderful help in the renovation of my central Bath apartment. Gemma has been professionally trained which I specifically wanted, as I had already interior design experience but needed some extra expert guidance. There were several space planning issues and her spatial planning was brilliant, so I had the confidence to buy furniture items that I knew would fit. Gemma sourced some AMAZING PIECES that I would never have found on my own.",
      author: "Korbinian Scheitzach",
      title: "CEO ViscoTec America",
    },
  ],
  explore: {
    title: "A Glimpse Into Our Projects",
    description:
      "Dive into our portfolio and see the details that make each project unique",
    images: [
      [
        {
          src: "/IMG_0002_landscape.jpeg",
          flex: 2,
        },
        {
          src: "/IMG_0004.jpeg",
          flex: 1,
        },
        {
          src: "/IMG_0008.jpeg",
          flex: 1,
        },
      ],
      [
        {
          src: "/IMG_0002_landscape.jpeg",
          flex: 1,
        },
        {
          src: "/IMG_0004.jpeg",
          flex: 1,
        },
        {
          src: "/IMG_0008.jpeg",
          flex: 1,
        },
      ],
      [
        {
          src: "/IMG_0002_landscape.jpeg",
          flex: 1,
        },
        {
          src: "/IMG_0004.jpeg",
          flex: 2,
        },
        {
          src: "/IMG_0008.jpeg",
          flex: 1,
        },
      ],
    ],
  },
  contact: {
    title: "Ready to transform your dream space?",
    cta: "Schedule a free consultation",
    src: "/dark_academia/shady_glen_sketch.png",
  },
};
