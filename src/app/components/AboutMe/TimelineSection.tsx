import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
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
    <Box
      component="article"
      sx={{
        justifyContent: "flex-start",
        alignItems: "left",
        textAlign: "left",
        flexBasis: "83.3333%",
        maxWidth: "83.3333%",
        mt: theme.spacing(7),
      }}
    >
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      <Timeline>
        {items.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary">{item.icon}</TimelineDot>
              {index !== items.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <CustomLink
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
              >
                <Typography variant="h6">{item.title}</Typography>
                {item.subtitle && (
                  <Typography variant="caption" color="textSecondary">
                    {item.subtitle}
                  </Typography>
                )}
              </CustomLink>
              <CustomLink
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
                style={{ float: "right" }}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    float: "none !important",
                  },
                }}
              >
                <Typography variant="body2" sx={{ display: "inline-block" }}>
                  {item.linkText}
                </Typography>
              </CustomLink>
              <Typography>{item.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};
