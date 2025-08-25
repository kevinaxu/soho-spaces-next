import { Box, Typography, Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Link from "@mui/material/Link";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#78716C",
        width: "100vw",
        color: theme.palette.common.white,
        px: 2,
        py: 4,
      }}
    >
      {/* two column section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "end",
          gap: 8,
          py: 2,
          px: 4,
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
            py: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
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
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
            py: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
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
        </Box>
      </Box>

      {/* Divider and Terms */}
      <Divider
        sx={{ marginBottom: 2, borderColor: theme.palette.common.white }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
          px: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CopyrightIcon sx={{ color: theme.palette.common.white }} />
          <Typography variant="body2" color="common.white">
            2020 Soho Spaces
          </Typography>
        </Box>
        <Typography variant="body2" color="common.white">
          Terms of Service / Westside Labs
        </Typography>
      </Box>
    </Box>
  );
}
