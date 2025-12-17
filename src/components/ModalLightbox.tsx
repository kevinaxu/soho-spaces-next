import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { buildSanitySrc } from "@/src/components/ResponsiveSanityImage";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface ModalLightboxProps {
  images: {
    title: string;
    src: SanityImageSource;
  }[];
  index: number;
  open: boolean;
  close: () => void;
}

const LIGHTBOX_WIDTH = 2400;

export default function ModalLightbox({
  images,
  index,
  open,
  close,
}: ModalLightboxProps) {
  // TODO: optimize this via srcSet
  const isMobile = useIsMobile();
  const slides = images.map((img) => ({
    src: isMobile
      ? buildSanitySrc(img.src)
      : buildSanitySrc(img.src, LIGHTBOX_WIDTH),
    title: img.title,
  }));

  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Fullscreen, Zoom, Thumbnails]}
      thumbnails={{
        position: "bottom",
        width: 80,
        height: 60,
        border: 2,
      }}
      zoom={{ maxZoomPixelRatio: 3 }}
      fullscreen={{ auto: false }}
    />
  );
}
