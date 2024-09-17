"use client";

import { useEffect, useState } from "react";

import ChatInput from "@/components/chat/chat-input";
import ChatWindow from "@/components/chat/chat-window";
import { allMessages } from "@/types";
import { useParams } from "next/navigation";
import { getMessageFromChannel } from "@/actions/chatbot";

export default function Home() {
  const [data, setData] = useState<allMessages>([]);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMessageFromChannel({ channelId: id });

        if (!res.validationErrors && !res.serverError) {
          setData(res?.data?.existingMessages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="grid grid-rows-[1fr_max-content] min-h-screen">
      <ChatWindow data={data} id={id} />
      <ChatInput id={id} setData={setData} />
    </div>
  );
}
