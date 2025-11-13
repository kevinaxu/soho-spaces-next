import Box from "@mui/material/Box";
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
        handle={<ReactCompareSliderHandle />}
      />
    </Box>
  );
}
