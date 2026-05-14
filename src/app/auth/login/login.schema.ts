import { z } from "zod";

const Error = {
    email: {
        required: "Email is required",
        invalid: "Invalid email address",
    },
    password: {
        required: "Password is required",
        invalid: "Invalid password",
    },
}

export const LoginSchema = z.object({
    email: z
        .string({ error: Error.email.required })
        .email(Error.email.invalid)
        .trim()
        .min(1, Error.email.required)
        .max(255, Error.email.invalid),
    password: z
        .string({ error: Error.password.required })
        .trim()
        .min(1, Error.password.required)
        .max(255, Error.password.invalid),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
