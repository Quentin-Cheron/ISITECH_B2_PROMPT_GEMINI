"use server";

import { ActionError, authenticatedAction } from "@/lib/safe-action";
import { channelIdSchema, chatSchema } from "@/schemas/chat";
import { db } from "@/lib/db";
import { training } from "@/lib/training";

export const addMessage = authenticatedAction
  .schema(chatSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const { message, channelId, output } = parsedInput;

    if (channelId === "training") {
      const res = await training({
        text_input: message,
        output,
      });

      return null;
    }

    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const ipPublique = data.ip;

    // Vérifie si l'utilisateur a déjà fait une requête ce mois-ci
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    let userRequest = await db.userRequest.findFirst({
      where: {
        ip: ipPublique,
        month: { gte: startOfMonth },
      },
    });

    if (userRequest) {
      // Vérifie si l'utilisateur a dépassé les 100 requêtes
      if (userRequest.requests >= 10) {
        throw new ActionError(
          "Limite de 10 requêtes par mois atteinte pour cette IP."
        );
      }

      // Incrémente le compteur de requêtes
      await db.userRequest.update({
        where: { id: userRequest.id },
        data: { requests: { increment: 1 } },
      });
    } else {
      // Crée une nouvelle entrée pour cet utilisateur et ce mois
      await db.userRequest.create({
        data: {
          ip: ipPublique,
          requests: 1,
          month: startOfMonth,
        },
      });
    }

    if (!message) {
      throw new ActionError("Le message est requis");
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
      "détail un peu ce que tu dis",
      "si tu dois dire une liste de choses, fait une liste avec des points et le contenu à coté puis met un retour à la ligne, sans caractère spécial, court et concis",
    ];

    try {
      const res = await fetch(
        `${base_url}/v1beta/tunedModels/${process.env.MODEL_ID}:generateContent`,
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
