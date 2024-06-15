'use client';

import { Check, Copy } from "lucide-react";
import { Message } from "ai";
import Button from "@/app/components/Button";
import ChatAvatar from "@/app/components/ChatAvatar";
import MarkdownParser from "@/app/components/MarkdownParser";
import useCopyToClipboard from "@/app/hooks/useCopyToClipboard";

function ChatMessage(chatMessage: Message) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const onCopy = () => {
    copyToClipboard(chatMessage.content)
  };

  return (
    <div className="flex items-start gap-4 pr-5 pt-5">
      <ChatAvatar role={chatMessage.role} />
      <div className="group flex flex-1 justify-between gap-2">
        <div className="flex-1 space-y-4">
          <MarkdownParser content={chatMessage.content} />
        </div>
        <Button
          onClick={onCopy}
          size="icon"
          variant="ghost"
          className="h-8 w-8 opacity-0 group-hover:opacity-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default ChatMessage;
