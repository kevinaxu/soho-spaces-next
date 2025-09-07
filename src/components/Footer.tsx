import { Row, Column } from "./Layout";
import { Box, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
import Link from "@mui/material/Link";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  const theme = useTheme();
  return (
    <Column
      paddingY={2}
      paddingX={4}
      gap={2}
      sx={{
        backgroundColor: theme.palette.footer.main,
        color: theme.palette.common.white,
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
      display="flex"
      width="100%"
      gap={4}
      paddingY={2}
      sx={{
        flexDirection: {
          xs: "column",
          md: "row",
        },
        justifyContent: {
          xs: "center",
          md: "space-between",
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
        gap={2}
        sx={{
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
    <Typography variant="h2" color="common.white">
      SOHO SPACES
    </Typography>
  );
}

function FooterMainLinks() {
  return (
    <Row
      gap={12}
      sx={{
        width: {
          xs: "100%",
          sm: "fit-content",
        },
      }}
    >
      <Column gap={1}>
        <Typography variant="h5" fontWeight="medium">
          explore
        </Typography>
        <Link color="common.white" variant="body2" underline="hover" href="#">
          moody romantic
        </Link>
        <Link color="common.white" variant="body2" underline="hover" href="#">
          dark academia
        </Link>
        <Link color="common.white" variant="body2" underline="hover" href="#">
          modern gothic
        </Link>
        <Link color="common.white" variant="body2" underline="hover" href="#">
          east meets west
        </Link>
      </Column>
      <Column gap={1}>
        <Typography variant="h5" fontWeight="medium">
          contact us
        </Typography>
        <Link
          color="common.white"
          variant="body2"
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
          color="common.white"
          variant="body2"
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
          color="common.white"
          variant="body2"
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
      display="flex"
      width="100%"
      alignItems="center"
      sx={{
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
        <Typography variant="body2" color="common.white">
          Terms of Service / Westside Labs
        </Typography>
      </Row>
      <Row>
        <Typography variant="body2" color="common.white">
          Created by Westside Labs
        </Typography>
      </Row>
    </Box>
  );
}
