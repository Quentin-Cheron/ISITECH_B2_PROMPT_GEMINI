import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (err) => {
    if (err instanceof ActionError) {
      return err.message;
    }
    return "Internal server error";
  },
});
