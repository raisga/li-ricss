"use client";

import { useChat } from "ai/react";
import { ChangeEvent, useMemo } from "react";
import { insertDataIntoMessages } from "../lib/utils";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import Status, { EventData } from "./status";

export default function ChatSection() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    data,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
  });

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  const handleSelectorChange = (optionsValues: string[]) => {
    const e = { target: { value: optionsValues.join(', ') } } as ChangeEvent<HTMLInputElement>;
    handleInputChange(e);
  };

  return (
    <div className="flex gap-4 justify-center w-[90vw]">
      <div className="space-y-4 max-w-5xl w-full">
        <ChatMessages
          messages={transformedMessages}
          isLoading={isLoading}
          reload={reload}
          stop={stop}
        />
        <ChatInput
          input={input}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleSelectorChange={handleSelectorChange}
          multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
        />
      </div>
      <Status data={data as unknown as EventData[]} />
    </div>
  );
}
