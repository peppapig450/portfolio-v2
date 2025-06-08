import { useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

const useIsMobile = () => {
  const theme = useTheme()
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"))
  const [isMobile, setIsMobile] = useState<boolean>(isMobileQuery)

  useEffect(() => {
    setIsMobile(isMobileQuery)
  }, [isMobileQuery])

  return isMobile
}

export default useIsMobile
