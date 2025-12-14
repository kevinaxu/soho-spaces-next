import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Typography, SxProps, Theme } from "@mui/material";
import { keyframes } from "@mui/system";
import Link from "next/link";

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
  href?: string;
  size?: "sm" | "md" | "lg";
  sx?: SxProps<Theme>;
}

const sizeMap = {
  sm: { xs: 1.2, lg: 1.4, textXs: "caption", textMd: "subtitle2" },
  md: { xs: 1.5, lg: 1.8, textXs: "subtitle1", textMd: "h6" },
  lg: { xs: 1.8, lg: 2.2, textXs: "h6", textMd: "h5" },
};

function ArrowContent({
  animate = false,
  direction = "right",
  title,
  onClick,
  size = "lg",
  sx,
}: ArrowProps) {
  const isLeft = direction === "left";
  const config = sizeMap[size];

  return (
    <Row
      sx={{
        alignItems: "center",
        gap: {
          xs: 0.5,
          lg: 1.5,
        },
        cursor: "pointer",
        "&:hover .arrow-title": {
          textDecoration: "underline", // underline on hover only
        },
      }}
      onClick={onClick}
    >
      {/* Arrow on left */}
      {isLeft && (
        <ArrowRightAltIcon
          sx={{
            transform: {
              xs: `scaleX(-${config.xs}) scaleY(0.7)`,
              lg: `scaleX(-${config.lg}) scaleY(0.7)`,
            },
            animation: animate ? `${nudge} 1s ease-in-out infinite` : "none",
          }}
        />
      )}

      {/* Title */}
      {title && (
        <Typography
          className="arrow-title"
          sx={{
            color: "text.secondary",
            variant: { xs: config.textXs, lg: "body1" },
            textDecoration: "none",
            ...sx,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Arrow on right */}
      {!isLeft && (
        <ArrowRightAltIcon
          sx={{
            transform: {
              xs: `scaleX(${config.xs}) scaleY(0.7)`,
              lg: `scaleX(${config.lg}) scaleY(0.7)`,
            },
            animation: animate ? `${nudge} 1s ease-in-out infinite` : "none",
          }}
        />
      )}
    </Row>
  );
}

export function Arrow(props: ArrowProps) {
  const { href } = props;

  if (href) {
    return (
      <Link
        href={href}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "inline-flex",
        }}
      >
        <ArrowContent {...props} />
      </Link>
    );
  }

  return <ArrowContent {...props} />;
}
