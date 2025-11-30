import { Box, Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import { Arrow } from "@/src/components/Arrow";
import { Row, Column } from "@/src/components/Layout";
import { buildSanitySrc } from "@/src/components/ResponsiveSanityImage";
import { SectionTitle } from "@/src/components/SectionTitle";

interface ContactUsSectionProps {
  title: string;
  src: SanityImageSource;
  cta: string;
}

export function ContactUsSection(props: ContactUsSectionProps) {
  const { title, cta, src } = props;
  return (
    <Row>
      <Row
        sx={{
          width: "100%",
          aspectRatio: "16/9",
          position: "relative", // parent for absolute children
          justifyContent: "center",
          alignItems: "center",
          px: 4,
        }}
      >
        {/* Background image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            aspectRatio: "16/9",
            backgroundImage: `url(${buildSanitySrc(src)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.2,
            zIndex: 1,
          }}
        />

        {/* Semi-transparent overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)", // 50% opacity, black
            // backgroundColor: "rgba(255,255,255,0.8)", // semi-transparent white
            zIndex: 2,
          }}
        />

        {/* Text content */}
        <Link href="/contact" passHref>
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              maxWidth: "600px",
              color: "#fff",
              zIndex: 3,
              textDecoration: "none",
              cursor: "pointer", // makes it clear it's clickable
              "&:hover": { opacity: 0.85 }, // optional hover effect
            }}
          >
            <Column
              sx={{
                width: "100%",
                alignItems: "center",
                mx: "auto",
                gap: 4,
              }}
            >
              <Row
                sx={{
                  textAlign: "center",
                }}
              >
                <SectionTitle title={title} italicize />
              </Row>
              <Row
                sx={{
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Arrow
                  direction="right"
                  title={cta.toLowerCase()}
                  size="md"
                  sx={{
                    color: "footer.contrastText",
                  }}
                />
              </Row>
            </Column>
          </Box>
        </Link>
      </Row>
    </Row>
  );
}
