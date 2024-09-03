import React from "react";
import NextLink from "next/link";
import {
  Box,
  BoxProps,
  Typography,
  Link,
  TypographyProps,
  IconButton,
  IconProps,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { arrowBounce, underlineAnimation } from "@/styles/keyframes";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import CustomLink from "./CustomLink";

interface IFooterLink {
  children: string | React.ReactNode;
  goto?: string;
}

interface SocialMediaItems {
  icon: React.ReactElement<IconProps>;
  url: string;
  label: string;
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
}));

const SocialMediaBox = styled(Box)<BoxProps>(({ theme }) => ({
  background: "transparent",
  padding: theme.spacing(2, 0),
}));

const FooterLink: React.FC<IFooterLink> = ({ children, goto = "/" }) => {
  const theme = useTheme();

  const SocialMedias: SocialMediaItems[] = [
    {
      icon: <TwitterIcon />,
      url: "https://twitter.com/nickdidthat22",
      label: "Twitter",
    },
    {
      icon: <FacebookIcon />,
      url: "https://www.facebook/nickdidthat22",
      label: "Facebook",
    },
    {
      icon: <LinkedInIcon />,
      url: "https://www.linkedin.com/in/nick-brady-5715752b3",
      label: "LinkedIn",
    },
    {
      icon: <GitHubIcon />,
      url: "https://github.com/peppapig450",
      label: "GitHub",
    },
    {
      icon: <InstagramIcon />,
      url: "https://instagram.com/nickbrady41",
      label: "Instagram",
    },
  ];

  return (
    <>
      <Box
        component="footer"
        sx={{
          mt: 4,
          [theme.breakpoints.down("md")]: {
            paddingBottom: 5,
          },
        }}
      >
        <Link href={goto} underline="none" component={NextLink} passHref>
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
              sx={{
                fontSize: "60px",
                ml: theme.spacing(1),
                color: theme.palette.secondary.main,
                animation: `${arrowBounce} 0.5s infinite alternate`,
              }}
            />
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          mr: -3,

          [theme.breakpoints.down("md")]: {
            position: "fixed",
            backdropFilter: "blur(6px) saturate(2.5)",
            background: `${theme.palette.background.paper}dd !important`,
            width: "100% !important",
            display: "flex",
            padding: "0 !important",
            right: 0,
            zIndex: 999,
            flexDirection: "row !important",
            height: "60px !important",
            bottom: "0px !important",
            alignItems: "center",
            justifyContent: "space-evenly",
          },
        }}
      >
        {SocialMedias.map((social, index) => (
          <CustomLink
            href={social.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Go to Nick Brady\'s ${social.label} Page`}
            title={`${social.label} Page`}
            sx={{
              mr: 0,
              transition: "all 1s ease",
              cursor: "pointer",
              p: theme.spacing(1, 1.5),
              "&:first-of-type": {
                pl: 0,
              },
            }}
          >
            <IconButton
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
      </Box>
    </>
  );
};

export default FooterLink;
