export type ProjectType = "project" | "tools" | "open-source"

export type Example = (
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; alt: string; poster?: string }
  | { kind: "excerpt"; text: string }
) & { caption?: string }

export interface Project {
  id: string
  title: string
  description: string
  type: readonly ProjectType[]
  about?: string
  technologies?: readonly string[]
  links?: readonly { label: string; href: string }[]
  examples?: readonly Example[]
}
