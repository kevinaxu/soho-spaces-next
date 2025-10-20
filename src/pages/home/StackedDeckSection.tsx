import { useState } from "react";
import { Row, Column } from "@/src/components/Layout";
import { Box, Typography } from "@mui/material";

const OFFSET_BASE = 200;
const OFFSET = 100;
const REVEAL_OFFSET = 300;

interface StackedDeckCard {
  numberText: string;
  title: string;
  bg: string;
  description: string;
}

export default function StackedDeck({
  cards,
}: {
  cards: StackedDeckCard[];
}): React.JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const heightPx = 700;

  return (
    <Box sx={{ position: "relative", width: "100%", height: heightPx }}>
      {cards.map((card, index) => {
        let rightOffset: number;

        if (index === 0) {
          rightOffset = 0; // bottom card: full width
        } else if (index === 1) {
          rightOffset = OFFSET_BASE; // second-to-last card
        } else {
          rightOffset = OFFSET_BASE + OFFSET * (index - 1); // all other top cards
        }

        // Apply reveal offset if hovered card is on top
        if (hoveredIndex !== null && index > hoveredIndex) {
          rightOffset += REVEAL_OFFSET;
        }

        return (
          <Row
            key={card.title}
            sx={{
              position: "absolute",
              inset: 0,
              right: rightOffset,
              width: `calc(100% - ${rightOffset}px)`,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              px: 4,
              pb: 4,
              backgroundColor: card.bg,
              zIndex: index + 1,
              transition: "all 0.3s ease",
              //   cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ServicesColumn
              numberText={card.numberText}
              title={card.title}
              description={card.description}
            />
          </Row>
        );
      })}

      <Row
        sx={{
          position: "absolute",
          py: 4,
          px: 8,
          backgroundColor: "#f1eeed",
          zIndex: cards.length + 1,
        }}
      >
        <Box sx={{ maxWidth: 200, gap: 12 }}>
          <Typography variant="h6">Services</Typography>
          <Typography variant="body1">
            Story and strategy cultivated in every touchpoint.
          </Typography>
        </Box>
      </Row>
    </Box>
  );
}

function ServicesColumn({
  numberText,
  title,
  description,
}: {
  numberText: string;
  title: string;
  description: string;
}): React.JSX.Element {
  return (
    <Column
      sx={{
        justifyContent: "space-between",
        height: "100%",
        maxWidth: 300,
        gap: 8,
      }}
    >
      <Typography variant="body1" sx={{ py: 2, alignSelf: "flex-end" }}>
        {numberText}
      </Typography>
      <Box>
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </Column>
  );
}

/*
const cards = [
  {
    numberText: "04 / 04",
    title: "Content Creation",
    bg: "#bab2a3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "03 / 04",
    title: "Brand Strategy",
    bg: "#c8c0b3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "02 / 04",
    title: "Video Strategy",
    bg: "#d9d3ca",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "01 / 04",
    title: "Video Production",
    bg: "#f1eeed",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
];
*/
