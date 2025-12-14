import { useTheme, useMediaQuery, Typography } from "@mui/material";

import { Row, Column } from "@/src/components/Layout";

interface DesignPhilosophySectionProps {
  title: string;
  subtitle?: string;
}

export function DesignPhilosophySection(props: DesignPhilosophySectionProps) {
  const { title } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // true if screen < 600px

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
            fontStyle: "italic",
            lineHeight: 1.5,
            fontFamily: "Nanum Myeongjo, serif",
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      </Row>
    </Column>
  );
}
