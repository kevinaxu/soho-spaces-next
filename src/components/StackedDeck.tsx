import { useState } from "react";
import { Row, Column } from "../components/Layout";
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

  return (
    <Box sx={{ position: "relative", width: "100%", height: 700 }}>
      {cards.map((card, index) => {
        let rightOffset: number;

        if (index === 0) {
          // bottom card: full width
          rightOffset = 0;
        } else if (index === 1) {
          // second-to-last card
          rightOffset = OFFSET_BASE;
        } else {
          // all other top cards
          rightOffset = OFFSET_BASE + OFFSET * (index - 1);
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

      {/* Fixed label column */}
      <Row
        sx={{
          position: "absolute",
          px: 4,
          py: 2,
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
