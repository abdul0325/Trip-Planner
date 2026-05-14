import { z } from "zod";
import { LoginSchema } from "../login/login.schema";

const Error = {
    name: {
        required: "Name is required",
        invalid: "Invalid name",
    },
}

export const RegisterSchema = LoginSchema.extend({
  name: z
    .string({ error: Error.name.required })
    .trim()
    .min(1, Error.name.required)
    .max(255, Error.name.invalid),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
