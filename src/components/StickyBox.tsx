import React from "react";
import { Box, SxProps, Theme } from "@mui/material";

interface StickyBoxProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  top?: number | string | ((theme: Theme) => number | string);
  leftWidth?: string | number;
}

export default function StickyBox({
  children,
  sx = {},
  top = (theme) => theme.spacing(8),
  leftWidth = "40%",
}: StickyBoxProps) {
  return (
    <Box
      sx={{
        flex: { xs: "0 0 auto", md: `0 0 ${leftWidth}` },
        px: 4,
        position: "sticky",
        top,
        alignSelf: "flex-start",
        ...sx, // allow overrides or additions
      }}
    >
      {children}
    </Box>
  );
}
