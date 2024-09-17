"use client";

import { useState } from "react";

import ChatInput from "@/components/chat/chat-input";
import ChatWindow from "@/components/chat/chat-window";
import { allMessages } from "@/types";

export default function Home() {
  const [data, setData] = useState<allMessages>([]);

  return (
    <div className="grid grid-rows-[1fr_max-content] min-h-screen">
      <ChatWindow data={data} />
      <ChatInput setData={setData} />
    </div>
  );
}
