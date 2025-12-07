import ConstructionIcon from "@mui/icons-material/Construction";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Column } from "@/src/components/Layout";
import PageMeta from "@/src/components/PageMeta";
import { FullWidthSection } from "@/src/components/Section";
import { SectionTitle } from "@/src/components/SectionTitle";
import {
  MAX_WIDTH_TEXT_CONTAINER,
  PADDING_X_SECTION,
  PADDING_X_MOBILE,
} from "@/src/constants";
import { PAGES } from "@/src/constants";
import ImageCrossFade from "@/src/pages/about/ImageCrossFade";
import ProcessTimeline from "@/src/pages/about/ProcessTimelineSection";
import TeamSection from "@/src/pages/about/TeamSection";
import TravelInspirationGallery from "@/src/pages/about/TravelInspirationGallery";
import { client } from "@/src/sanity/client";

interface AboutPageProps {
  progression: {
    image: SanityImageSource;
  }[];
  timeline: {
    title: string;
    description: string;
    steps: {
      title: string;
      icon: string; // Icon component name as string
      image: SanityImageSource;
      description: string;
    }[];
  };
  travel: {
    title: string;
    description: string;
    items: {
      title: string;
      subtitle: string;
      image: SanityImageSource;
    }[];
  };
  team: {
    title: string;
    description: string;
    members: {
      name: string;
      title: string;
      content: string;
      image: SanityImageSource;
    }[];
  };
}

export default function AboutPage({ about }: { about: AboutPageProps }) {
  return (
    <>
      <PageMeta
        title="About | Soho Spaces"
        description="Learn about Soho Spaces, a full-service interior design studio in Atlanta dedicated to creating thoughtful, story-driven spaces."
        url={PAGES.about}
        pageType="about"
      />

      <Header sticky={true} transparent />

      <FullWidthSection
        sx={{
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
          py: {
            xs: 2,
            md: 0,
          },
        }}
      >
        <ImageCrossFade images={about.progression} />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
          py: {
            xs: 4,
            md: 0,
          },
          paddingTop: {
            md: 6,
          },
          paddingBottom: {
            md: 2,
          },
        }}
      >
        <Column
          sx={{
            gap: {
              xs: 4,
              md: 8,
            },
          }}
        >
          <Column
            sx={{
              width: "100%",
              maxWidth: MAX_WIDTH_TEXT_CONTAINER,
              gap: 2,
              alignItems: "center",
              mx: "auto",
            }}
          >
            <SectionTitle title={about.timeline.title} />
            <Typography color="text.secondary">
              {about.timeline.description}
            </Typography>
          </Column>
          <ProcessTimeline timelineData={about.timeline.steps} />
        </Column>
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#D1C8B7",
          py: {
            md: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
        }}
      >
        <TravelInspirationGallery
          title={about.travel.title}
          description={about.travel.description}
          images={about.travel.items}
        />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          py: {
            xs: 8,
            md: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
          alignItems: "center",
        }}
      >
        <Column
          sx={{
            gap: 2,
          }}
        >
          <Column
            sx={{
              width: "100%",
              maxWidth: MAX_WIDTH_TEXT_CONTAINER,
              gap: 2,
              alignItems: "center",
              mx: "auto",
            }}
          >
            <SectionTitle title={about.team.title} />
            <Typography color="text.secondary">
              {about.team.description}
            </Typography>
          </Column>
          <TeamSection team={about.team.members} />
        </Column>
      </FullWidthSection>

      <Footer />
    </>
  );
}

const ABOUTPAGE_SANITY_ID = "0d8bb2fe-24cb-4145-a0e9-58a3b197f1e4";

export const getStaticProps = async () => {
  const about = await client.fetch(
    `*[_type == "about" && _id == $id][0]{
    progression[] {
      "image": image->image{
        ...,
        asset->
      }
    },
    timeline {
      title,
      description,
      steps[] {
        title,
        icon,
        "image": image->image{
          ...,
          asset->
        },
        description
      }
    },
    travel {
      title,
      description,
      items[] {
        title,
        subtitle,
        "image": image->image{
          ...,
          asset->
        }
      }
    },
    team {
      title,
      description,
      members[] {
        name,
        title,
        content,
        "image": image->image{
          ...,
          asset->
        }
      }
    }
  }`,
    { id: ABOUTPAGE_SANITY_ID }
  );

  // Validate all required sections are present
  const requiredKeys = ["progression", "timeline", "travel", "team"];
  if (!about || !requiredKeys.every((key) => about[key])) {
    return { notFound: true };
  }

  return {
    props: { about },
  };
};

const mockData = {
  progression: ["/emily_bedroom.png", "/IMG_0017.jpeg"],
  timeline: [
    {
      title: "Design Consultation",
      icon: GroupsIcon,
      image: "/IMG_0020.jpeg",
      description: `The initial meeting will occur in your home to discuss your
      needs, desires, wish list, and budget, aiming to establish a
      vision for your residence. This two-hour session provides an
      opportunity for us to become acquainted and determine how we
      will transform your rooms into a seamlessly beautiful and
      functional home.`,
    },
    {
      title: "Design Proposal & Approval",
      icon: DriveFileRenameOutlineIcon,
      image: "/IMG_0020.jpeg",
      description: `With a finalized preliminary design plan that outlines the scope
      of work and budget, the next step is to create a legally binding
      Letter of Agreement tailored to your project. Upon the mutual
      signing of this document and the receipt of a retainer, we will
      commence the Planning Phase of your project.`,
    },
    {
      title: "Concept and Detailed Design",
      icon: TipsAndUpdatesIcon,
      image: "/IMG_0020.jpeg",
      description: `We kick off the design phase, diving into the creative process
      where our team gathers all those exciting design ideas we've
      been brewing. As construction is often a component, we meet with
      trades and contractors to validate the possibilities on your
      wish list. Subsequently, we source furnishings, finishes, and
      fixtures while concurrently developing the design plans, which
      you will have the opportunity to review in the next stage.`,
    },
    {
      title: "Presentation",
      icon: CoPresentIcon,
      image: "/IMG_0020.jpeg",
      description:
        "Once the design plan is finalized, we will present the reimagined rooms and the overall space, bringing it to life with detailed drawings, fabric swatches, and finish samples. Depending on the project's scale, phased presentations may be required. If any revisions or tweaks are requested, we'll meticulously fine-tune them by exploring alternatives, ensuring you end up with the perfect design plan that resonates with your preferences.",
    },
    {
      title: "Implementation",
      icon: ConstructionIcon,
      image: "/IMG_0020.jpeg",
      description:
        "It's ordering time! After you've given the green light to your design, we swing into action by reaching out to our suppliers and meticulously tracking timelines for smooth deliveries. In tandem with our contractor, we take charge of ensuring the flawless execution of the Design Plans. Consider this a stress-free zone for you, as we handle all the details and project manage the design and build process from start to finish.",
    },
  ],
  team: [
    {
      heroImage: "/team_maisa.jpeg",
      name: "Maisa Sohail",
      title: "Co-Founder, Principal Designer",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    },
    {
      heroImage: "/team_kevin.jpeg",
      name: "Tahaiya Sohail",
      title: "Co-Founder, Head of Sales",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    },
    {
      heroImage: "/team_maisa.jpeg",
      name: "Kevin Xu",
      title: "Co-Founder, Technical Architect",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    },
  ],
  travel: [
    {
      src: "/IMG_0002_landscape.jpeg",
      title: "Hand-painted umbrellas",
      subtitle: "Chiang Mai, Thailand",
    },
    {
      src: "/IMG_0004.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0008.jpeg",
      title: "Watercolor scroll",
      subtitle: "Guangzhou, China",
    },
    {
      src: "/IMG_0008.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0002_landscape.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0004.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0004.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0008.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
    {
      src: "/IMG_0002_landscape.jpeg",
      title: "Brass towel bar",
      subtitle: "Bangkok, Thailand",
    },
  ],
};
