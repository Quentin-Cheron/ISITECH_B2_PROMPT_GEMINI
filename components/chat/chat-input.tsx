"use client";

/* eslint-disable import/order */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// FORM
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// COMPONENTS NEXT-UI
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// ACTIONS
import { addMessage } from "@/actions/chatbot";

// SCHEMAS
import { chatSchema } from "@/schemas/chat";
import { notifySuccess } from "@/lib/notify";
import { allMessages } from "@/types";
import { getOneLastChannel } from "@/actions/channel";

// ChatInput component

export default function ChatInput({
  setData,
  id,
}: {
  setData: React.Dispatch<React.SetStateAction<allMessages>>;
  id: string;
}) {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
      channelId: id === undefined ? "" : id,
    },
  });

  const onSubmit = (data: { message: string }) => {
    startTransition(async () => {
      try {
        const res = await addMessage({
          message: data.message,
          channelId: id === undefined ? "" : id,
        });

        console.log(res);

        if (res?.data?.message) {
          setError("");
          notifySuccess("Message envoyé");
          setData((prev: allMessages) => [
            ...prev,
            {
              sendMessage: data.message,
              getMessage: res?.data?.message,
              createdAt: new Date(),
            },
          ]);
        }

        if (res?.serverError) {
          setError(res.serverError);
        }

        if (res?.validationErrors) {
          setError("Les champs sont invalides");
        }
      } catch (error) {
        console.error("Error during submission:", error);
        setError("Une erreur est survenue");
      }
    });
  };

  const getLastChannelAdded = async () => {
    startTransition(async () => {
      const res = await getOneLastChannel();

      if (res?.data?.channels) {
        router.push(`/c/${res?.data?.channels[0].id}`);
      }

      router.refresh();
    });
  };

  return (
    <>
      <form
        className="flex gap-5 relative top-0 mb-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          {...form.register("message")}
          placeholder="Message Gemini..."
        />

        {id ? (
          <Button color="primary" type="submit" isLoading={isPending}>
            Button
          </Button>
        ) : (
          <Button
            color="primary"
            type="button"
            onClick={() => getLastChannelAdded()}
            isLoading={isPending}
          >
            Button
          </Button>
        )}
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
}
