import { useEffect } from "react";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import TeamSection from "../src/components/TeamSection";
import { Column } from "../src/components/Layout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const team = [
  {
    heroImage:
      "https://scontent-atl3-3.xx.fbcdn.net/v/t39.30808-6/466620435_10234280326938948_8848555020260980839_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=BsdM6Ox9zIYQ7kNvwHl6aR5&_nc_oc=Adnsm9PV6AnUO_1SpAEIAVEmjtTys_Pvu4pJyM-UXCuWKE5TGA_tyv1IkOlri2wtBjA&_nc_zt=23&_nc_ht=scontent-atl3-3.xx&_nc_gid=cfb9r_YoLC7xuL_8nfVbVQ&oh=00_AfaCreR9MeVeiyadfGUMwy6VQUFOhuDDlwb_LlCAQ9blfg&oe=68CC28DB",
    name: "Maisa Sohail",
    title: "Co-Founder, Principal Designer",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  },
  {
    heroImage: "https://soho-spaces.com/assets/home/sohail_sisters.jpeg",
    name: "Tahaiya Sohail",
    title: "Co-Founder, Head of Sales",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  },
  {
    heroImage:
      "https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/402893763_10160167215898542_3166251289793318081_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=UbfmZ3U2HbEQ7kNvwEE3rIn&_nc_oc=AdlBZCT8mthqBmGTU-Q1PK3Bj0RfTjPvZp0SdOHAmcXJEn7gWqU9ra_WyCm8xLHfaq8&_nc_zt=23&_nc_ht=scontent-atl3-1.xx&_nc_gid=Y5cSkYbPuszOnKAGbtaZ4w&oh=00_AfbgY_A2CzvRNbkhpu1g63ib6ohUvUPTdpinOHqSPCtO0A&oe=68CC17F8",
    name: "Kevin Xu",
    title: "Co-Founder, Technical Architect",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  },
];

export default function HomePage({}) {
  return (
    <>
      <Header sticky={false} />

      {/* this is the main table shell */}
      <Column
        sx={{
          py: 6,
          px: 2,
          maxWidth: 1200,
          mx: "auto",
          gap: 3,
        }}
      >
        <TeamSection team={team} />
      </Column>

      <Footer />
    </>
  );
}

// export async function getStaticProps() {
//   const query = `*[_type == "home"] | order(publishedAt desc)[0]{
//     title,
//     publishedAt,
//     about,
//     "aboutImage": aboutImage->{
//       _id,
//       title,
//       "url": image.asset->url
//     },
//     "gallery": gallery[]->{
//       _id,
//       title,
//       "url": image.asset->url,
//       rows,
//       cols
//     },
//   }`;
//   const page = await client.fetch(query);
//   console.log("dumping page", JSON.stringify(page, null, 2));
//   return { props: { page } };
// }

function ScreenSizeLogger() {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  useEffect(() => {
    if (isXs) console.log("Current screen: xs");
    if (isSm) console.log("Current screen: sm");
    if (isMd) console.log("Current screen: md");
    if (isLg) console.log("Current screen: lg");
    if (isXl) console.log("Current screen: xl");
  }, [isXs, isSm, isMd, isLg, isXl]);

  return <div>Resize the window and check the console!</div>;
}
