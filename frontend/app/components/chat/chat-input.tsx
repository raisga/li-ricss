import { useState } from "react";
import { MultiValue } from "react-select";
import { Button } from "../button";
import FileUploader from "../file-uploader";
import UploadImagePreview from "../upload-image-preview";
import { IChatHandler } from "../../lib/interfaces";
import { Selector } from "../selector";

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
    stage?: 'new' | 'chat';
  },
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (imageUrl) {
      props.handleSubmit(e, {
        data: { imageUrl: imageUrl },
      });
      setImageUrl(null);
      return;
    }
    props.handleSubmit(e);
  };

  const onRemovePreviewImage = () => setImageUrl(null);

  const handleUploadImageFile = async (file: File) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
    setImageUrl(base64);
  };

  const handleUploadFile = async (file: File) => {
    try {
      if (props.multiModal && file.type.startsWith("image/")) {
        return await handleUploadImageFile(file);
      }
      props.onFileUpload?.(file);
    } catch (error: any) {
      props.onFileError?.(error.message);
    }
  };

  const handleOnChange = async (options: MultiValue<{value: string; label: string}>) => {
    const optionsValues = options.map(({ value }) => value);
    props.handleSelectorChange?.(optionsValues);
  }

  const defaultOptions = [
    { value: 'time', label: 'Time' },
    { value: 'nostalgia', label: 'Nostalgia' },
    { value: 'moments', label: 'Moments' },
  ];

  const disabled = false; // !(selectedOptions.length > 0)
  const allowedExtensions = ['pdf', 'txt', 'md'];
  const buttonLabel = '📝 Generate Lyrics';
  const placeholderSelector = 'Select themes regarding the lyrics...';
  
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white p-4 shadow-xl space-y-4"
    >
      {imageUrl && (
        <UploadImagePreview url={imageUrl} onRemove={onRemovePreviewImage} />
      )}
      <div className="flex w-full items-start justify-between gap-4 ">
        <Selector
          onChange={handleOnChange}
          options={defaultOptions}
          placeholder={placeholderSelector}
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
