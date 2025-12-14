import { SvgIconComponent } from "@mui/icons-material";
import * as MuiIcons from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Row, Column } from "@/src/components/Layout";
import { ResponsiveSanityBox } from "@/src/components/ResponsiveSanityImage";
import { SectionSubtitle } from "@/src/components/SectionTitle";
import { useIsMobile } from "@/src/hooks/useIsMobile";

interface ProcessStepContent {
  title: string;
  description: string;
  image?: SanityImageSource;
  icon?: string; // To be converted to SvgIconComponent;
}

const TIMELINE_MAX_WIDTH = "1400px";

export default function ProcessTimeline({
  timelineData,
}: {
  timelineData: ProcessStepContent[];
}) {
  const isMobile = useIsMobile();
  return (
    <Column
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row
        sx={{
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Timeline
          position={isMobile ? "right" : "alternate-reverse"}
          sx={{
            padding: 0,
            maxWidth: {
              lg: TIMELINE_MAX_WIDTH,
            },
          }}
        >
          {timelineData.map((item, index) => {
            const IconComponent = item.icon ? getMuiIcon(item.icon) : null;

            return (
              <TimelineItem
                key={index}
                sx={{
                  // Hide the unnecessary timeline left-padding on opposite content
                  "&::before": {
                    display: {
                      xs: "none",
                      lg: "flex",
                    },
                  },
                }}
              >
                <TimelineSeparator>
                  <TimelineDot variant={item.icon ? undefined : "outlined"}>
                    {IconComponent && <IconComponent fontSize="small" />}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContentCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </TimelineItem>
            );
          })}
        </Timeline>
      </Row>
    </Column>
  );
}

function TimelineContentCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: SanityImageSource;
}) {
  return (
    <TimelineContent
      sx={{
        paddingBottom: {
          xs: 8,
          //   lg: 4,
        },
      }}
    >
      <Column
        sx={{
          gap: 2,
          // this is causing the left / right align to be less than the 1200
          mx: {
            xs: 0,
            lg: 4,
          },
          alignSelf: "center",
        }}
      >
        <Column
          sx={{
            gap: 1,
          }}
        >
          <SectionSubtitle
            title={title}
            sx={{
              textAlign: {
                lg: "center",
              },
            }}
          />
          <Typography color="text.secondary" sx={{ textAlign: "justify" }}>
            {description}
          </Typography>
        </Column>
        {image && (
          <ResponsiveSanityBox
            src={image}
            alt="Process Step Image"
            lazy={true}
            sx={{
              width: {
                lg: "100%",
              },
              height: {
                lg: "300px",
              },
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </Column>
    </TimelineContent>
  );
}

/**
 * Convert a string name of a Material UI icon into the corresponding SvgIconComponent.
 * Returns HelpOutline as fallback if the icon is not found.
 */
export function getMuiIcon(iconName: string): SvgIconComponent {
  const Icon = (MuiIcons as Record<string, SvgIconComponent>)[iconName];
  if (!Icon) {
    console.warn(
      `Icon "${iconName}" not found. Using HelpOutline as fallback.`
    );
    return MuiIcons.HelpOutline;
  }
  return Icon;
}
