import { Typography } from "@mui/material";
import { Row, Column } from "@/src/components/Layout";

export function DesignPhilosophySection() {
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
          Our approach is deep rooted in collaboration—an exercise designed to
          uncover the process, perspective, and nuances that define your work.
        </Typography>
      </Row>
      <Row
        sx={{
          paddingX: 12,
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          The wonder—and challenge—of designing digital spaces for interior
          designers is in understanding each ones deeply personal perspective.
          For us, that means tailoring our process to embrace the needs of every
          project.
        </Typography>
      </Row>
    </Column>
  );
}
