import React from "react";
import NextLink from "next/link";
import { Box, Typography, Link, IconButton, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { arrowBounce } from "@/styles/keyframes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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

const FooterLink: React.FC<IFooterLink> = ({ children, goto = "/" }) => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ mt: 4 }}>
      <Link href="{goto}" underline="none" component={NextLink} passHref>
        <Typography
          sx={{
            fontSize: theme.typography.body2.fontSize,
            fontWeight: theme.typography.fontWeightMedium,
            display: "inline-flex",
            alignItems: "center",
            mb: theme.spacing(2),
            "&:hover .MuiSvgIcon-root": {
              ml: theme.spacing(2),
            },
          }}
        >
          {children}
          <ArrowForwardIcon
            sx={{
              ml: theme.spacing(1),
              animation: `${arrowBounce} 0.5 infinite alternate`,
            }}
          />
        </Typography>
      </Link>
    </Box>
  );
};

export default FooterLink;
