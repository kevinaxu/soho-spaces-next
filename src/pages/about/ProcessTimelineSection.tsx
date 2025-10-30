import { SvgIconComponent } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import { Row, Column } from "@/src/components/Layout";

interface ProcessStepContent {
  title: string;
  description: string;
  image?: string;
  icon?: SvgIconComponent;
}

const TIMELINE_MAX_WIDTH = "1400px";

export default function ProcessTimeline({
  timelineData,
}: {
  timelineData: ProcessStepContent[];
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px
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
              md: TIMELINE_MAX_WIDTH,
            },
            // TODO: FIX THIS LEFT ALIGN ON MOBILE
            // [`& .${timelineOppositeContentClasses.root}`]: {
            //   flex: 0.2,
            // },
          }}
        >
          {timelineData.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                {item.icon ? (
                  <TimelineDot>
                    <item.icon fontSize="small" />
                  </TimelineDot>
                ) : (
                  <TimelineDot variant="outlined" />
                )}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContentCard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </TimelineItem>
          ))}
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
  image?: string;
}) {
  return (
    <TimelineContent
      sx={{
        paddingBottom: {
          xs: 8,
          //   md: 4,
        },
      }}
    >
      <Column
        sx={{
          gap: 2,
          // this is causing the left / right align to be less than the 1200
          mx: {
            xs: 0,
            md: 4,
          },
          alignSelf: "center",
        }}
      >
        <Column
          sx={{
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: {
                md: "center",
              },
            }}
          >
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: "justify" }}>
            {description}
          </Typography>
        </Column>
        <Box
          component="img"
          src={image}
          sx={{
            width: {
              md: "100%",
            },
            height: {
              md: "300px",
            },
            objectFit: "cover",
            display: "block",
          }}
        />
      </Column>
    </TimelineContent>
  );
}
