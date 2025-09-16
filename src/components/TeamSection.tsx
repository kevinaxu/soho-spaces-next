import { Column } from "../components/Layout";
import { Box, Grid, Typography } from "@mui/material";
import styles from "@/styles/projectImage.module.css";

interface TeamMember {
  heroImage: string;
  name: string;
  title: string;
  content: string;
}

interface TeamSectionProps {
  team: TeamMember[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={{
        xs: 4,
        md: 8,
      }}
    >
      {team.map((member, idx) => (
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
          key={idx}
          display="flex"
          justifyContent="center"
        >
          <Column sx={{ width: "100%", maxWidth: 350 }}>
            {/* Image with hover trim effect */}
            <Box
              className={styles.containerBlock}
              sx={{
                width: "100%",
                height: 500,
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={member.heroImage}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  // filter: "grayscale(100%)",
                }}
              />
              <Box className={styles.innerBlock}>
                <Box className={styles.sliderTopRight} />
              </Box>
            </Box>

            <Column
              sx={{
                gap: 0,
                mb: 2,
                paddingTop: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {member.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontStyle="italic"
              >
                {member.title}
              </Typography>
            </Column>

            <Typography variant="body2" color="text.secondary">
              {member.content}
            </Typography>
          </Column>
        </Grid>
      ))}
    </Grid>
  );
}

/*
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
*/
