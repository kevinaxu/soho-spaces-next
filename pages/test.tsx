import React from "react";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { client } from "@/src/sanity/client";

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const query = `*[_type == "project"] | order(publishedAt desc)[0]{
  "hero": {
    "images": hero.images[]{
      title,
      "src": photo->image{
        ...,
        asset->
      }
    }
  }
}`;

  const project = await client.fetch(query);
  return { props: { project } };
}
