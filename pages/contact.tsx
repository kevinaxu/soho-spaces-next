import { Box, Typography } from "@mui/material";
import React from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { Column } from "@/src/components/Layout";
import ContactFormSection from "@/src/pages/contact/ContactFormSection";

const sidebarImage =
  "https://soho-spaces.com/assets/dark-academia/IMG_0008.jpeg";

export default function ContactPage() {
  return (
    <>
      <Header sticky={true} />

      {/* this is the main table shell */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "70vh",
          maxHeight: "800px",
          gap: 4,
        }}
      >
        {/* LEFT COLUMN: Image */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "33%",
            backgroundImage: `url(${sidebarImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />

        {/* RIGHT COLUMN: Form */}
        <Box
          sx={{
            flex: 2,
            px: { xs: 2, md: 12 },
            py: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxWidth: "100%",
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
              Design your dream space with us
            </Typography>
            <Typography color="text.secondary">
              Whether you're starting fresh or refining a vision,we would love
              to learn more about how we can help you bring your design vision
              to life.
            </Typography>
          </Column>

          <ContactFormSection />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
