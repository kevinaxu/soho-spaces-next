import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Divider,
  Radio,
  Button,
} from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Row } from "@/src/components/Layout";

interface ContactFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  projectType?: "Commercial" | "Residential";
  projectDetails?: string;
  estimatedStartDate?: string;
}

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormInputs>();

  const projectType = watch("projectType");

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log("submitted da form!", data);
  };

  return (
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
        <RadioGroup row sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <FormControlLabel
            value="Commercial"
            control={
              <Radio
                checked={projectType === "Commercial"}
                onClick={() =>
                  setValue(
                    "projectType",
                    projectType === "Commercial" ? undefined : "Commercial"
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
                    projectType === "Residential" ? undefined : "Residential"
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
  );
}
