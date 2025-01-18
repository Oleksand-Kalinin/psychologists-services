import * as yup from "yup";

export const LogInValidationSchema = yup
    .object({
        email: yup
            .string()
            .email("Incorrect email address")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "The password must be at least 8 characters long")
            .required("Password is required"),
    })
    .required();