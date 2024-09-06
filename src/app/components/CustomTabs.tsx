import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { styled } from "@mui/material/styles";

const StyledTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    fontWeight: 900,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[800],
  },
}));

interface TabItem {
  label: string;
  content: React.ReactNode;
  href?: string;
}

interface CustomTabProps {
  items: TabItem[];
}

const CustomTabs: React.FC<CustomTabProps> = ({ items }) => {
  const [value, setValue] = useState<string>("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box borderColor="divider" borderBottom="1">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="project tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {items.map((item, index) => (
              <StyledTab
                key={index}
                label={item.label}
                value={index.toString()}
              />
            ))}
          </Tabs>
        </Box>
        {items.map((item, index) => (
          <TabPanel key={index} value={index.toString()}>
            {item.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default CustomTabs;
