import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Divider,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import { Row, Column } from "../src/components/Layout";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

interface ContactFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  projectType?: "Commercial" | "Residential";
  projectDetails?: string;
  estimatedStartDate?: string;
}

const sidebarImage =
  "https://soho-spaces.com/assets/dark-academia/IMG_0008.jpeg";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log("submitted da form!", data);
  };

  const projectType = watch("projectType");

  return (
    <>
      <Header sticky={true} />

      {/* this is the main table shell */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "70vh",
          maxHeight: "800px", // ✅ add this line
          gap: 4,
        }}
      >
        {/* LEFT COLUMN: Image */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "33%",
            backgroundImage: `url(${sidebarImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />

        {/* RIGHT COLUMN: Form */}
        <Box
          sx={{
            flex: 2,
            px: { xs: 2, md: 12 },
            py: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxWidth: "100%",
          }}
        >
          <Column
            sx={{
              gap: 3,
              alignItems: "center",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            <Typography variant="h2" sx={{ fontStyle: "italic" }}>
              Design your dream space with us
            </Typography>
            <Typography color="text.secondary">
              Whether you’re starting fresh or refining a vision,we would love
              to learn more about how we can help you bring your design vision
              to life.
            </Typography>
          </Column>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            name="contact"
            data-netlify="true"
            method="POST"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            {/* Hidden input required for Netlify */}
            <input type="hidden" name="form-name" value="contact" />

            {/* Personal Details */}
            <Row sx={{ gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Row>
            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone Number"
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9()+\s-]*$/, // allow only digits, (), +, -, spaces
                  message:
                    "Invalid characters. Only digits, (), -, +, and spaces allowed",
                },
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />

            <Divider sx={{ my: 2 }} />

            {/* Project Details */}
            <Row sx={{ gap: 2, alignItems: "center" }}>
              <RadioGroup
                row
                sx={{ display: "flex", flexDirection: "row", flex: 1 }}
              >
                <FormControlLabel
                  value="Commercial"
                  control={
                    <Radio
                      checked={projectType === "Commercial"}
                      onClick={() =>
                        setValue(
                          "projectType",
                          projectType === "Commercial"
                            ? undefined
                            : "Commercial"
                        )
                      }
                    />
                  }
                  label="Commercial"
                />
                <FormControlLabel
                  value="Residential"
                  control={
                    <Radio
                      checked={projectType === "Residential"}
                      onClick={() =>
                        setValue(
                          "projectType",
                          projectType === "Residential"
                            ? undefined
                            : "Residential"
                        )
                      }
                    />
                  }
                  label="Residential"
                />
              </RadioGroup>
              <TextField
                fullWidth
                label="Estimated Start Date"
                type="date"
                {...register("estimatedStartDate")}
                InputLabelProps={{ shrink: true }}
                sx={{
                  flex: 1,
                }}
              />
            </Row>
            <TextField
              label="Project Details"
              {...register("projectDetails")}
              multiline
              minRows={3}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "flex-start" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
