import React from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    underline="hover"
    color="inherit"
    sx={{
      color: "#000", // set link text to black
      fontWeight: 500,
      fontSize: "1.05rem",
      textTransform: "none",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    }}
  >
    {children}
  </Link>
);

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fdf6e3", // cream/off-white background
        // backgroundColor: "#F7F6F0", // nate berkus off white
        boxShadow: "none", // remove AppBar shadow
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left links */}
        <Box sx={{ display: "flex", gap: 8 }}>
          <NavLink href="/about">ABOUT</NavLink>
          <NavLink href="/portfolio">PORTFOLIO</NavLink>
        </Box>

        {/* Center title */}
        <Typography
          variant="h3"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: 600,
            color: "#000",
          }}
        >
          soho spaces
        </Typography>

        {/* Right links */}
        <Box sx={{ display: "flex", gap: 8 }}>
          <NavLink href="/services">SERVICES</NavLink>
          <NavLink href="/about">ABOUT</NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
