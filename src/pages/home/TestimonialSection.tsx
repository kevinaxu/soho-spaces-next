import { Typography, Box } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import React, { useCallback, useState, useEffect, useRef } from "react";

import { Column } from "@/src/components/Layout";
import { MAX_WIDTH_TEXT_CONTAINER } from "@/src/constants";
import { SectionTitle, SectionSubtitle } from "@/src/components/SectionTitle";

import "keen-slider/keen-slider.min.css";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  autoScroll?: boolean;
  scrollInterval?: number;
}

export function TestimonialSection({
  testimonials,
  autoScroll = false,
  scrollInterval = 5000,
}: TestimonialSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const startAutoScroll = useCallback(() => {
    if (!slider.current || sliderInterval.current) return;
    sliderInterval.current = setInterval(() => {
      slider.current?.next();
    }, scrollInterval);
  }, [scrollInterval, slider]);
  const stopAutoScroll = useCallback(() => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
      sliderInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (autoScroll && testimonials.length > 1) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [autoScroll, startAutoScroll, stopAutoScroll, testimonials.length]);

  const showControls = testimonials.length > 1;

  return (
    <Column
      sx={{
        width: "100%",
        maxWidth: MAX_WIDTH_TEXT_CONTAINER,
        gap: 2,
        alignItems: "center",
        mx: "auto",
      }}
    >
      <SectionTitle
        title="Testimonials"
        sx={{ pb: 4, textAlign: "center", color: "footer.contrastText" }}
      />

      <Box
        sx={{ position: "relative", width: "100%" }}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((t, index) => (
            <Column
              key={index}
              className="keen-slider__slide"
              sx={{ alignItems: "center", gap: 2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "footer.contrastText",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {t.quote}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#f5945c", textAlign: "center" }}
              >
                {t.author}, {t.title}
              </Typography>
            </Column>
          ))}
        </div>

        {/* Dots */}
        {showControls && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: {
                xs: 2,
                md: 8,
              },
            }}
          >
            {testimonials.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => slider.current?.moveToIdx(idx)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: currentSlide === idx ? "white" : "grey",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Column>
  );
}
