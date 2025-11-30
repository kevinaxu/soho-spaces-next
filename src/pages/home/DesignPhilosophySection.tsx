import { useTheme, useMediaQuery, Typography } from "@mui/material";

import { Row, Column } from "@/src/components/Layout";

interface DesignPhilosophySectionProps {
  title: string;
  subtitle?: string;
}

export function DesignPhilosophySection(props: DesignPhilosophySectionProps) {
  const { title, subtitle } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px

  return (
    <Column
      sx={{
        width: "100%",
        maxWidth: "800px",
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
        <Typography
          variant={isMobile ? "h5" : "h2"}
          sx={{
            // fontStyle: "italic",
            lineHeight: 1.5,
            fontFamily: "Nanum Myeongjo, serif",
            fontWeight: 700,
          }}
        >
          {title} (Nanum Myeongjo)
        </Typography>
      </Row>

      <Row
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h2"}
          sx={{
            // fontStyle: "italic",
            lineHeight: 1.5,
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 700,
          }}
        >
          {title} (Cormorant Garamond)
        </Typography>
      </Row>

      <Row
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h2"}
          sx={{
            fontStyle: "italic",
            lineHeight: 1.5,
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontWeight: 400,
          }}
        >
          {title} (Lexend)
        </Typography>
      </Row>

      {/* {subtitle && (
        <Row
          sx={{
            paddingX: {
              xs: 4,
              md: 12,
            },
            textAlign: "center",
          }}
        >
          <Typography variant="body1">{subtitle}</Typography>
        </Row>
      )} */}
    </Column>
  );
}
