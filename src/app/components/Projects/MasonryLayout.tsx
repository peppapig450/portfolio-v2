import React, { PropsWithChildren } from "react";
import { Masonry } from "@mui/lab";
import { Box, useTheme } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const fadeInUp = keyframes`
  from {
    marginTop: '4rem';
    opacity: 0;
  }
  to {
    marginTop: '1.5em';
    opacity: 1;
  }
`;

const MasonryLayout: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: "1.5em 0",
        animation: `${fadeInUp} 1s both`,
        maxWidth: "auto",
        [theme.breakpoints.down("sm")]: {
          opacity: "1 !important",
        },
      }}
    >
      <Masonry columns={{ lg: 2, md: 1 }} spacing={2}>
        {children}
      </Masonry>
    </Box>
  );
};

export default MasonryLayout;
