"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ChatInput from "@/components/chat/chat-input";
import ChatWindow from "@/components/chat/chat-window";
import { allMessages } from "@/types";
import { getMessageFromChannel } from "@/actions/chatbot";

export default function Home() {
  const [data, setData] = useState<allMessages>([]);

  const params = useParams();
  const { id } = params;

  return (
    <div className="grid grid-rows-[1fr_max-content] min-h-screen">
      <ChatWindow data={data} />
      <ChatInput id={id} setData={setData} />
    </div>
  );
}
