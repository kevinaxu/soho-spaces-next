import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../src/sanity/client";

const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}
