"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { actionClient, ActionError } from "@/lib/safe-action";
import { chatSchema } from "@/schemas/chat";

export const addMessage = actionClient
  .schema(chatSchema)
  .action(async ({ parsedInput }) => {
    const { message } = parsedInput;

    if (!message) {
      throw new ActionError("Le message est requis");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);

    return { message: result.response.text() }; // Assurez-vous de renvoyer le texte généré
  });
