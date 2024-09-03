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

  // TODO: add underline highlight to the item title's
  return (
    <Box component="article">
      {title && (
        <Typography
          variant="h4"
          sx={{ pl: theme.spacing(2), mb: theme.spacing(1) }}
        >
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
          <TimelineItem
            key={index}
            sx={{ display: "flex", minHeight: "100px" }}
          >
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                {item.icon}
              </TimelineDot>
              {index !== items.length - 1 && (
                <TimelineConnector sx={{ flexGrow: 1 }} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="left"
                sx={{
                  [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                  },
                  [theme.breakpoints.up("sm")]: {
                    flexDirection: "row",
                  },
                }}
              >
                <CustomLink
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  underline="none"
                >
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    fontWeight="bold"
                  >
                    {item.title}
                    {item.subtitle && (
                      <Typography variant="caption" color="textSecondary">
                        {" "}
                        {item.subtitle}
                      </Typography>
                    )}
                  </Typography>
                </CustomLink>
                <CustomLink
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  underline="none"
                >
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    fontWeight="bold"
                    sx={{
                      textDecoration: "underline",
                    }}
                  >
                    {item.linkText}
                  </Typography>
                </CustomLink>
              </Box>

              <Typography sx={{ mt: "0.6rem", mb: theme.spacing(2) }}>
                {item.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};
