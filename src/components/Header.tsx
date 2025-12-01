import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

import { PADDING_X_MOBILE, PAGES } from "../constants";

const links = [
  { label: "about", href: PAGES.about },
  {
    label: "portfolio",
    href: PAGES.portfolio,
    children: [
      { label: "Dark Academia", href: "/portfolio/dark-academia-living-room" },
      { label: "Modern Gothic", href: "/" },
      { label: "Moody Romantic", href: "/" },
    ],
  },
  { label: "contact", href: PAGES.contact },
];

export default function Header({
  sticky,
  transparent,
}: {
  sticky: boolean;
  transparent?: boolean;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar
      position={sticky ? "sticky" : "relative"}
      elevation={0}
      sx={{
        ...(transparent
          ? {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)", // <-- frosted glass effect
            }
          : {
              backgroundColor: (theme) => theme.palette.background.default,
            }),
        color: (theme) => theme.palette.text.primary,
        paddingX: {
          xs: PADDING_X_MOBILE,
          md: 0,
        },
        paddingY: {
          xs: 1,
          md: 0,
        },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          paddingX: {
            xs: 0,
            md: 2,
          },
          minHeight: {
            xs: 12,
            md: 40,
          }, // Adjust these values to shrink the height
        }}
      >
        <Typography
          component="a"
          variant="h6"
          href={PAGES.home}
          sx={{
            // fontSize: {
            //   md: "1rem",
            //   xs: "1.5rem",
            // },
            fontWeight: 400,
            // fontStyle: "italic",
            color: "inherit",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          SOHO SPACES
        </Typography>

        {/* Desktop Header */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {links.map((link) => (
            <Typography
              key={link.label}
              component="a"
              variant="body2"
              href={link.href}
              sx={{
                fontWeight: 400,
                color: "inherit",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {link.label.toUpperCase()}
            </Typography>
          ))}
        </Box>

        {/* Mobile Header */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <MobileDrawer open={drawerOpen} onClose={toggleDrawer} />
      </Toolbar>
    </AppBar>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: {
            xs: 300,
            md: 400,
          },
          position: "relative", // needed for absolute logo
          minHeight: "100%", // ensure logo is at bottom
          height: "100vh", // take full screen height
        }}
        role="presentation"
      >
        {/* Background logo */}
        <Box
          component="img"
          src="https://soho-spaces.com/assets/soho_logo_black.svg"
          alt="soho spaces logo"
          sx={{
            position: "absolute",
            bottom: 16, // small gap from bottom
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.1,
            width: 180,
            height: "auto",
            pointerEvents: "none", // non-interactive
            zIndex: 0,
          }}
        />

        <List>
          {links.map((link) => (
            <NavItem
              key={link.label}
              label={link.label}
              href={link.href}
              onClick={onClose}
            >
              {link.children?.map((child) => (
                <NavItem
                  key={child.label}
                  label={child.label}
                  href={child.href}
                  onClick={onClose}
                  sx={{ pl: 4 }}
                />
              ))}
            </NavItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

function NavItem({
  label,
  href,
  onClick,
  sx,
  children,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  sx?: object;
  children?: React.ReactNode;
}) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton component="a" href={href} onClick={onClick} sx={sx}>
          <ListItemText primary={label.toUpperCase()} />
        </ListItemButton>
      </ListItem>
      {children}
    </>
  );
}
