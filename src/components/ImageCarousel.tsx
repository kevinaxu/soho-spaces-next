import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ImageCarouselProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageCarousel({
  images,
  initialIndex = 0,
  onClose,
}: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(initialIndex);

  // Disable page scroll when carousel is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: initialIndex,
    loop: true,
    slides: { perView: 1 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const goPrev = () => slider.current?.prev();
  const goNext = () => slider.current?.next();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.9)",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          color: "white",
          zIndex: 1500,
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Left Arrow */}
      <IconButton
        onClick={goPrev}
        sx={{
          position: "fixed",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          color: "white",
          zIndex: 1500,
          fontSize: 48,
        }}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={goNext}
        sx={{
          position: "fixed",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          color: "white",
          zIndex: 1500,
          fontSize: 48,
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>

      {/* Slider */}
      <Box
        ref={sliderRef}
        className="keen-slider"
        sx={{
          width: "80%",
          maxHeight: "80vh",
          overflow: "visible",
        }}
      >
        {images.map((img) => (
          <Box
            key={img}
            className="keen-slider__slide"
            component="img"
            src={img}
            sx={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
              mx: "auto",
            }}
          />
        ))}
      </Box>

      {/* Dots */}
      <Box sx={{ position: "absolute", bottom: 24, display: "flex", gap: 1 }}>
        {images.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => slider.current?.moveToIdx(idx)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: currentSlide === idx ? "white" : "grey", // inactive dots are grey
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
