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
import { HeroImageSection } from "@/src/pages/home/HeroSection";
import StackedDeck from "@/src/pages/home/StackedDeckSection";
import { TestimonialSection } from "@/src/pages/home/TestimonialSection";
import { client } from "@/src/sanity/client";

interface HomePageProps {
  hero: {
    // videoUrl: string;
    image: SanityImageSource;
    imageMobile: SanityImageSource;
  };
  designPhilosophy: {
    title: string;
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
    projects: {
      title: string;
      slug: string;
      image: SanityImageSource;
      imageMobile: SanityImageSource;
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
      <Header sticky={!!sticky} transparent />

      <PageMeta
        title="Welcome Home | Soho Spaces"
        description="Soho Spaces is a full-service interior design studio in Atlanta, specializing in modern, timeless interiors tailored to each client's story."
        url={PAGES.home}
        pageType="home"
      />

      <HeroImageSection
        image={home.hero.image}
        imageMobile={home.hero.imageMobile}
        ref={heroRef}
      />

      <FullWidthSection
        sx={{
          height: "800px",
          alignItems: "center",
          py: {
            xs: 2,
            lg: 0,
          },
          px: PADDING_X_SECTION,
        }}
      >
        <DesignPhilosophySection title={home.designPhilosophy.title} />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          alignItems: "center",
          backgroundColor: "#f1eeed",
          py: {
            lg: 0,
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
            lg: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            lg: PADDING_X_SECTION,
          },
        }}
      >
        <FeaturedProjectSection
          title={home.featuredProject.title}
          description={home.featuredProject.description}
          projects={home.featuredProject.projects}
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
            lg: 0,
          },
          px: {
            xs: PADDING_X_MOBILE,
            lg: 2,
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
            lg: PADDING_X_SECTION,
          },
          py: {
            xs: 2,
            lg: 2,
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

export const HOMEPAGE_SANITY_ID = "2b096586-d457-4156-bb1b-17e5d9e08973";

export const getStaticProps = async () => {
  const home = await client.fetch(
    `*[_type == "home" && _id == $id][0]{
        hero {
            "image": image->image{
                ...,
                asset->
            },
            "imageMobile": imageMobile->image{
                ...,
                asset->
            },
        },
        designPhilosophy {
            title,
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
            projects[] {
                title,
                "image": image->image{
                    ...,
                    asset->
                },
                "imageMobile": imageMobile->image{
                    ...,
                    asset->
                },
                "slug": project->slug.current,
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
