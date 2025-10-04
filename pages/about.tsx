import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ProcessTimeline from "../src/components/ProcessTimeline";
import TeamSection from "../src/components/TeamSection";
import {
  Box,
  Typography,
  Fade,
  useMediaQuery,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Row, Column } from "../src/components/Layout";
import ImageCrossFade from "../src/components/ImageCrossFade";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ConstructionIcon from "@mui/icons-material/Construction";
import StickyBox from "../src/components/StickyBox";

export default function AboutPage({}) {
  return (
    <>
      <Header sticky={false} />

      <Column
        sx={{
          pt: 4,
          pb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // centers inner column horizontally
          gap: 4,
        }}
      >
        <Column
          sx={{
            maxWidth: "1200px",
            pb: 8,
          }}
        >
          <ImageCrossFade images={images} />
        </Column>

        <Column
          sx={{
            gap: 3,
            alignItems: "center",
            textAlign: "center",
            maxWidth: "800px",
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
        <ProcessTimeline timelineData={timelineData} />
      </Column>

      <ImageListSectionWithStickyLeft />

      <Column
        sx={{
          py: 12,
          px: 2,
          mx: "auto",
          maxWidth: "1200px",
          alignItems: "center", // centers children horizontally
          gap: 8,
        }}
      >
        <Column
          sx={{
            gap: 3,
            alignItems: "center",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          <Typography variant="h2" sx={{ fontStyle: "italic" }}>
            Meet the Team
          </Typography>
          <Typography color="text.secondary">
            Soho Spaces was a dream for Maisa and Tahaiya. They always loved
            experimenting with design, a passion which started from a young age
            decorating their rooms. It wasnt until Maisa met Kevin that Soho
            Spaces became a reality.
          </Typography>
        </Column>
        <TeamSection team={team} />
      </Column>

      <Footer />
    </>
  );
}

function ImageListSectionWithStickyLeft() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        py: 12,
        justifyContent: "center",
        width: "100%",
        mx: "auto",
        position: "relative",
        bgcolor: "#e3e2dc",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <StickyBox top={theme.spacing(8)}>
          <Column
            sx={{
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Typography variant="h3" gutterBottom sx={{ fontStyle: "italic" }}>
              Design inspired by the world
            </Typography>
            <Typography color="text.secondary">
              Through our travels, we discover inspiration in every corner of
              the world — from the textures of local markets to the architecture
              of distant cities. Each journey allows us to source unique,
              handcrafted pieces and uncover emerging design styles that bring
              depth and authenticity to our interiors.
            </Typography>
          </Column>
        </StickyBox>

        {/* RIGHT COLUMN (3x3 Image Grid) */}
        <Box sx={{ flex: 1, p: 4 }}>
          {/* taller than width */}
          <ImageList cols={3} gap={16} rowHeight={300}>
            {travelImages.map((item, i) => (
              <ImageListItem
                key={i}
                sx={{
                  "&:hover .MuiImageListItemBar-root": {
                    opacity: 1,
                  },
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.subtitle}
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
    </Box>
  );
}

const timelineData = [
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
];

const images = [
  "/emily_bedroom.png",
  "https://soho-spaces.com/assets/moody-romantic/IMG_0017.jpeg",
];

const team = [
  {
    heroImage: "/team_maisa.jpg",
    name: "Maisa Sohail",
    title: "Co-Founder, Principal Designer",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  },
  {
    heroImage: "https://soho-spaces.com/assets/home/sohail_sisters.jpeg",
    name: "Tahaiya Sohail",
    title: "Co-Founder, Head of Sales",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  },
  {
    heroImage: "/team_kevin.jpg",
    name: "Kevin Xu",
    title: "Co-Founder, Technical Architect",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  },
];

const travelImages = [
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
