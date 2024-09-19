import * as z from "zod";

export const chatSchema = z.object({
  message: z.string(),
  channelId: z.string(),
  output: z.string(),
});

export const channelSchema = z.object({
  channel: z.string(),
});

export const channelIdSchema = z.object({
  channelId: z.string(),
});
