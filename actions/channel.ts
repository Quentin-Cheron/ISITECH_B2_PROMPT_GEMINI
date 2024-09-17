"use server";

import { db } from "@/lib/db";
import { ActionError, authenticatedAction } from "@/lib/safe-action";

export const addChannelAction = authenticatedAction.action(
  async ({ ctx: { user } }) => {
    const userId = user.id;
    const allChannels = await db.channel.findMany({
      where: {
        userId: user.id,
      },
    });

    console.log("id", user);

    await db.channel
      .create({
        data: {
          name: `channel ${allChannels.length + 1}`,
          user: { connect: { id: userId } },
        },
      })
      .catch((err) => console.log("prisma error; ", err));

    return { channels: allChannels };
  }
);

export const getChannelAction = authenticatedAction.action(
  async ({ ctx: { user } }) => {
    const allChannels = await db.channel.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!allChannels || allChannels.length === 0) {
      throw new ActionError("Aucun channel trouvé");
    }

    return { channels: allChannels };
  }
);

export const getOneLastChannel = authenticatedAction.action(
  async ({ ctx: { user } }) => {
    const allChannels = await db.channel.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    if (!allChannels || allChannels.length === 0) {
      throw new ActionError("Aucun channel trouvé");
    }

    return { channels: allChannels };
  }
);
