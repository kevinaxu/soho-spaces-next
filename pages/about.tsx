import ConstructionIcon from "@mui/icons-material/Construction";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Typography } from "@mui/material";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Column } from "@/src/components/Layout";
import { FullWidthSection, Section } from "@/src/components/Section";
import {
  MAX_WIDTH_TEXT_CONTAINER,
  PADDING_X_SECTION,
  PADDING_X_MOBILE,
} from "@/src/constants";
import ImageCrossFade from "@/src/pages/about/ImageCrossFade";
import ProcessTimeline from "@/src/pages/about/ProcessTimelineSection";
import TeamSection from "@/src/pages/about/TeamSection";
import TravelInspirationGallery from "@/src/pages/about/TravelInspirationGallery";

export default function AboutPage({}) {
  return (
    <>
      <Header sticky={false} />

      <FullWidthSection
        sx={{
          px: {
            xs: PADDING_X_MOBILE,
          },
          py: {
            xs: 0,
          },
        }}
      >
        <ImageCrossFade images={mockData.progression} />
      </FullWidthSection>

      <Section>
        <Column
          sx={{
            gap: 3,
            alignItems: "center",
            textAlign: "center",
            maxWidth: 800,
            pb: 4,
          }}
        >
          <Typography variant="h2" sx={{ fontStyle: "italic" }}>
            Our Process
          </Typography>
          <Typography color="text.secondary">
            Our clients range from large companies to individual homeowners
            looking to refresh their homes (in some cases even our own
            neighbors). Throughout this process, our goal as designers is to
            understand your vision and provide a plan that works for you. Our
            goal as designers is to understand your vision and provide a plan
            that
          </Typography>
        </Column>
        <ProcessTimeline timelineData={mockData.timeline} />
      </Section>

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
        <TravelInspirationGallery images={mockData.travel} />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          py: 8,
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
          alignItems: "center",
        }}
      >
        <Column
          sx={{
            gap: 4,
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
            <Typography variant="h2" sx={{ fontStyle: "italic" }}>
              Meet the Team
            </Typography>
            <Typography color="text.secondary">
              Soho Spaces was a dream for Maisa and Tahaiya. They always loved
              experimenting with design, a passion which started from a young
              age decorating their rooms. It wasnt until Maisa met Kevin that
              Soho Spaces became a reality.
            </Typography>
          </Column>
          <TeamSection team={mockData.team} />
        </Column>
      </FullWidthSection>

      <Footer />
    </>
  );
}

const mockData = {
  progression: ["/emily_bedroom.png", "/IMG_0017.jpeg"],
  timeline: [
    {
      title: "Design Consultation",
      icon: GroupsIcon,
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
      description: `With a finalized preliminary design plan that outlines the scope
      of work and budget, the next step is to create a legally binding
      Letter of Agreement tailored to your project. Upon the mutual
      signing of this document and the receipt of a retainer, we will
      commence the Planning Phase of your project.`,
    },
    {
      title: "Concept and Detailed Design",
      icon: TipsAndUpdatesIcon,
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
      description:
        "Once the design plan is finalized, we will present the reimagined rooms and the overall space, bringing it to life with detailed drawings, fabric swatches, and finish samples. Depending on the project's scale, phased presentations may be required. If any revisions or tweaks are requested, we'll meticulously fine-tune them by exploring alternatives, ensuring you end up with the perfect design plan that resonates with your preferences.",
    },
    {
      title: "Implementation",
      icon: ConstructionIcon,
      description:
        "It's ordering time! After you've given the green light to your design, we swing into action by reaching out to our suppliers and meticulously tracking timelines for smooth deliveries. In tandem with our contractor, we take charge of ensuring the flawless execution of the Design Plans. Consider this a stress-free zone for you, as we handle all the details and project manage the design and build process from start to finish.",
    },
  ],
  team: [
    {
      heroImage: "/team_maisa.jpg",
      name: "Maisa Sohail",
      title: "Co-Founder, Principal Designer",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    },
    {
      heroImage: "/team_kevin.jpg",
      name: "Tahaiya Sohail",
      title: "Co-Founder, Head of Sales",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    },
    {
      heroImage: "/team_maisa.jpg",
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
