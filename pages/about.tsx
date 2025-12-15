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
            lg: PADDING_X_SECTION,
          },
          py: {
            xs: 2,
            lg: 0,
          },
        }}
      >
        <ImageCrossFade images={about.progression} />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          px: {
            xs: PADDING_X_MOBILE,
            lg: PADDING_X_SECTION,
          },
          py: {
            xs: 4,
            lg: 0,
          },
          paddingTop: {
            lg: 6,
          },
          paddingBottom: {
            lg: 2,
          },
        }}
      >
        <Column
          sx={{
            gap: {
              xs: 4,
              lg: 8,
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
            lg: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            lg: PADDING_X_SECTION,
          },
        }}
      >
        <TravelInspirationGallery
          title={about.travel.title}
          description={about.travel.description}
          images={about.travel.items}
        />
      </FullWidthSection>

      {/* <FullWidthSection
        sx={{
          py: {
            xs: 8,
            lg: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            lg: PADDING_X_SECTION,
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
      </FullWidthSection> */}

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
    // team {
    //   title,
    //   description,
    //   members[] {
    //     name,
    //     title,
    //     content,
    //     "image": image->image{
    //       ...,
    //       asset->
    //     }
    //   }
    // }
  }`,
    { id: ABOUTPAGE_SANITY_ID }
  );

  // Validate all required sections are present
  const requiredKeys = ["progression", "timeline", "travel"];
  if (!about || !requiredKeys.every((key) => about[key])) {
    return { notFound: true };
  }

  return {
    props: { about },
  };
};
