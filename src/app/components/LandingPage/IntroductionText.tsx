import type { BoxProps } from "@mui/material"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import type { Ref } from "react"
import CustomLink from "../CustomLink"

type IntroductionTextProps = BoxProps & { ref?: Ref<HTMLDivElement> }

const IntroductionText = ({ ref, ...props }: IntroductionTextProps) => {
  const theme = useTheme()

  return (
    <Box ref={ref} {...props}>
      <Typography
        variant="body1"
        component="p"
        align="justify"
        sx={{ lineHeight: { sm: "1.5", md: "2.3" } }}
      >
        Welcome I&apos;m a versatile full-stack developer and AI engineer,
        blending creativity with technical expertise. From sleek frontends to
        robust backends, I craft high-performance applications across the full
        tech stack. My diverse toolkit spans Java, Python, React, and more,
        allowing me to tackle any{" "}
        <CustomLink
          href="/projects"
          underline="none"
          aria-label="Go to projects page"
          sx={{
            fontWeight: "bold",
            border: "medium",
            textTransform: "uppercase",
            color: theme.vars.palette.primary.main,
          }}
        >
          project
        </CustomLink>{" "}
        with innovative solutions
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ mt: theme.spacing(1), lineHeight: { sm: "1.5", md: "2.3" } }}
      >
        Off-screen, I&apos;m either exploring tech insights through{" "}
        <CustomLink
          href="/articles"
          underline="none"
          aria-label="Check out articles I read."
          sx={{
            fontWeight: "bold",
            border: "medium",
            textTransform: "uppercase",
            color: theme.vars.palette.primary.main,
          }}
        >
          articles
        </CustomLink>{" "}
        or finding inspiration through{" "}
        <CustomLink
          href="/photography"
          underline="none"
          aria-label="Check out my photography."
          sx={{
            fontWeight: "bold",
            border: "medium",
            textTransform: "uppercase",
            color: theme.vars.palette.primary.main,
          }}
        >
          photography
        </CustomLink>
        . Ready to bring a unique perspective to your next project?{" "}
        <CustomLink
          href="/contact"
          underline="none"
          aria-label="Go to Contact Page"
          sx={{
            fontWeight: "bold",
            border: "medium",
            textTransform: "uppercase",
            color: theme.vars.palette.primary.main,
          }}
        >
          contact me
        </CustomLink>{" "}
        and let&apos;s create something extraordinary.
      </Typography>
    </Box>
  )
}

IntroductionText.displayName = "IntroductionText"

export default IntroductionText
