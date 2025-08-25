import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../src/sanity/client";

const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}

// const buildSrcSet = (imageUrl: string) => {
//   const widths = [320, 480, 768, 1024, 1600, 2400];
//   return widths
//     .map((w) => `${urlFor(imageUrl).width(w).url()} ${w}w`)
//     .join(", ");
// };
