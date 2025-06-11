import { Link, LinkProps } from "@mui/material"
import NextLink from "next/link"

interface CustomLinkProps extends Omit<LinkProps, "component"> {
  href: string
  children: React.ReactNode
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
  )
}

export default CustomLink
