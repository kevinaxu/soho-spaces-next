import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

import { Row } from "@/src/components/Layout";

const nudge = keyframes`
  0%, 100% { transform: translateX(0) scaleX(1.8); }
  50% { transform: translateX(5px) scaleX(1.8); }
`;

interface ArrowProps {
  animate?: boolean;
  direction?: "left" | "right";
  title?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { xs: 1.2, md: 1.4, textXs: "caption", textMd: "subtitle2" },
  md: { xs: 1.5, md: 1.8, textXs: "subtitle1", textMd: "h6" },
  lg: { xs: 1.8, md: 2.2, textXs: "h6", textMd: "h5" },
};

export function Arrow({
  animate = false,
  direction = "right",
  title,
  onClick,
  size = "md",
}: ArrowProps) {
  const isLeft = direction === "left";
  const config = sizeMap[size];

  return (
    <Row
      sx={{
        alignItems: "center",
        gap: 1,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {/* Arrow on the left if direction=left */}
      {isLeft && (
        <ArrowRightAltIcon
          sx={{
            transform: {
              xs: `scaleX(-${config.xs})`,
              md: `scaleX(-${config.md})`,
            },
            animation: animate ? `${nudge} 1s ease-in-out infinite` : "none",
          }}
        />
      )}

      {/* Title */}
      {title && (
        <Typography
          sx={{
            variant: { xs: config.textXs, md: config.textMd },
          }}
        >
          {title}
        </Typography>
      )}

      {/* Arrow on the right if direction=right */}
      {!isLeft && (
        <ArrowRightAltIcon
          sx={{
            transform: {
              xs: `scaleX(${config.xs})`,
              md: `scaleX(${config.md})`,
            },
            animation: animate ? `${nudge} 1s ease-in-out infinite` : "none",
          }}
        />
      )}
    </Row>
  );
}
