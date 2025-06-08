"use client"
import { useTransitions } from "@/hooks/useTransitions"
import {
  AlertColor,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import { motion } from "framer-motion"
import React, { ChangeEvent, FormEvent, useState } from "react"
import FooterLink from "../FooterLink"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface SnackbarState {
  open: boolean
  message: string
  severity: AlertColor
}

const StyledForm = styled("form")(({ theme }) => ({
  "& .MuiFormControl-root": {
    marginBottom: theme.spacing(3),
  },
  "&. MuiButton-root": {
    marginBottom: theme.spacing(4),
  },
}))

const ContactContent: React.FC = () => {
  const [formState, setFormState] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  })
  const theme = useTheme()
  const motionPropsHeading = useTransitions(0.2)
  const motionPropsIntro = useTransitions(0.4)
  const motionPropsForm = useTransitions(0.6)
  const motionPropsFooter = useTransitions(0.8)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    let tempErrors: FormErrors = {}
    if (!formState.name) tempErrors.name = "Name is required"
    if (!formState.email) {
      tempErrors.email = "Email is required"
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)
    ) {
      tempErrors.email = "Invalid email address"
    }
    if (!formState.message) tempErrors.message = "Message is required"
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateForm()) {
      try {
        const response = await fetch("https://formspree.io/f/xvgpnjzz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        })

        if (response.ok) {
          setSnackbar({
            open: true,
            message: "Message sent successfully!",
            severity: "success",
          }),
            setFormState({ name: "", email: "", message: "" })
        } else {
          throw new Error("Form submission failed.")
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to send message. Please try again.",
          severity: "error",
        })
      }
    }
  }

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickway") {
      return
    }
    setSnackbar((prevState) => ({ ...prevState, open: false }))
  }

  return (
    <>
      <Container
        maxWidth="md"
        id="main-content"
        sx={{ mb: 5, px: theme.spacing(1.785), mx: "auto" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }}>
            <motion.div {...motionPropsHeading}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  pl: theme.spacing(2),
                  mt: theme.spacing(8),
                  mb: theme.spacing(3),
                }}
              >
                Contact.
              </Typography>
            </motion.div>
            <article>
              <motion.div {...motionPropsHeading}>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ mb: theme.spacing(4), pl: theme.spacing(2) }}
                >
                  Get in touch or shoot me an email directly on{" "}
                  <Typography component="span" fontWeight="bold">
                    contact@nickbrady.dev
                  </Typography>
                </Typography>
              </motion.div>
            </article>
            <motion.div {...motionPropsForm}>
              <StyledForm onSubmit={handleSubmit}>
                <Grid
                  container
                  direction="column"
                  sx={{ pl: theme.spacing(2), mt: theme.spacing(5) }}
                >
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.name}>
                      <TextField
                        name="name"
                        label="Name"
                        value={formState.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        variant="standard"
                      />
                      <FormHelperText>{errors.name}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.email}>
                      <TextField
                        name="email"
                        label="Email"
                        value={formState.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        variant="standard"
                      />
                      <FormHelperText>{errors.email}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.message}>
                      <TextField
                        name="message"
                        label="Message"
                        multiline
                        maxRows={4}
                        variant="standard"
                        value={formState.message}
                        onChange={handleChange}
                        error={!!errors.message}
                      />
                      <FormHelperText>{errors.message}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mt: 2, pl: theme.spacing(2) }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </StyledForm>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        id="main-content"
        sx={{ mb: 5, px: theme.spacing(1.785), mx: "auto" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, md: 10 }}>
            <motion.div {...motionPropsFooter}>
              <Box sx={{ pl: theme.spacing(2) }}>
                <FooterLink goto="/">Go Back Home</FooterLink>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ContactContent
