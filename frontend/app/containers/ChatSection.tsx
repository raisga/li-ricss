'use client';

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Message, useChat } from "ai/react";
import ChatInput from "@/app/components/ChatInput";
import ChatMessages from "@/app/components/ChatMessages";
import DataStatus from "@/app/components/DataStatus";
import { getLastStatusData, insertDataIntoMessages } from "@/app/lib/utils";
import { IEventData } from "@/app/lib/interfaces";
import CollapsibleMessages from "@/app/components/CollapsibleMessages";

function ChatSection() {
  const [statusData, setStatusData] = useState<IEventData[]>();
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File>();
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    // reload,
    // setMessages,
    stop,
    data,
  } = useChat({
    api: `${process.env.NEXT_PUBLIC_BASEURL_API}${process.env.NEXT_PUBLIC_CHAT_ENDPOINT}`,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    onFinish: (msg) => setChatHistory((hist) => [...hist, msg]),
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

  const handleReload = () => {
    // setMessages([]);
    handleSubmit({
      preventDefault: () => {},
      target: {
        // @ts-ignore
        value: input,
      }
    });
    // reload();
  };

  const handleUploadFile = async (file: File) => {
    setUploadedFile(file);
  };

  return (
    <div className="flex gap-4 justify-center w-[90vw]">
      <div className="space-y-4 max-w-5xl w-full">
        <ChatInput
          input={input}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleSelectorChange={handleSelectorChange}
          multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
          isValid={input.length > 0 && uploadedFile !== undefined}
          isDisabled={isLoading}
          onFileUpload={handleUploadFile}
        />
        {uploadedFile && messages.length === 0 && (
          <p>{uploadedFile.name}</p>
        )}
        {messages?.length > 0 && (
          <ChatMessages
            messages={transformedMessages}
            isLoading={isLoading}
            reload={handleReload}
            stop={stop}
          />
        )}
        {chatHistory.length > 0 && (
          <CollapsibleMessages messages={chatHistory}/>
        )}
      </div>
      <DataStatus data={statusData as unknown as IEventData[]} />
    </div>
  );
}

export default ChatSection;
