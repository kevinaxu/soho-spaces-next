import { Typography } from "@mui/material";

import { Column } from "@/src/components/Layout";
import { MAX_WIDTH_TEXT_CONTAINER } from "@/src/constants";

export function TestimonialSection() {
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
        “Gemma has been a wonderful help in the renovation of my central Bath
        apartment. Gemma has been professionally trained which I specifically
        wanted, as I had already interior design experience but needed some
        extra expert guidance. There were several space planning issues and her
        spatial planning was brilliant, so I had the confidence to buy furniture
        items that I knew would fit. Gemma sourced some AMAZING PIECES that I
        would never have found on my own."
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#f5945c",
          textAlign: "center",
          //   alignSelf: "flex-start",
        }}
      >
        Korbinian Scheitzach, CEO ViscoTec America
      </Typography>
    </Column>
  );
}
