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

    try {
      const res = await fetch(
        `${base_url}/v1beta/tunedModels/number-generator-model-dzlmi0gswwqb`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "x-goog-user-project": project_id,
          },
          body: JSON.stringify({
            display_name: "number generator model",
            base_model: "models/gemini-1.5-flash",
            tuning_task: {
              hyperparameters: {
                batch_size: 2,
                learning_rate: 0.001,
                epoch_count: 5,
              },
              training_data: {
                examples: {
                  examples: [
                    {
                      text_input: "1",
                      output: "2",
                    },
                    {
                      text_input: "3",
                      output: "4",
                    },
                    {
                      text_input: "-3",
                      output: "-2",
                    },
                    {
                      text_input: "twenty two",
                      output: "twenty three",
                    },
                    {
                      text_input: "two hundred",
                      output: "two hundred one",
                    },
                    {
                      text_input: "ninety nine",
                      output: "one hundred",
                    },
                    {
                      text_input: "8",
                      output: "9",
                    },
                    {
                      text_input: "-98",
                      output: "-97",
                    },
                    {
                      text_input: "1,000",
                      output: "1,001",
                    },
                    {
                      text_input: "10,100,000",
                      output: "10,100,001",
                    },
                    {
                      text_input: "thirteen",
                      output: "fourteen",
                    },
                    {
                      text_input: "eighty",
                      output: "eighty one",
                    },
                    {
                      text_input: "one",
                      output: "two",
                    },
                    {
                      text_input: "three",
                      output: "four",
                    },
                    {
                      text_input: "seven",
                      output: "eight",
                    },
                  ],
                },
              },
            },
          }),
        }
      );

      // if (!res.ok) {
      //   throw new ActionError(`HTTP error! status: ${res.status}`);
      // }

      console.log(res.status);

      const data = await res.text();
      return { message: data };
    } catch (error) {
      console.error("Error:", error);
    }

    // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const result = await model.generateContent(message);

    // // Ajoute le message
    // await db.message
    //   .create({
    //     data: {
    //       sendMessage: message,
    //       getMessage: result.response.text(),
    //       channelId,
    //       userId,
    //     },
    //   })
    //   .catch((err) => console.log("prisma error; ", err));
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
