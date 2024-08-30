import React from "react";
import NextLink from "next/link";
import {
  Box,
  Typography,
  Link,
  TypographyProps,
  IconButton,
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
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

interface IFooterLink {
  children: string | React.ReactNode;
  goto?: string;
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

const FooterLink: React.FC<IFooterLink> = ({ children, goto = "/" }) => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ mt: 4 }}>
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
  );
};

export default FooterLink;
