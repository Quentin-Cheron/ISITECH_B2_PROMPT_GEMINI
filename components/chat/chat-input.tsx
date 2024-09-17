"use client";

/* eslint-disable import/order */

import { useState } from "react";

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

// ChatInput component

export default function ChatInput({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<allMessages>>;
}) {
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: { message: string }) => {
    const res = await addMessage({ message: data.message });

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
        <Button color="primary" type="submit">
          Button
        </Button>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
}
