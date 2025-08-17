import { PortableText } from "@portabletext/react";
import Typography from "@mui/material/Typography";
import type { PortableTextBlock } from "@portabletext/types";

export function parsePortableText(body: PortableTextBlock[]) {
  if (!body) return null;

  return (
    <PortableText
      value={body}
      components={{
        block: {
          normal: ({ children }) => (
            <Typography variant="body1">{children}</Typography>
          ),
          h1: ({ children }) => (
            <Typography variant="h1">{children}</Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h2">{children}</Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h3">{children}</Typography>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <Typography component="span" fontWeight="bold">
              {children}
            </Typography>
          ),
          em: ({ children }) => (
            <Typography component="span" fontStyle="italic">
              {children}
            </Typography>
          ),
          code: ({ children }) => (
            <Typography
              component="code"
              sx={{ backgroundColor: "rgba(0,0,0,0.05)", px: 0.5, py: 0.25 }}
            >
              {children}
            </Typography>
          ),
        },
      }}
    />
  );
}
