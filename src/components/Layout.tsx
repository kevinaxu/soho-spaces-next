import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface FlexProps extends BoxProps {
  children?: ReactNode;
}

export function Row({ children, sx = {}, ...props }: FlexProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export function Column({ children, sx = {}, ...props }: FlexProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
