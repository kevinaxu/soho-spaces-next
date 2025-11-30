import { Typography, SxProps, Theme } from "@mui/material";

export function SectionTitle({
  title,
  italicize = false,
  gutterBottom = true,
  sx,
}: {
  title: string;
  italicize?: boolean;
  gutterBottom?: boolean;
  sx?: SxProps<Theme>;
}) {
  return (
    <Typography
      variant="h3"
      gutterBottom={gutterBottom}
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
  gutterBottom = true,
  sx,
}: {
  title: string;
  gutterBottom?: boolean;
  sx?: SxProps<Theme>;
}) {
  return (
    <Typography variant="h6" gutterBottom={gutterBottom} sx={sx}>
      {title.toUpperCase()}
    </Typography>
  );
}
