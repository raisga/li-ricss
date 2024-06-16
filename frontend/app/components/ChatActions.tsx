'use client';

import { PauseCircle, RefreshCw, Check, Copy } from "lucide-react";
import Button from "@/app/components/Button";
import { IChatHandler } from "@/app/lib/interfaces";

export type Props = 
  Pick<IChatHandler, "stop" | "reload" | "copy"> 
  & { showReload?: boolean; showStop?: boolean; isCopied? : boolean }

function ChatActions({ stop, reload, copy, showStop, showReload, isCopied }: Props) {
  const actions = [
    {
      isVisible: showStop,
      onClick: stop,
      label: 'Stop generating',
      icon: <PauseCircle className="mr-2 h-4 w-4" />,
    },
    {
      isVisible: showReload,
      onClick: reload,
      label: 'Regenerate',
      icon: <RefreshCw className="mr-2 h-4 w-4" />,
    },
    {
      isVisible: true,
      onClick: copy,
      label: 'Copy',
      icon: isCopied ? (
        <Check className="mr-2 h-4 w-4" />
      ) : (
        <Copy className="mr-2 h-4 w-4" />
      )
    }
  ];
  return (
    <div className="space-x-4">
      {actions.map(({ isVisible, onClick, label, icon }) => isVisible ? (
        <Button key={`chat-action_${label}`} variant="outline" size="sm" onClick={onClick}>
          {icon}
          {label}
        </Button>
      ) : null)}
    </div>
  );
}

export default ChatActions;
