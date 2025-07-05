"use client"
import type { Project } from "@/contexts/ProjectsContext"
import CloseIcon from "@mui/icons-material/Close"
import GitHubIcon from "@mui/icons-material/GitHub"
import LanguageIcon from "@mui/icons-material/Language"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useEffect } from "react"
import CustomLink from "../CustomLink"
import MediaRenderer from "./MediaRenderer"

interface ISideBarModal {
  show: boolean
  closeShow: () => void
  data?: Project
}

const MediaContainer = styled(Box)({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  height: "300px",
  borderRadius: 11,
})

const TechnologyChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.vars.palette.grey.A400, // Maybe use rgba here?
  color: theme.vars.palette.text.primary,
  fontWeight: "bold",
}))

const OpenProjectButton = styled(Button)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  width: "100%",
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}))

const SideBarModal: React.FC<ISideBarModal> = ({
  show = false,
  closeShow = () => undefined,
  data,
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeShow()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [closeShow])

  const drawerWidth = isSmallScreen ? "100%" : isLargeScreen ? 600 : 500

  if (!data) return null

  return (
    <Drawer
      anchor="right"
      open={show}
      onClose={closeShow}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      slotProps={{
        paper: {
          style: {
            padding: "1.5rem",
          },
          sx: {
            width: drawerWidth,
          },
        },
      }}
    >
      <Box sx={{ position: "relative", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            pb: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <IconButton
            onClick={closeShow}
            size="small"
            aria-label="Close the SideBar project info modal"
          >
            <CloseIcon aria-hidden="true" />
          </IconButton>
          <CustomLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              closeShow()
            }}
            underline="hover"
            aria-label="Return to projects"
          >
            <Typography variant="body1" fontWeight="bold">
              Back To Projects.
            </Typography>
          </CustomLink>
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          id="product-modal-title"
          sx={{
            mt: theme.spacing(3),
            mb: theme.spacing(1),
          }}
        >
          {data?.title}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          sx={{
            mb: theme.spacing(3),
          }}
        >
          {data?.about}
        </Typography>
        <MediaContainer>
          <MediaRenderer
            mediaUrl={data.mediaUrl}
            mediaAlt={data.mediaAlt}
            mediaType={data.mediaType}
            preferredSource="blob"
          />
        </MediaContainer>

        <Typography
          variant="h6"
          component="h4"
          color="textPrimary"
          fontWeight="bold"
          sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
        >
          About
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="textSecondary"
          id="product-modal-description"
          sx={{ mb: theme.spacing(2) }}
        >
          {data?.description}
        </Typography>

        <Typography
          variant="h6"
          component="h4"
          color="textPrimary"
          fontWeight="bold"
          sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
        >
          Technologies
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          {data?.technologies?.map((technology, index) => (
            <TechnologyChip key={index} label={technology} size="small" />
          ))}
        </Stack>

        {data.link && (
          <>
            <Typography
              variant="h6"
              component="h4"
              color="textPrimary"
              fontWeight="bold"
              sx={{ mb: theme.spacing(1.6), mt: theme.spacing(4) }}
            >
              <LanguageIcon aria-hidden="true" sx={{ mr: 1 }} />
              Website
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ mb: theme.spacing(2) }}
            >
              <CustomLink
                href={data?.link}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color={theme.vars.palette.text.primary}
                fontWeight="bold"
                aria-label="Open project website in new tab"
              >
                {data?.link}
              </CustomLink>
            </Typography>
          </>
        )}

        {data.github && (
          <>
            <Typography
              variant="h6"
              component="h4"
              color="textPrimary"
              fontWeight="bold"
              sx={{
                mb: theme.spacing(1.6),
                mt: theme.spacing(4),
              }}
            >
              <GitHubIcon
                fontSize="small"
                aria-hidden="true"
                sx={{ mr: 1, color: theme.vars.palette.text.secondary }}
              />
              Github
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ mb: theme.spacing(2) }}
            >
              <CustomLink
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color={theme.vars.palette.text.primary}
                fontWeight="bold"
                aria-label="Open project GitHub repository in new tab"
              >
                {data.github}
              </CustomLink>
            </Typography>
          </>
        )}

        <CustomLink
          href={data.link ?? data.github}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          aria-label="Open the project in a new tab"
        >
          <OpenProjectButton
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<OpenInNewIcon aria-hidden="true" />}
          >
            Open Project
          </OpenProjectButton>
        </CustomLink>
      </Box>
    </Drawer>
  )
}

export default SideBarModal
