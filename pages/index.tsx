import { client } from "@/src/sanity/client";
import { useState, useRef, useEffect } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { FullWidthSection } from "@/src/components/Section";
import StackedDeck from "@/src/pages/home/StackedDeckSection";
import { TestimonialSection } from "@/src/pages/home/TestimonialSection";
import { FeaturedProjectSection } from "@/src/pages/home/FeaturedProjectSection";
import { DesignPhilosophySection } from "@/src/pages/home/DesignPhilosophySection";
import { ExploreProjectsSection } from "@/src/pages/home/ExploreProjectsSection";
import { ContactUsSection } from "@/src/pages/home/ContactUsSection";
import {
  HeroImageSection,
  HeroVideoSection,
} from "@/src/pages/home/HeroImageSection";

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

export default function HomePage({ page }: { page: HomePageProps }) {
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

      <HeroImageSection ref={heroRef} />
      {/* <HeroVideoSection ref={heroRef} /> */}

      <FullWidthSection
        sx={{ height: "800px", alignItems: "center", py: 12, px: 4 }}
      >
        <DesignPhilosophySection />
      </FullWidthSection>

      <FullWidthSection
        sx={{ alignItems: "center", backgroundColor: "#f1eeed", py: 4 }}
      >
        <StackedDeck cards={servicesSectionCards} />
      </FullWidthSection>

      <FullWidthSection sx={{ bgcolor: "#e3e2dc", py: 4, px: 4 }}>
        <FeaturedProjectSection images={featuredProjectSectionImages} />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          height: "800px",
          alignItems: "center",
          bgcolor: "#073027",
          py: 12,
          px: 4,
        }}
      >
        <TestimonialSection />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          py: 4,
          px: 4,
        }}
      >
        <ExploreProjectsSection images={exploreSectionImages} />
      </FullWidthSection>

      <ContactUsSection />

      <Footer />
    </>
  );
}

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

const featuredProjectSectionImages = [
  {
    src: "https://soho-spaces.com/assets/dark-academia/chair2.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0003.jpeg",
    title: "Hand-painted umbrellas",
    subtitle: "Chiang Mai, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0006.jpeg",
    title: "Watercolor scroll",
    subtitle: "Guangzhou, China",
  },
];

const servicesSectionCards = [
  {
    numberText: "04 / 04",
    title: "Content Creation",
    bg: "#bab2a3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "03 / 04",
    title: "Brand Strategy",
    bg: "#c8c0b3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "02 / 04",
    title: "Video Strategy",
    bg: "#d9d3ca",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "01 / 04",
    title: "Video Production",
    bg: "#f1eeed",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
];

const exploreSectionImages = [
  {
    src: "https://soho-spaces.com/assets/east-meets-west/IMG_0002_landscape.jpeg",
    title: "Hand-painted umbrellas",
    subtitle: "Chiang Mai, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/gingkos-and-greys/IMG_0004.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0008.jpeg",
    title: "Watercolor scroll",
    subtitle: "Guangzhou, China",
  },
  {
    src: "https://soho-spaces.com/assets/dark-academia/IMG_0021.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/muted-mediterranean/IMG_0013.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/muted-mediterranean/IMG_0011.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/muted-mediterranean/IMG_3699.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/east-meets-west/IMG_9480.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
  {
    src: "https://soho-spaces.com/assets/east-meets-west/IMG_9474.jpeg",
    title: "Brass towel bar",
    subtitle: "Bangkok, Thailand",
  },
];
