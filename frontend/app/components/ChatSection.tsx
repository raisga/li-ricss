'use client';

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useChat } from "ai/react";
import ChatInput from "@/app/components/ChatInput";
import ChatMessages from "@/app/components/ChatMessages";
import Status from "@/app/components/Status";
import { insertDataIntoMessages } from "@/app/lib/utils";
import { IEventData } from "@/app/lib/interfaces";

const apiUrl = process.env.NEXT_BASEURL_API || 'http://localhost:8000/api/';

export default function ChatSection() {
  const [stage, setStage] = useState<'new' | 'chat'>('new');
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
    // api: process.env.NEXT_PUBLIC_CHAT_API,
    // api: `${process.env.NEXT_BASEURL_API}${process.env.NEXT_CHAT_ENDPOINT}`,
    api: `${apiUrl}${stage}`,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
  });

  useEffect(() => {
    if (stage !== 'chat' && messages.length > 0) {
      setStage('chat');
    }
  }, [messages, stage]);

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
        {transformedMessages?.length > 0 && (
          <ChatMessages
            messages={transformedMessages}
            isLoading={isLoading}
            reload={reload}
            stop={stop}
          />
        )}
        {transformedMessages?.length === 0 && (
          <ChatInput
            input={input}
            isLoading={isLoading}
            stage={stage}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            handleSelectorChange={handleSelectorChange}
            multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}  
          />
        )}
      </div>
      <Status data={data as unknown as IEventData[]} />
    </div>
  );
}
