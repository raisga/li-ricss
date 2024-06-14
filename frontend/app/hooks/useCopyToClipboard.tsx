"use client";

import * as React from "react";

export type Props = {
  timeout?: number;
}

function useCopyToClipboard({ timeout = 2000 }: Props) {
  const [isCopied, setIsCopied] = React.useState<Boolean>(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText || !value) {
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}

export default useCopyToClipboard;
