import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { buildSanitySrc } from "@/src/components/ResponsiveSanityImage";

interface ModalLightboxProps {
  images: {
    title: string;
    src: SanityImageSource;
  }[];
  index: number;
  open: boolean;
  close: () => void;
}

export default function ModalLightbox({
  images,
  index,
  open,
  close,
}: ModalLightboxProps) {
  const slides = images.map((img) => ({
    src: buildSanitySrc(img.src),
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
