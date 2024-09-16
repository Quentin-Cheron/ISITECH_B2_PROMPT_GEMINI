import ChatInput from "@/components/chat/chat-input";
import ChatWindow from "@/components/chat/chat-window";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_max-content] min-h-screen">
      <ChatWindow />
      <ChatInput />
    </div>
  );
}
