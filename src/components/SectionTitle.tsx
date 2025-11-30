import { Typography, SxProps, Theme } from "@mui/material";

export function SectionTitle({
  title,
  italicize = false,
  sx,
}: {
  title: string;
  italicize?: boolean;
  sx?: SxProps<Theme>;
}) {
  return (
    <Typography
      variant="h3"
      gutterBottom
      sx={{
        fontStyle: italicize ? "italic" : "normal",
        ...sx,
      }}
    >
      {title.toUpperCase()}
    </Typography>
  );
}

export function SectionSubtitle({
  title,
  sx,
}: {
  title: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Typography variant="h6" gutterBottom sx={sx}>
      {title.toUpperCase()}
    </Typography>
  );
}
