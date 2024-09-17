import { createSafeActionClient } from "next-safe-action";
import { currentUser } from "./auth";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (err) => {
    if (err instanceof ActionError) {
      return err.message;
    }
    return "Internal server error";
  },
});

export const authenticatedAction = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const user = await currentUser();

    if (!user) {
      throw new ActionError("User not found!");
    }

    const userId = user.id;

    if (!userId) {
      throw new ActionError("Session is not valid!");
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { user, userId } });
  });
