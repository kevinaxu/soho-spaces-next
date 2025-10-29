import { Box, Typography } from "@mui/material";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Column } from "@/src/components/Layout";
import ContactFormSection from "@/src/pages/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <>
      <Header sticky={true} />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "70vh",
          maxHeight: {
            md: "800px",
          },
          gap: 4,
        }}
      >
        {/* Left Column: Sidebar Image */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "33%",
            backgroundImage: `url(${mockData.sidebarImage})`,
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
            px: { xs: 2, md: 12 },
            py: { xs: 4, md: 8 },
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
            <Typography variant="h2" sx={{ fontStyle: "italic" }}>
              {mockData.title}
            </Typography>
            <Typography color="text.secondary">
              {mockData.description}
            </Typography>
          </Column>
          <ContactFormSection />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

const mockData = {
  sidebarImage: "/IMG_0008.jpeg",
  title: "Design your dream space with us",
  description:
    "Whether you're starting fresh or refining a vision,we would love to learn more about how we can help you bring your design vision to life.",
};
