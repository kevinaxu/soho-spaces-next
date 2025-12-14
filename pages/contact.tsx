import { Box, Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Column } from "@/src/components/Layout";
import PageMeta from "@/src/components/PageMeta";
import { buildSanitySrc } from "@/src/components/ResponsiveSanityImage";
import { SectionTitle } from "@/src/components/SectionTitle";
import { PAGES } from "@/src/constants";
import ContactFormSection from "@/src/pages/contact/ContactFormSection";
import { client } from "@/src/sanity/client";

interface ContactPageProps {
  title: string;
  description: string;
  image: SanityImageSource;
}

export default function ContactPage({
  contact,
}: {
  contact: ContactPageProps;
}) {
  return (
    <>
      <PageMeta
        title="Contact | Soho Spaces"
        description="Get in touch with Soho Spaces for interior design inquiries, consultations, or project collaborations."
        url={PAGES.contact}
        pageType="contact"
      />

      <Header sticky={true} />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "70vh",
          maxHeight: {
            lg: "800px",
          },
          gap: 4,
        }}
      >
        {/* Left Column: Sidebar Image */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "33%",
            backgroundImage: `url(${buildSanitySrc(contact.image)})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        />

        {/* Right Column: Contact Form */}
        <Box
          sx={{
            flex: 2,
            px: { xs: 2, lg: 12 },
            py: { xs: 4, lg: 8 },
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxWidth: "100%",
            height: "100%",
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
            <SectionTitle title={contact.title} gutterBottom={false} />
            <Typography color="text.secondary">
              {contact.description}
            </Typography>
          </Column>
          <ContactFormSection />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

const CONTACT_PAGE_SANITY_ID = "3247358a-6337-402f-87e5-1638f9a34f21";

export const getStaticProps = async () => {
  const contact = await client.fetch(
    `*[_type == "contact" && _id == $id][0]{
      title,
      description,
        "image": image->image{
          ...,
          asset->
        },
  }`,
    { id: CONTACT_PAGE_SANITY_ID }
  );

  // Validate all required sections are present
  if (!contact) {
    return { notFound: true };
  }

  return {
    props: { contact },
  };
};

const mockData = {
  sidebarImage: "/IMG_0008.jpeg",
  title: "Design your dream space with us",
  description:
    "Whether you're starting fresh or refining a vision,we would love to learn more about how we can help you bring your design vision to life.",
};
