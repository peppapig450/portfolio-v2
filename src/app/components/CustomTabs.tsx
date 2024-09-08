import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { styled } from "@mui/material/styles";

const StyledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: "transparent",
  transition: "all 0.3s ease",
  borderRadius: "5px",
  overflow: "visible",
  textTransform: "capitalize",
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
    <Box
      component="nav"
      sx={{ width: "100%", typography: "body1", margin: "auto" }}
    >
      <TabContext value={value}>
        <Box borderColor="divider" borderBottom="1">
          <TabList
            onChange={handleChange}
            aria-label="Project navigation tabs"
            centered
            sx={{
              padding: "10px",
            }}
          >
            {items.map((item, index) => (
              <StyledTab
                key={index}
                label={item.label}
                value={index.toString()}
              />
            ))}
          </TabList>
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
