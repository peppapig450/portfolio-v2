import { noiseAnim, noiseAnim2 } from "@/styles/keyframes"
import type { BoxProps } from "@mui/material"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import type { Ref } from "react"

const AnimatedTitle = ({
  ref,
  ...props
}: BoxProps & { ref?: Ref<HTMLDivElement> }) => {
  const theme = useTheme()

  return (
    <Box
      ref={ref}
      display="flex"
      position="relative"
      overflow="hidden"
      color={theme.vars.palette.primary.main}
      {...props}
    >
      <Typography
        variant="h3"
        component="h1"
        color={theme.vars.palette.text.primary}
        letterSpacing="9.9px"
        position="relative"
        display="inline-block"
        textTransform="uppercase"
        sx={{
          mb: theme.spacing(0.75),
          "&:before": {
            content: '"I\'m Nick Brady"',
            position: "absolute",
            top: 0,
            left: 2,
            height: "100%",
            width: "100%",
            textShadow: `-1px 0 ${theme.vars.palette.text.primary}`,
            animation: `${noiseAnim2} 15s infinite linear alternate-reverse`,
          },
          "&:after": {
            content: '"I\'m Nick Brady"',
            position: "absolute",
            top: 0,
            left: 2,
            height: "100%",
            width: "100%",
            textShadow: `3px 0 ${theme.vars.palette.secondary.main}`,
            animation: `${noiseAnim} 2s infinite linear alternate-reverse`,
          },
          "@media (prefers-reduced-motion: reduce)": {
            "&:before": {
              animation: "none",
              clipPath: "none",
            },
            "&:after": {
              animation: "none",
              clipPath: "none",
            },
          },
        }}
      >
        I&apos;m Nick Brady
      </Typography>
    </Box>
  )
}

AnimatedTitle.displayName = "AnimatedTitle"

export default AnimatedTitle
