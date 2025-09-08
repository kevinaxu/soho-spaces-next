import { useState } from "react";

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
import MenuIcon from "@mui/icons-material/Menu";

const links = [
  { label: "About", href: "/about" },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: [
      { label: "Modern Gothic", href: "/portfolio/modern-gothic" },
      { label: "Dark Academia", href: "/portfolio/dark-academia" },
      { label: "Moody Romantic", href: "/portfolio/moody-romantic" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ sticky }: { sticky: boolean }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar
      position={sticky ? "sticky" : "relative"}
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="a" href="/" fontSize="1.5rem">
          soho spaces
        </Typography>

        {/* Desktop Header */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {links.map((link) => (
            <Typography
              key={link.label}
              component="a"
              href={link.href}
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {link.label}
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
      <Box sx={{ width: 400 }} role="presentation">
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
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
      {children}
    </>
  );
}
