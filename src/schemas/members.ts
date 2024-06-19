import { z } from "zod";

export const memberSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
});