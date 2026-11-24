import type { Project } from "@/types/project"
import CloseIcon from "@mui/icons-material/Close"
import {
  Box,
  Drawer,
  IconButton,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material"
import ExampleRenderer from "./ExampleRenderer"

export default function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const [lead, ...remaining] = project?.examples ?? []
  return (
    <Drawer
      anchor="right"
      open={project !== null}
      onClose={onClose}
      transitionDuration={reducedMotion ? 0 : undefined}
      slotProps={{
        paper: {
          role: "dialog",
          "aria-modal": true,
          "aria-labelledby": "project-title",
          "aria-describedby": "project-summary",
          sx: {
            width: "min(100%, 37.5rem)",
            color: "#202124",
            overscrollBehavior: "contain",
            overflowWrap: "anywhere",
          },
        },
      }}
    >
      {project && (
        <Box key={project.id} sx={{ px: { xs: 2.5, sm: 4 }, pb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              gap: 2,
              pt: 3,
              pb: 1,
              bgcolor: "white",
            }}
          >
            <Typography
              id="project-title"
              component="h2"
              variant="h4"
              sx={{ fontWeight: 600 }}
            >
              {project.title}
            </Typography>
            <IconButton
              aria-label="Close project details"
              onClick={onClose}
              sx={{ color: "primary.main", flexShrink: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            id="project-summary"
            sx={{ color: "#46535C", fontSize: "1.1rem", mb: 3 }}
          >
            {project.description}
          </Typography>
          {lead && <ExampleRenderer example={lead} surface="detail" />}
          {project.about && (
            <Typography sx={{ my: 3, lineHeight: 1.65 }}>
              {project.about}
            </Typography>
          )}
          {remaining.map((example, index) => (
            <Box key={index} sx={{ mt: 3 }}>
              <ExampleRenderer example={example} surface="detail" />
            </Box>
          ))}
          {project.technologies?.length ? (
            <Box sx={{ borderTop: "1px solid #CBD6DE", pt: 2, mt: 3 }}>
              <Typography component="h3" sx={{ fontWeight: 700 }}>
                Technologies
              </Typography>
              <Box
                component="ul"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  mt: 0.5,
                  color: "#46535C",
                  columnGap: "0.4em",
                  "& li:not(:last-child)::after": { content: "','" },
                }}
              >
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </Box>
            </Box>
          ) : null}
          {project.links?.length ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mt: 3,
              }}
            >
              {project.links.map(({ label, href }, index) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontWeight: 700,
                    ...(index === 0
                      ? {
                          color: "white",
                          bgcolor: "primary.main",
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }
                      : {}),
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          ) : null}
        </Box>
      )}
    </Drawer>
  )
}
