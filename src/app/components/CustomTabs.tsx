"use client"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { motion, useReducedMotion } from "framer-motion"
import { useState, type ReactNode } from "react"

export interface TabItem {
  label: string
  count?: number
  content: ReactNode
}

export default function CustomTabs({
  items,
  onChange,
}: {
  items: readonly TabItem[]
  onChange?: (label: string) => void
}) {
  const [value, setValue] = useState(items[0]?.label ?? "")
  const reducedMotion = useReducedMotion()

  const handleChange = (_: React.SyntheticEvent, next: string) => {
    setValue(next)
    onChange?.(next)
  }

  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: "1px solid #cbd6de",
          position: "relative",
        }}
      >
        <TabList
          aria-label="Filter projects"
          variant="scrollable"
          scrollButtons={false}
          onChange={handleChange}
          sx={{
            minHeight: 46,
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTabs-flexContainer": {
              gap: { xs: 0.5, sm: 1.5 },
            },
          }}
        >
          {items.map(({ label, count }) => {
            const active = value === label
            return (
              <Tab
                key={label}
                value={label}
                disableRipple
                label={
                  <Box
                    component="span"
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "baseline",
                      gap: "0.45rem",
                      py: 0.75,
                    }}
                  >
                    <span>{label}</span>
                    {typeof count === "number" ? (
                      <Box
                        component="span"
                        sx={{
                          fontSize: "0.75rem",
                          fontVariantNumeric: "tabular-nums",
                          fontWeight: 600,
                          color: active ? "#f50057" : "#7992a4",
                          transition: reducedMotion
                            ? "none"
                            : "color 180ms ease",
                        }}
                      >
                        {count}
                      </Box>
                    ) : null}
                    {active ? (
                      <motion.span
                        layoutId="projects-active-tab-bar"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 520,
                                damping: 38,
                              }
                        }
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: -9,
                          height: 2,
                          background: "#154d77",
                          boxShadow: "2px 0 0 #f50057",
                        }}
                      />
                    ) : null}
                  </Box>
                }
                sx={{
                  minHeight: 46,
                  minWidth: 0,
                  px: { xs: 1, sm: 1.25 },
                  py: 1,
                  textTransform: "none",
                  fontSize: { xs: "0.9375rem", sm: "1rem" },
                  fontWeight: active ? 700 : 500,
                  color: "#46535c",
                  overflow: "visible",
                  transition: reducedMotion ? "none" : "color 180ms ease",
                  "&:hover": {
                    color: "#0f1922",
                  },
                  "&.Mui-selected": {
                    color: "#0f1922",
                  },
                  "&.Mui-focusVisible": {
                    outline: "2px solid #154d77",
                    outlineOffset: "-3px",
                  },
                }}
              />
            )
          })}
        </TabList>
      </Box>
      {items.map(({ label, content }) => (
        <TabPanel key={label} value={label} sx={{ p: 0, pt: 3.5 }}>
          {content}
        </TabPanel>
      ))}
    </TabContext>
  )
}
