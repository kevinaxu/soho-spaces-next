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
import { useRouter } from "next/router";
import { useState } from "react";

import { PADDING_X_MOBILE, PAGES, PROJECTS } from "@/src/constants";

const links = [
  { label: "About", href: PAGES.about },
  {
    label: "Portfolio",
    href: PAGES.portfolio,
    children: [
      {
        label: "Posh Nouveau",
        href: `${PAGES.portfolio}/${PROJECTS.poshNouveau}`,
      },
      {
        label: "Mediterranean Garden",
        href: `${PAGES.portfolio}/${PROJECTS.mediterraneanGarden}`,
      },
      {
        label: "Modern Gothic",
        href: `${PAGES.portfolio}/${PROJECTS.modernGothic}`,
      },
    ],
  },
  { label: "Explore", href: PAGES.explore },
  { label: "Contact", href: PAGES.contact },
];

export default function Header({
  sticky,
  transparent,
}: {
  sticky: boolean;
  transparent?: boolean;
}) {
  const router = useRouter();
  const pathname = router.asPath;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        transform: sticky ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 220ms ease, background-color 200ms ease",
        ...(transparent
          ? {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)", // <-- frosted glass effect
            }
          : {
              backgroundColor: (theme) => theme.palette.background.default,
            }),
        pointerEvents: sticky ? "auto" : "none",
        color: (theme) => theme.palette.text.primary,
        paddingX: {
          xs: PADDING_X_MOBILE,
          lg: 0,
        },
        paddingY: {
          xs: 1,
          lg: 0,
        },
        zIndex: (theme) => theme.zIndex.appBar,
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
            lg: 2,
          },
          minHeight: {
            xs: 12,
            lg: 40,
          }, // Adjust these values to shrink the height
        }}
      >
        <Typography
          component="a"
          variant="h6"
          href={PAGES.home}
          sx={{
            // fontSize: {
            //   lg: "1rem",
            //   xs: "1.5rem",
            // },
            fontWeight: 400,
            color: "inherit",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          SOHO SPACES
        </Typography>

        {/* Desktop Header */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 3 }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Typography
                key={link.label}
                component="a"
                variant="body2"
                href={link.href}
                sx={{
                  fontWeight: 400,
                  fontStyle: isActive ? "italic" : "normal", // italicize if active page
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {link.label}
              </Typography>
            );
          })}
        </Box>

        {/* Mobile Header */}
        <Box sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center" }}>
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
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.25)", // light dim, page still visible
          },
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: 300,
            lg: 400,
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
            <MobileNavItem
              key={link.label}
              label={link.label}
              href={link.href}
              onClick={onClose}
            >
              {link.children?.map((child) => (
                <MobileNavItem
                  key={child.label}
                  label={child.label}
                  href={child.href}
                  onClick={onClose}
                  sx={{ pl: 4 }}
                />
              ))}
            </MobileNavItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

function MobileNavItem({
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
  const router = useRouter();
  const pathname = router.asPath;
  const isActive = href === pathname;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component="a"
          href={href}
          onClick={onClick}
          sx={{
            fontStyle: isActive ? "italic" : "normal",
            ...sx,
          }}
        >
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
      {children}
    </>
  );
}
