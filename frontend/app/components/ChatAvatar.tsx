import { User2 } from "lucide-react";
import Image from "next/image";
import { logoAlt, logoPath } from "@/app/lib/constants";

function ChatAvatar({ role }: { role: string }) {
  if (role === "user") {
    return (
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-background">
        <User2 className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-black text-white">
      <Image
        className="rounded-md"
        src={logoPath}
        alt={logoAlt}
        width={24}
        height={24}
        priority
      />
    </div>
  );
}

export default ChatAvatar;
