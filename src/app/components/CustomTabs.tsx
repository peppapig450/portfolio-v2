import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Tab } from "@mui/material"
import { useState, type ReactNode } from "react"

export default function CustomTabs({
  items,
}: {
  items: readonly { label: string; content: ReactNode }[]
}) {
  const [value, setValue] = useState(items[0].label)
  return (
    <TabContext value={value}>
      <TabList
        aria-label="Filter projects"
        variant="scrollable"
        scrollButtons={false}
        onChange={(_, next: string) => setValue(next)}
        sx={{ minHeight: 44, "& .MuiTabs-indicator": { display: "none" } }}
      >
        {items.map(({ label }) => (
          <Tab
            key={label}
            label={label}
            value={label}
            disableRipple
            sx={{
              minHeight: 44,
              minWidth: 0,
              px: { xs: 1.4, sm: 2 },
              borderRadius: 1,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#46535C",
              "&.Mui-selected": { bgcolor: "primary.main", color: "white" },
              "&.Mui-focusVisible": {
                outline: "2px solid currentColor",
                outlineOffset: "-4px",
              },
            }}
          />
        ))}
      </TabList>
      {items.map(({ label, content }) => (
        <TabPanel key={label} value={label} sx={{ p: 0, pt: 3 }}>
          {content}
        </TabPanel>
      ))}
    </TabContext>
  )
}
