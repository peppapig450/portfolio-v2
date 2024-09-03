import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  timelineItemClasses,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography, Box, LinkProps } from "@mui/material";
import CustomLink from "../CustomLink";
import { useTheme } from "@mui/material/styles";
import { TimelineItemType } from "@/contexts/AboutContext";

type TimelineSectionProps = {
  title?: string;
  items: TimelineItemType[];
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  title,
  items,
}) => {
  const theme = useTheme();

  return (
    <Box component="article">
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {items.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary">{item.icon}</TimelineDot>
              {index !== items.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomLink
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                >
                  <Typography variant="h6" component="a">
                    {item.title}
                  </Typography>
                  {item.subtitle && (
                    <Typography variant="caption" color="textSecondary">
                      {" "}
                      {item.subtitle}
                    </Typography>
                  )}
                </CustomLink>
                <CustomLink
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      float: "none !important",
                    },
                    [theme.breakpoints.up("md")]: {
                      float: "right !important",
                    },
                    float: "right",
                  }}
                >
                  <Typography variant="h6">{item.linkText}</Typography>
                </CustomLink>
              </Box>

              <Typography>{item.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};
