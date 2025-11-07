import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Typography, Fade } from "@mui/material";
import { useState, useEffect } from "react";

import { Row, Column } from "@/src/components/Layout";

interface ComparisonSectionProps {
  title: string;
  description: string;
  before: string;
  after: string;
}

export function ComparisonSection(props: ComparisonSectionProps) {
  const { title, description, before, after } = props;
  const images = [before, after];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Row>
      <Row
        sx={{
          width: "100vw",
          height: "90vh",
          position: "relative", // parent for absolute children
          justifyContent: "center",
          alignItems: "center",
          px: 4,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 1,
            // opacity: 0.2,
          }}
        >
          {images.map((src, index) => (
            <Fade key={index} in={index === current} timeout={2000}>
              <Box
                component="img"
                src={src}
                alt={`Image ${index}`}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  top: 0,
                  left: 0,
                }}
              />
            </Fade>
          ))}
        </Box>

        {/* Semi-transparent overlay */}
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.4)", // 50% opacity, black
            // backgroundColor: "rgba(255,255,255,0.1)", // semi-transparent white
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        />

        {/* Text content */}
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            maxWidth: "600px",
            color: "#fff",
            zIndex: 3,
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
              <Typography variant="h2" sx={{ fontStyle: "italic" }}>
                {title}
              </Typography>
            </Row>
            <Row
              sx={{
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: "footer.contrastText",
                  variant: "body1",
                }}
              >
                {description}
              </Typography>
              <ArrowRightAltIcon
                sx={{
                  transform: {
                    xs: "scaleX(1.5)",
                    md: "scaleX(1.8)",
                  },
                }}
              />
            </Row>
          </Column>
        </Box>
      </Row>
    </Row>
  );
}
