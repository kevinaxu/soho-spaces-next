import CopyrightIcon from "@mui/icons-material/Copyright";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Typography, Divider, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import { lighten } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

import { Row, Column } from "@/src/components/Layout";
import { SectionSubtitle } from "@/src/components/SectionTitle";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // true if screen < 600px

  return (
    <Column
      sx={{
        position: "relative", // needed for absolute logo
        gap: 2,
        backgroundColor: "footer.main",
        color: "footer.contrastText",
        px: { xs: 4, lg: 8 },
        py: 2, // smaller footer height
        overflow: "hidden", // prevent anything from overflowing the footer
      }}
    >
      {/* Logo as background */}
      <Box
        component="img"
        src="https://soho-spaces.com/assets/soho_logo_white.svg"
        alt="soho spaces logo"
        sx={{
          position: "absolute",
          top: -60, // moves logo above the top of the footer
          bottom: "100%", // aligns the bottom of logo with top of footer
          left: isMobile ? "50%" : "20%",
          transform: "translateX(-50%)",
          opacity: 0.1,
          width: { xs: 300, lg: 400 }, // bigger logo
          height: "auto",
          pointerEvents: "none", // make sure it doesn't block clicks
          zIndex: 0,
        }}
      />

      <FooterMain />
      <Divider
        sx={{
          borderColor: lighten(theme.palette.footer.main, 0.5),
          position: "relative",
          zIndex: 1, // on top of background logo
        }}
      />
      <FooterAttribution />
    </Column>
  );
}

function FooterMain() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        gap: 4,
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        justifyContent: {
          xs: "center",
          lg: "space-between",
        },
        paddingBottom: {
          xs: 2,
          lg: 2,
        },
        paddingTop: {
          lg: 8,
        },
        alignItems: {
          lg: "flex-end", // push columns to bottom
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            lg: "fit-content",
          },
        }}
      >
        {/* Need this here in order to align right column properly */}
        {/* <FooterMainLogo /> */}
      </Box>
      <Box
        sx={{
          gap: 2,
          width: {
            xs: "100%",
            lg: "fit-content",
          },
        }}
      >
        <FooterMainLinks />
      </Box>
    </Box>
  );
}

function FooterMainLogo() {
  return (
    <Box
      component="img"
      src="https://soho-spaces.com/assets/soho_logo_white.svg"
      alt="soho spaces logo"
      sx={{
        opacity: 0.2,
        width: 180,
        height: "auto",
      }}
    />
  );
}

function FooterMainLinks() {
  return (
    <Row
      sx={{
        width: {
          xs: "100%",
          lg: "fit-content",
        },
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        gap: {
          xs: 6,
          lg: 12,
        },
      }}
    >
      <Column gap={1}>
        <Row>
          <SectionSubtitle title="explore" />
        </Row>
        <Link
          color="inherit"
          variant="subtitle1"
          underline="hover"
          href="/portfolio/moody-romantic-bedroom"
        >
          moody romantic
        </Link>
        <Link
          color="inherit"
          variant="subtitle1"
          underline="hover"
          href="/portfolio/dark-academia-living-room"
        >
          dark academia
        </Link>
        <Link
          color="inherit"
          variant="subtitle1"
          underline="hover"
          href="/portfolio/modern-gothic-kitchen"
        >
          modern gothic
        </Link>
      </Column>
      <Column gap={1}>
        <Row>
          <SectionSubtitle title="contact us" />
        </Row>
        <Link
          color="inherit"
          variant="subtitle1"
          underline="hover"
          href="mailto:designdesk@soho-spaces.com"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          <EmailIcon fontSize="small" />
          designdesk@soho-spaces.com
        </Link>
        <Link
          color="inherit"
          variant="subtitle1"
          underline="hover"
          href="#"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          <InstagramIcon fontSize="small" />
          @sohospacesatl
        </Link>
      </Column>
    </Row>
  );
}

function FooterAttribution() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        justifyContent: {
          xs: "center",
          lg: "space-between",
        },
        paddingY: 2,
        gap: 0.5,
      }}
    >
      <Row>
        <Row alignItems="center" gap={0.5}>
          <CopyrightIcon
            fontSize="small"
            sx={{ color: "footer.contrastText" }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              color: "footer.contrastText",
            }}
          >
            2020 Soho Spaces. All Rights Reserved
          </Typography>
        </Row>
      </Row>
      <Row>
        <Typography
          variant="body2"
          sx={{
            color: "footer.contrastText",
          }}
        >
          / Westside Labs
        </Typography>
      </Row>
    </Box>
  );
}
