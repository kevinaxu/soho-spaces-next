import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

import { Column } from "@/src/components/Layout";

interface SectionProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  gap?: number;
  sx?: SxProps<Theme>;
}

export const Section: React.FC<SectionProps> = ({
  children,
  maxWidth = 1200,
  gap = 4,
  sx,
}) => (
  <Column
    sx={{
      pt: 4,
      pb: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap,
      mx: "auto",
      maxWidth,
      ...sx,
    }}
  >
    {children}
  </Column>
);

interface FullWidthSectionProps {
  children: React.ReactNode;
  bgcolor?: string;
  py?: number;
  px?: number;
  sx?: SxProps<Theme>;
}

export const FullWidthSection: React.FC<FullWidthSectionProps> = ({
  children,
  bgcolor,
  py = 12,
  px = 0,
  sx,
}) => (
  <Box sx={{ display: "flex", justifyContent: "center", bgcolor, py, ...sx }}>
    <Box sx={{ width: "100%" }}>{children}</Box>
  </Box>
);
