import { Message } from "ai";

export interface IChatHandler {
  messages: Message[];
  input: string;
  isLoading: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    ops?: {
      data?: any;
    },
  ) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectorChange?: (optionsValue: string[]) => void;
  reload?: () => void;
  stop?: () => void;
  copy?: () => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
}

export interface IEventData {
  status: string;
  message: string;
}
