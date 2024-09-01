import React from "react";
import NextLink from "next/link";
import { Link, LinkProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CustomLinkProps extends Omit<LinkProps, "component"> {
  href: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link component={NextLink} href={href} passHref {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
