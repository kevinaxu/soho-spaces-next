import { useState, useEffect } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ProcessTimeline from "../src/components/ProcessTimeline";
import TeamSection from "../src/components/TeamSection";
import {
  Box,
  Typography,
  Fade,
  useMediaQuery,
  useTheme,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Row, Column } from "../src/components/Layout";
import ImageCrossFade from "../src/components/ImageCrossFade";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />

      <Footer />
    </>
  );
}
