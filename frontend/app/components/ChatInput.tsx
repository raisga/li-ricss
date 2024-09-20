'use client';

import { MultiValue } from "react-select";
import Button from "@/app/components/Button";
import FileUploader from "@/app/components/FileUploader";
import Selector from "@/app/components/Selector";
import { IChatHandler } from "@/app/lib/interfaces";
import { themesOptions } from "../lib/constants";

function ChatInput(
  props: Pick<
    IChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleInputChange"
    | "handleSelectorChange"
  > & {
    multiModal?: boolean;
    isDisabled?: boolean;
  },
) {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    props.handleSubmit(e);
  };

  const handleUploadFile = async (file: File) => {
    try {
      props.onFileUpload?.(file);
    } catch (error: any) {
      props.onFileError?.(error.message);
    }
  };

  const handleOnChange = async (options: MultiValue<{value: string; label: string}>) => {
    const optionsValues = options.map(({ value }) => value);
    props.handleSelectorChange?.(optionsValues);
  }

  const defaultOptions = themesOptions;
  const disabled = false; // !(selectedOptions.length > 0)
  const allowedExtensions = ['pdf', 'txt', 'md'];
  const buttonLabel = '📝 Generate Lyrics';
  const placeholderSelector = 'Select themes regarding the lyrics...';
  
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white p-4 shadow-xl space-y-4"
    >
      <div className="flex w-full items-start justify-between gap-4 ">
        <Selector
          onChange={handleOnChange}
          options={defaultOptions}
          placeholder={placeholderSelector}
          disabled={props.isDisabled}
        />
        <FileUploader
          config={{
            allowedExtensions,
            disabled,
          }}
          onFileUpload={handleUploadFile}
          onFileError={props.onFileError}
        />
        <Button type="submit" disabled={props.isLoading}>
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}


export default ChatInput;
