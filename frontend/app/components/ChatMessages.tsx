'use client';

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import ChatActions from "@/app/components/ChatActions";
import ChatMessage from "@/app/components/ChatMessage";
import { IChatHandler } from "@/app/lib/interfaces";
import useCopyToClipboard from "@/app/hooks/useCopyToClipboard";

function ChatMessages(
  props: Pick<IChatHandler, "messages" | "isLoading" | "reload" | "stop">,
) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const messageLength = props.messages.length;
  const lastMessage = props.messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== "user";
  const showReload =
    props.reload && !props.isLoading && isLastMessageFromAssistant;
  const showStop = props.stop && props.isLoading;

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = props.isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage]);

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-xl pb-0">
      <div
        className="flex h-[50vh] flex-col gap-5 divide-y overflow-y-auto pb-4"
        ref={scrollableChatContainerRef}
      >
        {props.messages.map((m) => m.role !== 'user' && (
          <ChatMessage key={m.id} {...m} />
        ))}
        {isPending && (
          <div className="flex justify-center items-center pt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      <div className="flex justify-end py-4">
        <ChatActions
          reload={props.reload}
          stop={props.stop}
          showReload={showReload}
          showStop={showStop}
          // NOTE: type Boolean -> boolean
          isCopied={!!isCopied}
          copy={() => copyToClipboard(lastMessage?.content || '')}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
