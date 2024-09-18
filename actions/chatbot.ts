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

    const base_url = "https://generativelanguage.googleapis.com";
    const access_token = process.env.GOOGLE_ACCESS_TOKEN;
    const project_id = process.env.GOOGLE_PROJECT_ID;

    const options = [
      "Ecris sans caractère spécial",
      "fais de courts phrases",
      "va directement dans le sujet",
    ];

    try {
      const res = await fetch(
        `${base_url}/v1beta/models/gemini-1.0-pro:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "x-goog-user-project": project_id,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${message}, ${options.map((e) => e).join(", ")}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        throw new ActionError(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const msg = data.candidates[0].content.parts[0].text;
      await db.message.create({
        data: {
          sendMessage: message,
          getMessage: msg,
          channelId,
          userId,
        },
      });
      return {
        message: msg,
      };
    } catch (error) {
      console.error("Error:", error);
    }
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
        createdAt: "asc",
      },
    });

    return { existingMessages };
  });
