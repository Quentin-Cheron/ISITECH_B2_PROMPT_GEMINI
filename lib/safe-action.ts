import { createSafeActionClient } from "next-safe-action";
import { currentVisitor } from "./auth";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleReturnedServerError: (err) => {
    if (err instanceof ActionError) {
      return err.message;
    }
    return "Internal server error";
  },
});

export const authenticatedAction = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const user = await currentVisitor();

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

export const isProAction = authenticatedAction.use(
  async ({ next, ctx: { user } }) => {
    if (user.role !== "PRO") {
      throw new ActionError("User is not a professional!");
    }
    return next({ ctx: { user } });
  }
);
