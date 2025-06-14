import { arrowBounce } from "@/styles/keyframes"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"
import type {
  BoxProps,
  IconProps,
  LinkProps,
  TypographyProps,
} from "@mui/material"
import { Box, IconButton, Link, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import NextLink from "next/link"
import { forwardRef } from "react"
import CustomLink from "./CustomLink"

interface FooterLinkProps extends Omit<LinkProps, "component"> {
  goto?: string
}

interface SocialMediaItems {
  icon: React.ReactElement<IconProps>
  url: string
  label: string
}

const AnimatedTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
    transform: "scaleX(0)",
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SocialMediaBox = styled(Box)<BoxProps>(({ theme }) => ({
  background: "transparent",
  padding: theme.spacing(2, 0),
}))

const FooterLinkComponent = forwardRef<HTMLElement, FooterLinkProps>(
  ({ children, goto = "/", sx: userSx = {}, ...otherProps }, ref) => {
    const theme = useTheme()

    const SocialMedias: SocialMediaItems[] = [
      {
        icon: <TwitterIcon aria-hidden="true" />,
        url: "https://twitter.com/nickdidthat22",
        label: "Twitter",
      },
      {
        icon: <FacebookIcon aria-hidden="true" />,
        url: "https://www.facebook/nickdidthat22",
        label: "Facebook",
      },
      {
        icon: <LinkedInIcon aria-hidden="true" />,
        url: "https://www.linkedin.com/in/nick-brady-5715752b3",
        label: "LinkedIn",
      },
      {
        icon: <GitHubIcon aria-hidden="true" />,
        url: "https://github.com/peppapig450",
        label: "GitHub",
      },
      {
        icon: <InstagramIcon aria-hidden="true" />,
        url: "https://instagram.com/nickbrady41",
        label: "Instagram",
      },
    ]

    return (
      <Box
        component="footer"
        ref={ref}
        {...otherProps} // everything except sx
        sx={{
          mt: 4,
          [theme.breakpoints.down("md")]: {
            paddingBottom: 5,
          },
          // merge in user overrides
          ...userSx,
        }}
      >
        <Link
          href={goto}
          underline="none"
          component={NextLink}
          passHref
          aria-label={`Navigate to ${goto} page`}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <AnimatedTypography
              sx={{
                fontSize: theme.typography.body1.fontSize,
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.grey[800],
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {children}
            </AnimatedTypography>
            <ArrowRightAltIcon
              aria-hidden="true"
              sx={{
                fontSize: "60px",
                ml: theme.spacing(1),
                color: theme.palette.secondary.main,
                animation: `${arrowBounce} 0.5s infinite alternate`,
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                  transform: "translateX(1rem)",
                },
              }}
            />
          </Box>
        </Link>
        <SocialMediaBox sx={{ mr: -3 }}>
          {SocialMedias.map((social, index) => (
            <CustomLink
              href={social.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              title={`${social.label} Page`}
              aria-label={`Visit Nick Brady's ${social.label} page`}
              sx={{
                mr: 0,
                transition: "all 1s ease",
                cursor: "pointer",
                p: theme.spacing(1, 1.5),
                "&:first-of-type": { pl: 0 },
              }}
            >
              <IconButton
                aria-label={`Go to Nick Brady's ${social.label} Page`}
                sx={{
                  cursor: "pointer",
                  height: 15,
                  fill: theme.palette.text.secondary,
                  transition: "all 1s ease",
                  "&:hover": {
                    stroke: theme.palette.text.secondary,
                    strokeWidth: 1,
                    strokeOpacity: 0.8,
                  },
                }}
              >
                {social.icon}
              </IconButton>
            </CustomLink>
          ))}
        </SocialMediaBox>
      </Box>
    )
  },
)

FooterLinkComponent.displayName = "FooterLink"
export default FooterLinkComponent
