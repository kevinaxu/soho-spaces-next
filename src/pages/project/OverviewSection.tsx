import { Box, Typography } from "@mui/material";

import { Column } from "@/src/components/Layout";

interface OverviewSectionProps {
  title: string;
  description: string;
  details: {
    label: string;
    value: string;
  }[];
}

export function OverviewSection(props: OverviewSectionProps) {
  const { title, description, details } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        // TODO: move this to parent layout
        // same for TravelInspirationGallery component
        py: {
          xs: 8,
          md: 8,
        },
      }}
    >
      {/* column left */}
      <Box sx={{ flex: "0 0 70%" }}>
        <Column sx={{ alignItems: "flex-start", gap: 2 }}>
          <Typography variant="h3" gutterBottom sx={{}}>
            {title}
          </Typography>
          <Typography color="text.secondary">{description}</Typography>
        </Column>
      </Box>

      {/* column right */}
      <Box sx={{ flex: 1 }}>
        <Column
          sx={{
            alignItems: {
              md: "flex-end",
            },
            gap: 1,
          }}
        >
          <Column
            gap={0.5}
            sx={{
              textAlign: {
                md: "end",
              },
            }}
          >
            {details.map((item) => (
              <Typography key={item.label} color="text.secondary">
                <b>{item.label}: </b>
                {item.value}
              </Typography>
            ))}
          </Column>
        </Column>
      </Box>
    </Box>
  );
}
