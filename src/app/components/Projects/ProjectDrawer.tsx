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
  open,
  onClose,
  onExited,
}: {
  project: Project | null
  open: boolean
  onClose: () => void
  onExited: () => void
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const [lead, ...remaining] = project?.examples ?? []
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={reducedMotion ? 0 : undefined}
      slotProps={{
        transition: {
          onExit: (paper: HTMLElement) => {
            for (const player of paper.querySelectorAll<HTMLMediaElement>(
              "video, audio",
            )) {
              player.pause()
            }
          },
          onExited,
        },
        paper: {
          role: "dialog",
          "aria-modal": true,
          "aria-labelledby": "project-title",
          "aria-describedby": "project-summary",
          inert: !open,
          sx: {
            width: "min(100%, 37.5rem)",
            color: "#0f1922",
            overflow: "hidden",
            borderLeft: "2px solid #0f1922",
            boxShadow: "-6px 0 0 rgba(21, 77, 119, 0.14)",
          },
        },
      }}
    >
      <Box
        sx={{
          height: "3px",
          flexShrink: 0,
          background:
            "linear-gradient(90deg, #154d77 0%, #154d77 72%, #f50057 72%, #f50057 100%)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexShrink: 0,
          justifyContent: "flex-end",
          px: { xs: 2.5, sm: 4 },
          pt: 1.25,
        }}
      >
        <IconButton
          aria-label="Close project details"
          onClick={onClose}
          sx={{
            color: "#0f1922",
            minWidth: 44,
            minHeight: 44,
            "&:hover": { color: "#f50057" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {project && (
        <Box
          key={project.id}
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overscrollBehavior: "contain",
            overflowWrap: "anywhere",
            px: { xs: 2.5, sm: 4 },
            pt: 0.5,
            pb: 4,
          }}
        >
          <Typography
            id="project-title"
            component="h2"
            variant="h4"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {project.title}
          </Typography>
          <Typography
            id="project-summary"
            sx={{ color: "#46535c", fontSize: "1.1rem", mb: 3 }}
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
            <Box sx={{ borderTop: "1px solid #cbd6de", pt: 2, mt: 3 }}>
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
                  mt: 0.75,
                  color: "#46535c",
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
                          bgcolor: "#0f1922",
                          px: 2.25,
                          py: 1,
                          borderRadius: "2px",
                          textDecoration: "none",
                          boxShadow: "3px 3px 0 #154d77",
                          transition:
                            "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease",
                          "&:hover": {
                            transform: "translate(-1px, -1px)",
                            boxShadow: "4px 4px 0 #f50057",
                          },
                          "@media (prefers-reduced-motion: reduce)": {
                            transition: "none",
                            "&:hover": { transform: "none" },
                          },
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
