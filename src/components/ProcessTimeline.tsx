import { SvgIconComponent } from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
// import * as React from "react";

import { Row, Column } from "@/src/components/Layout";

interface ProcessStepContent {
  title: string;
  description: string;
  icon?: SvgIconComponent;
}

export default function ProcessTimeline({
  timelineData,
}: {
  timelineData: ProcessStepContent[];
}) {
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
          position="alternate-reverse"
          sx={{
            maxWidth: "1200px",
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
}: {
  title: string;
  description: string;
}) {
  return (
    <TimelineContent>
      <Column
        sx={{
          gap: 1,
          // this is causing the left / right align to be less than the 1200
          mx: {
            xs: 0,
            md: 4,
          },
          alignSelf: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary" sx={{ textAlign: "justify" }}>
          {description}
        </Typography>
      </Column>
    </TimelineContent>
  );
}

/*
const timelineData = [
  {
    title: "Design Consultation",
    description: `The initial meeting will occur in your home to discuss your
      needs, desires, wish list, and budget, aiming to establish a
      vision for your residence. This two-hour session provides an
      opportunity for us to become acquainted and determine how we
      will transform your rooms into a seamlessly beautiful and
      functional home.`,
  },
  {
    title: "Design Proposal & Approval",
    description: `With a finalized preliminary design plan that outlines the scope
      of work and budget, the next step is to create a legally binding
      Letter of Agreement tailored to your project. Upon the mutual
      signing of this document and the receipt of a retainer, we will
      commence the Planning Phase of your project.`,
  },
  {
    title: "Concept and Detailed Design",
    description: `We kick off the design phase, diving into the creative process
      where our team gathers all those exciting design ideas we've
      been brewing. As construction is often a component, we meet with
      trades and contractors to validate the possibilities on your
      wish list. Subsequently, we source furnishings, finishes, and
      fixtures while concurrently developing the design plans, which
      you will have the opportunity to review in the next stage.`,
  },
  {
    title: "Presentation",
    description:
      "Once the design plan is finalized, we will present the reimagined rooms and the overall space, bringing it to life with detailed drawings, fabric swatches, and finish samples. Depending on the project's scale, phased presentations may be required. If any revisions or tweaks are requested, we'll meticulously fine-tune them by exploring alternatives, ensuring you end up with the perfect design plan that resonates with your preferences.",
  },
  {
    title: "Implementation",
    description:
      "It's ordering time! After you've given the green light to your design, we swing into action by reaching out to our suppliers and meticulously tracking timelines for smooth deliveries. In tandem with our contractor, we take charge of ensuring the flawless execution of the Design Plans. Consider this a stress-free zone for you, as we handle all the details and project manage the design and build process from start to finish.",
  },
];
*/
