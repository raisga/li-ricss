import { JSONValue, Message } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IEventData } from "@/app/lib/interfaces";

export const isValidMessageData = (rawData: JSONValue | undefined) => {
  if (!rawData || typeof rawData !== "object") return false;
  if (Object.keys(rawData).length === 0) return false;
  return true;
};

export const insertDataIntoMessages = (
  messages: Message[],
  data: JSONValue[] | undefined
) => {
  // console.log(data);
  if (!data) return messages;
  messages.forEach((message, i) => {
    const rawData = data[i];
    if (isValidMessageData(rawData)) message.data = rawData;
  });
  return messages;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLastStatusData(data: IEventData[] | undefined) {
  const statusIndex = data?.map((d) => d.status).lastIndexOf('loading');
  if (statusIndex === -1) {
    return []
  };
  return data?.slice(statusIndex);
}