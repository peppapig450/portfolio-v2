import { SvgIconComponent } from "@mui/icons-material"
import { LinkProps } from "next/link"

export type ProjectReference = {
  name: string
  description: string
  technologies: readonly string[]
  impact?: string
  href?: LinkProps["href"]
}

export type TechnicalDomainType = {
  title: string
  subtitle?: string
  icon: SvgIconComponent
  description: string
  keySkills: readonly string[]
  featuredProjects: readonly ProjectReference[]
  achievements?: readonly string[]
  /** URL for "learn more" or CTA */
  href?: LinkProps["href"]
  /** Friendly label for the link */
  label?: string
  /** For accessibility on non-textual link */
  ariaLabel?: string
}

/**
 * Using a string-union is more tree-shakeable and interoperable
 * than a TS `enum`.
 */
export type TechnicalDomain =
  | "fullstack"
  | "datascience"
  | "systemdevops"
  | "cybersecurity"
