"use client"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { useState, type ReactNode } from "react"

export interface TabItem {
  label: string
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

  const handleChange = (_: React.SyntheticEvent, next: string) => {
    setValue(next)
    onChange?.(next)
  }

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: "1px solid var(--color-border)" }}>
        <TabList
          aria-label="Filter projects"
          variant="scrollable"
          scrollButtons={false}
          onChange={handleChange}
          sx={{
            minHeight: 46,
            "& .MuiTabs-flexContainer": {
              gap: { xs: 0.25, sm: 1.5 },
            },
            "& .MuiTabs-indicator": {
              height: 2,
              backgroundColor: "primary.main",
              boxShadow: "2px 0 0 var(--color-secondary)",
              "@media (prefers-reduced-motion: reduce)": {
                transition: "none",
              },
            },
          }}
        >
          {items.map(({ label }) => (
            <Tab
              key={label}
              label={label}
              value={label}
              disableRipple
              sx={{
                minHeight: 46,
                minWidth: 0,
                px: { xs: 1, sm: 1.25 },
                py: 1,
                textTransform: "none",
                fontSize: { xs: "0.9375rem", sm: "1rem" },
                fontWeight: 500,
                color: "var(--color-muted)",
                transition: "color 180ms ease",
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
                "&:hover": {
                  color: "var(--color-ink)",
                },
                "&.Mui-selected": {
                  color: "var(--color-ink)",
                  fontWeight: 700,
                },
                "&.Mui-focusVisible": {
                  outline: "2px solid var(--color-primary)",
                  outlineOffset: "-3px",
                },
              }}
            />
          ))}
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
