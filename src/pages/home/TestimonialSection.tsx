import { Typography } from "@mui/material";

import { Column } from "@/src/components/Layout";
import { MAX_WIDTH_TEXT_CONTAINER } from "@/src/constants";

interface TestimonialSectionProps {
  quote: string;
  author: string;
  title: string;
}

export function TestimonialSection(props: TestimonialSectionProps) {
  const { quote, author, title } = props;
  return (
    <Column
      sx={{
        width: "100%",
        maxWidth: MAX_WIDTH_TEXT_CONTAINER,
        gap: 2,
        alignItems: "center",
        mx: "auto",
      }}
    >
      <Typography
        variant="h2"
        sx={{ pb: 4, textAlign: "center", color: "footer.contrastText" }}
      >
        Testimonial
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "footer.contrastText",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        {quote}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#f5945c",
          textAlign: "center",
        }}
      >
        {author}, {title}
      </Typography>
    </Column>
  );
}
