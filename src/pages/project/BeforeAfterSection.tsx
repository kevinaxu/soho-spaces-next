import { Box, useMediaQuery, useTheme } from "@mui/material";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";

interface GalleryItem {
  _id: string;
  url: string;
  title: string;
}

interface BeforeAfterSectionProps {
  before: GalleryItem;
  after: GalleryItem;
}

export default function BeforeAfterSection({
  before,
  after,
}: BeforeAfterSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "16/9",
      }}
    >
      <ReactCompareSlider
        style={{ width: "100%", height: "100%" }}
        itemOne={<ReactCompareSliderImage src={before.url} alt="Before" />}
        itemTwo={<ReactCompareSliderImage src={after.url} alt="After" />}
        handle={
          <ReactCompareSliderHandle
            buttonStyle={
              isMobile
                ? {
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }
                : undefined
            }
          />
        }
      />
    </Box>
  );
}
