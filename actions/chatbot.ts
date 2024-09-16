import { actionClient } from "@/lib/safe-action";
import { schema } from "@/schemas/chat";

export const addMessage = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
  });
