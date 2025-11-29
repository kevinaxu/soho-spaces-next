import Footer from "@/src/components/Footer";
import { Column } from "@/src/components/Layout";
import { FullWidthSection } from "@/src/components/Section";
import { PADDING_X_SECTION, PADDING_X_MOBILE } from "@/src/constants";
import { ComparisonSection } from "@/src/pages/parts/ComparisonSection";
import HeroGallery from "@/src/pages/parts/HeroGallery";
import PhotoGallerySection from "@/src/pages/parts/PhotoGallerySection";

export default function PartsPage() {
  return (
    <>
      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 0,
          },
        }}
      >
        <HeroGallery images={mockData.hero.images} />
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: 16,
          },
        }}
      >
        <Column gap={2} sx={{ width: "100%" }}>
          <PhotoGallerySection images={mockData.gallery.images} />
        </Column>
      </FullWidthSection>

      <FullWidthSection
        sx={{
          bgcolor: "#e3e2dc",
          py: {
            xs: 2,
            md: 2,
          },
          px: {
            xs: PADDING_X_MOBILE,
            md: PADDING_X_SECTION,
          },
        }}
      >
        <Column gap={2} sx={{ width: "100%" }}>
          <ComparisonSection
            title={mockData.comparison.title}
            description={mockData.comparison.description}
            before={mockData.comparison.before}
            after={mockData.comparison.after}
          />
        </Column>
      </FullWidthSection>

      <Footer />
    </>
  );
}

const mockData = {
  comparison: {
    title: "Ready to transform your dream space?",
    description: "Schedule a free consultation",
    before: "/dark_academia/IMG_3265_2x.jpeg",
    after: "/dark_academia/IMG_1234.jpeg",
  },
  hero: {
    images: [
      { title: "", src: "/dark_academia/chair2.jpeg" },
      { title: "", src: "/dark_academia/IMG_0005.jpeg" },
      { title: "", src: "/dark_academia/sconce2.jpeg" },
    ],
  },
  gallery: {
    images: [
      { title: "", src: "/dark_academia/chair2.jpeg" },
      { title: "", src: "/dark_academia/IMG_0005.jpeg" },
      { title: "", src: "/dark_academia/sconce2.jpeg" },
      { title: "", src: "/dark_academia/IMG_0003.jpeg" },
      { title: "", src: "/dark_academia/IMG_0006.jpeg" },
      { title: "", src: "/dark_academia/sofa_close_up.jpeg" },
    ],
  },
};
