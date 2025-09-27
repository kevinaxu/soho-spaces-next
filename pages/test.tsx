import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import StackedDeck from "../src/components/StackedDeck";

const cards = [
  {
    numberText: "04 / 04",
    title: "Content Creation",
    bg: "#bab2a3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "03 / 04",
    title: "Brand Strategy",
    bg: "#c8c0b3",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "02 / 04",
    title: "Video Strategy",
    bg: "#d9d3ca",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
  {
    numberText: "01 / 04",
    title: "Video Production",
    bg: "#f1eeed",
    description:
      "Our team produces personalized content and original materials that share your work with clarity and authenticity across social platforms and via email marketing. Designed to engage, inform, and convert, every communication is crafted to resonate with your audience.",
  },
];

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />
      <StackedDeck cards={cards} />
      <Footer />
    </>
  );
}
