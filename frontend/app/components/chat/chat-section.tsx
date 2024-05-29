"use client";

import { Message, useChat } from "ai/react";
import { ChangeEvent, useMemo } from "react";
import { insertDataIntoMessages } from "../../lib/utils";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import Status from "../status";
import { IEventData } from "@/app/lib/interfaces";

// const getChatApi = (msgs: Message[]) => console.log({ msgs }) || `${process.env.BASEURL_API}${msgs.length > 0 ? process.env.CHAT_ENDPOINT : process.env.NEW_ENDPOINT}`;

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
    api: `${process.env.NEXT_BASEURL_API}${process.env.NEXT_CHAT_ENDPOINT}`,
    // process.env.NEXT_PUBLIC_CHAT_API,
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
          messages={messages}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleSelectorChange={handleSelectorChange}
          multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}  
        />
      </div>
      <Status data={data as unknown as IEventData[]} />
    </div>
  );
}
