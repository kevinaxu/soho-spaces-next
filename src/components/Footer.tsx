import { Row, Column } from "./Layout";
import { Box, Typography, Divider } from "@mui/material";
import { lighten } from "@mui/material/styles";
import Link from "@mui/material/Link";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();
  return (
    <Column
      sx={{
        gap: 2,
        backgroundColor: "footer.main",
        color: "footer.contrastText",
        paddingX: {
          xs: 4,
          md: 8,
        },
        paddingTop: {
          xs: 4,
          md: 8,
        },
        paddingBottom: 2,
      }}
    >
      <FooterMain />
      <Divider
        sx={{
          borderColor: lighten(theme.palette.footer.main, 0.5),
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
          md: "row",
        },
        justifyContent: {
          xs: "center",
          md: "space-between",
        },
        paddingBottom: {
          xs: 4,
          md: 2,
        },
        paddingTop: {
          xs: 8,
          md: 2,
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "fit-content",
          },
        }}
      >
        <FooterMainLogo />
      </Box>
      <Box
        sx={{
          gap: 2,
          width: {
            xs: "100%",
            md: "fit-content",
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
      alt="sohoh spaces logo"
      sx={{ width: 120, height: "auto" }}
    />
  );
}

function FooterMainLinks() {
  return (
    <Row
      sx={{
        width: {
          xs: "100%",
          md: "fit-content",
        },
        gap: {
          xs: 6,
          md: 12,
        },
      }}
    >
      <Column gap={1}>
        <Row paddingBottom={1}>
          <Typography variant="h5" fontWeight="medium">
            explore
          </Typography>
        </Row>
        <Link color="inherit" variant="subtitle1" underline="hover" href="#">
          moody romantic
        </Link>
        <Link color="inherit" variant="subtitle1" underline="hover" href="#">
          dark academia
        </Link>
        <Link color="inherit" variant="subtitle1" underline="hover" href="#">
          modern gothic
        </Link>
        <Link color="inherit" variant="subtitle1" underline="hover" href="#">
          east meets west
        </Link>
      </Column>
      <Column gap={1}>
        <Row paddingBottom={1}>
          <Typography variant="h5" fontWeight="medium">
            contact us
          </Typography>
        </Row>
        <Link
          color="inherit"
          variant="subtitle1"
          underline="hover"
          href="mailto:hello@soho-spaces.com"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          <EmailIcon fontSize="small" />
          hello@soho-spaces.com
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
          <PhoneIcon fontSize="small" />
          404.566.5796
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
          md: "row",
        },
        justifyContent: {
          xs: "center",
          md: "space-between",
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
