import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import Box from "@mui/material/Box";

interface GalleryItem {
  _id: string;
  url: string;
  title: string;
}

interface PhotoComparisonProps {
  before: GalleryItem;
  after: GalleryItem;
}

export default function PhotoComparison({
  before,
  after,
}: PhotoComparisonProps) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: {
          xs: 500,
          sm: 600,
        },
      }}
    >
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={before.url} alt="Before" />}
        itemTwo={<ReactCompareSliderImage src={after.url} alt="After" />}
        handle={<ReactCompareSliderHandle />}
      />
    </Box>
  );
}
