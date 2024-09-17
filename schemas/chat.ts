import * as z from "zod";

export const chatSchema = z.object({
  message: z.string(),
});
