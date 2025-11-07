import type { PortableTextBlock } from "@portabletext/types";
import { useState, useRef, useEffect } from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { FullWidthSection } from "@/src/components/Section";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import { ContactUsSection } from "@/src/pages/home/ContactUsSection";
import { DesignPhilosophySection } from "@/src/pages/home/DesignPhilosophySection";
import ExploreSection from "@/src/pages/home/ExploreSection";
import { FeaturedProjectSection } from "@/src/pages/home/FeaturedProjectSection";
import { HeroSection } from "@/src/pages/home/HeroSection";
import StackedDeck from "@/src/pages/home/StackedDeckSection";
import { TestimonialSection } from "@/src/pages/home/TestimonialSection";
import { client } from "@/src/sanity/client";

interface HomePageProps {
  title: string;
  about: PortableTextBlock[];
  aboutImage: Media;
  gallery: Media[];
}

interface Media {
  _id: string;
  title: string;
  url: string;
  rows?: number;
  cols?: number;
}

export default function HomePage() {
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
      {sticky && <Header sticky={sticky} />}

      <HeroSection
        src={mockData.hero.src}
        type={mockData.hero.type}
        ref={heroRef}
      />

      <FullWidthSection
        sx={{
          height: "800px",
          alignItems: "center",
          py: 12,
          px: PADDING_X_SECTION,
        }}
      >
        <DesignPhilosophySection
          title={mockData.designPhilosophy.title}
          subtitle={mockData.designPhilosophy.subtitle}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          alignItems: "center",
          backgroundColor: "#f1eeed",
          py: {
            md: 8,
          },
        }}
      >
        <StackedDeck
          title={mockData.services.title}
          description={mockData.services.description}
          cards={mockData.services.cards}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            md: 4,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
        }}
      >
        <FeaturedProjectSection
          title={mockData.featuredProject.title}
          description={mockData.featuredProject.description}
          images={mockData.featuredProject.images}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          height: "800px",
          alignItems: "center",
          bgcolor: "#073027",
          py: 12,
          px: PADDING_X_SECTION,
        }}
      >
        <TestimonialSection
          quote={mockData.testimonial.quote}
          author={mockData.testimonial.author}
          title={mockData.testimonial.title}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          alignItems: "center",
          py: {
            md: 4,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
        }}
      >
        <ExploreSection
          title={mockData.explore.title}
          description={mockData.explore.description}
          images={mockData.explore.images}
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
          title={mockData.contact.title}
          cta={mockData.contact.cta}
        />
      </FullWidthSection>

      <Footer />
    </>
  );
}

/*
export async function getStaticProps() {
  const query = `*[_type == "home"] | order(publishedAt desc)[0]{
    title,
    publishedAt,
    about,
    "aboutImage": aboutImage->{
      _id,
      title,
      "url": image.asset->url
    },
    "gallery": gallery[]->{
      _id,
      title,
      "url": image.asset->url,
      rows,
      cols
    },
  }`;
  const page = await client.fetch(query);
  return { props: { page } };
}
*/

const mockData = {
  hero: {
    src: "/IMG_0965.jpeg",
    type: "image" as const,
  },
  //   hero: {
  //     src: "/hero_video.mp4",
  //     type: "video" as const,
  //   },
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
      // Cards are ordered where first one is last shown
      {
        title: "Content Creation",
        bg: "#bab2a3",
        description:
          "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
      },
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
  testimonial: {
    quote:
      "Gemma has been a wonderful help in the renovation of my central Bath apartment. Gemma has been professionally trained which I specifically wanted, as I had already interior design experience but needed some extra expert guidance. There were several space planning issues and her spatial planning was brilliant, so I had the confidence to buy furniture items that I knew would fit. Gemma sourced some AMAZING PIECES that I would never have found on my own.",
    author: "Korbinian Scheitzach",
    title: "CEO ViscoTec America",
  },
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
    title:
      "Ready to transform your space? Schedule a design consultation and bring your vision to life.",
    cta: "book a call",
  },
};
