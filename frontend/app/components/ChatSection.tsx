'use client';

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useChat } from "ai/react";
import ChatInput from "@/app/components/ChatInput";
import ChatMessages from "@/app/components/ChatMessages";
import DataStatus from "@/app/components/DataStatus";
import { getLastStatusData, insertDataIntoMessages } from "@/app/lib/utils";
import { IEventData } from "@/app/lib/interfaces";

function ChatSection() {
  const [statusData, setStatusData] = useState<IEventData[]>();
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
    // TODO: Fix env variables issue NextJS 
    api: 'http://localhost:8000/api/chat',
    // api: `${process.env.NEXT_BASEURL_API}${process.env.NEXT_CHAT_ENDPOINT}`,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
  });

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  useEffect(() => {
    if (data) {
      const newStatusData = getLastStatusData(data as unknown as IEventData[]);
      setStatusData(newStatusData);
    }
  }, [data]);

  const handleSelectorChange = (optionsValues: string[]) => {
    const e = { target: { value: optionsValues.join(', ') } } as ChangeEvent<HTMLInputElement>;
    handleInputChange(e);
  };

  return (
    <div className="flex gap-4 justify-center w-[90vw]">
      <div className="space-y-4 max-w-5xl w-full">
        {messages?.length > 0 && (
          <ChatMessages
            messages={transformedMessages}
            isLoading={isLoading}
            reload={reload}
            stop={stop}
          />
        )}
        {messages?.length === 0 && (
          <ChatInput
            input={input}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            handleSelectorChange={handleSelectorChange}
            multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}  
          />
        )}
      </div>
      <DataStatus data={statusData as unknown as IEventData[]} />
    </div>
  );
}

export default ChatSection;
