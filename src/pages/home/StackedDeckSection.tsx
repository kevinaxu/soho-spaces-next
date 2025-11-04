import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";

import { Row, Column } from "@/src/components/Layout";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";

const DESKTOP_OFFSET_BASE = 200;
const DESKTOP_OFFSET = 100;
const DESKTOP_REVEAL_OFFSET = 300;

const MOBILE_CARD_HEIGHT = "650px";

interface StackedDeckProps {
  title: string;
  description: string;
  cards: StackedDeckCard[];
}

interface StackedDeckCard {
  title: string;
  description: string;
  bg: string;
}

export default function StackedDeck(
  props: StackedDeckProps
): React.JSX.Element {
  const { title, description, cards } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px

  return (
    <>
      {isMobile ? (
        <StackedDeckMobile
          title={title}
          description={description}
          cards={cards}
        />
      ) : (
        <StackedDeckDesktop
          title={title}
          description={description}
          cards={cards}
        />
      )}
    </>
  );
}

function StackedDeckDesktop(props: StackedDeckProps): React.JSX.Element {
  const { title, description, cards } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const heightPx = 700;

  return (
    <Box sx={{ position: "relative", width: "100%", height: heightPx }}>
      {cards.map((card, index) => {
        let rightOffset: number;

        if (index === 0) {
          rightOffset = 0; // bottom card: full width
        } else if (index === 1) {
          rightOffset = DESKTOP_OFFSET_BASE; // second-to-last card
        } else {
          rightOffset = DESKTOP_OFFSET_BASE + DESKTOP_OFFSET * (index - 1); // all other top cards
        }

        // Apply reveal offset if hovered card is on top
        if (hoveredIndex !== null && index > hoveredIndex) {
          rightOffset += DESKTOP_REVEAL_OFFSET;
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
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ServicesColumn
              numberText={getNumberText(cards.length, cards.indexOf(card))}
              title={card.title}
              description={card.description}
            />
          </Row>
        );
      })}

      <Row
        sx={{
          position: "absolute",
          py: 2,
          px: 4,
          backgroundColor: "#f1eeed",
          zIndex: cards.length + 1,
        }}
      >
        <Box sx={{ maxWidth: 200, gap: 12 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
      </Row>
    </Box>
  );
}

function StackedDeckMobile(props: StackedDeckProps) {
  const { title, description, cards } = props;
  return (
    <>
      <Row
        sx={{
          width: "100%",
          backgroundColor: "#f1eeed",
          paddingY: 4,
        }}
      >
        <Column sx={{ paddingX: PADDING_X_MOBILE, gap: 1 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Column>
      </Row>
      {cards
        .slice()
        .reverse()
        .map((card) => {
          return (
            <Row
              key={card.title}
              sx={{
                alignItems: "center",
                backgroundColor: card.bg,
              }}
            >
              <Row
                key={card.title}
                sx={{
                  padding: PADDING_X_MOBILE,
                }}
              >
                <ServicesColumn
                  numberText={getNumberText(cards.length, cards.indexOf(card))}
                  title={card.title}
                  description={card.description}
                />
              </Row>
            </Row>
          );
        })}
    </>
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
        height: {
          xs: MOBILE_CARD_HEIGHT,
          md: "100%",
        },
        maxWidth: {
          md: 300,
        },
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

function getNumberText(length: number, index: number): string {
  return `${String(length - index).padStart(2, "0")} / ${String(length).padStart(2, "0")}`;
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
