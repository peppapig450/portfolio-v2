import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const useIsMobile = () => {
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"));
  const [isMobile, setIsMobile] = useState<boolean>(isMobileQuery);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return isMobile;
};

export default useIsMobile;
