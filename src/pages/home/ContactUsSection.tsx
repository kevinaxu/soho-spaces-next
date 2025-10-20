import { Box, Typography } from "@mui/material";
import { Row, Column } from "@/src/components/Layout";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export function ContactUsSection() {
  return (
    <Row
      sx={{
        padding: 4,
      }}
    >
      <Row
        sx={{
          height: "100vh",
          width: "100vw",
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
            height: "100%",
            backgroundImage: `url("/shady_glen_sketch.png")`,
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
                Ready to transform your space? Schedule a design consultation
                and bring your vision to life.
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
                  variant: "h4",
                }}
              >
                book a call
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
