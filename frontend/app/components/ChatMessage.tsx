'use client';

import { Message } from "ai";
import ChatAvatar from "@/app/components/ChatAvatar";
import MarkdownParser from "@/app/components/MarkdownParser";

function ChatMessage(chatMessage: Message) {
  return (
    <div className="flex items-start gap-4 pr-5 pt-5">
      <ChatAvatar role={chatMessage.role} />
      <div className="group flex flex-1 justify-between gap-2">
        <div className="flex-1 space-y-4">
          <MarkdownParser content={chatMessage.content} />
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
