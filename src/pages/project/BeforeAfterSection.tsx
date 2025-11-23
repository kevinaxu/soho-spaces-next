import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import "keen-slider/keen-slider.min.css";

interface BeforeAfterItem {
  before: { src: string };
  after: { src: string };
}

interface BeforeAfterSectionProps {
  items: BeforeAfterItem[];
}

export default function BeforeAfterSection({ items }: BeforeAfterSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ position: "relative", width: "100%" }}>
        <div ref={sliderRef} className="keen-slider">
          {items.map((item, index) => (
            <Box
              key={index}
              className="keen-slider__slide"
              sx={{
                width: "100%",
                aspectRatio: "16/9",
              }}
            >
              <ReactCompareSlider
                position={20}
                style={{ width: "100%", height: "100%" }}
                itemOne={
                  <ReactCompareSliderImage src={item.before.src} alt="Before" />
                }
                itemTwo={
                  <ReactCompareSliderImage src={item.after.src} alt="After" />
                }
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
          ))}
        </div>

        {/* Dots */}
        {items.length > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: {
                xs: 2,
                md: 4,
              },
            }}
          >
            {items.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => slider.current?.moveToIdx(idx)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: currentSlide === idx ? "white" : "grey",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    bgcolor: currentSlide === idx ? "white" : "lightgrey",
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
