import { Typography } from "@mui/material";

import { Row, Column } from "@/src/components/Layout";

interface DesignPhilosophySectionProps {
  title: string;
  subtitle?: string;
}

export function DesignPhilosophySection(props: DesignPhilosophySectionProps) {
  const { title, subtitle } = props;
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
        <Typography variant="h2" sx={{ fontStyle: "italic" }}>
          {title}
        </Typography>
      </Row>
      {subtitle && (
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
      )}
    </Column>
  );
}
