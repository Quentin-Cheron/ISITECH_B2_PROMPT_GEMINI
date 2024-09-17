"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ActionError, authenticatedAction } from "@/lib/safe-action";
import { channelIdSchema, chatSchema } from "@/schemas/chat";
import { db } from "@/lib/db";

export const addMessage = authenticatedAction
  .schema(chatSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const { message, channelId } = parsedInput;

    if (!message) {
      throw new ActionError("Le message et l'ID du canal sont requis");
    }

    // Vérifie si le canal existe
    const channel = await db.channel.findUnique({
      where: { id: channelId },
    });

    if (!channel) {
      await db.channel.create({
        data: {
          name: `channel ${channelId}`,
          userId,
        },
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);

    // Ajoute le message
    await db.message
      .create({
        data: {
          sendMessage: message,
          getMessage: result.response.text(),
          channelId,
          userId,
        },
      })
      .catch((err) => console.log("prisma error; ", err));

    return { message: result.response.text() };
  });

export const getMessageFromChannel = authenticatedAction
  .schema(channelIdSchema)
  .action(async ({ parsedInput }) => {
    const { channelId } = parsedInput;

    if (!channelId) {
      throw new ActionError("Le message est requis");
    }

    const existingChannel = await db.channel.findUnique({
      where: { id: channelId },
    });

    if (!existingChannel) {
      throw new ActionError("Le channel n'existe pas");
    }

    const existingMessages = await db.message.findMany({
      where: {
        channelId: existingChannel.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { existingMessages };
  });
