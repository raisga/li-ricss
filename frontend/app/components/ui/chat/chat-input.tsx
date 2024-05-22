import { useState } from "react";
import { Button } from "../button";
import FileUploader from "../file-uploader";
import UploadImagePreview from "../upload-image-preview";
import { ChatHandler } from "./chat.interface";
import ChatSelector from "../selector";
import { MultiValue } from "react-select";

const mockMessage = `
(Verse 1)
In the heart of Panama City, where the sun sets slow,
A trailblazing doctor, Lucia, made her spirit known.
From humble roots she rose, with dreams that dared to grow,
In a world that told her, “No,” she forged her way alone.

(Pre-Chorus)
Through the sands of time, her footsteps left a mark,
In moments of despair, she found the courage to embark.
Her heart, a guiding light, through the darkest of the night,
She healed the world around her, with a spirit burning bright.

(Chorus)
Oh, the moments we remember, the echoes of the past,
Dr. Lucia’s legacy, a light that’s built to last.
In the face of time’s great trial, her spirit stands so tall,
A beacon of nostalgia, that guides us through it all.

(Verse 2)
She faced the doubts and whispers, the skeptics and the scorn,
In a world of men’s dominion, a heroine was born.
With compassion in her hands, and wisdom in her eyes,
She healed the hearts of many, beneath Panama’s skies.

(Pre-Chorus)
Through the sands of time, her story’s still untold,
Of a life that burned so brightly, in the face of growing old.
Her moments of pure triumph, her battles and her pain,
They linger in our hearts, like a gentle summer rain.

(Chorus)
Oh, the moments we remember, the echoes of the past,
Dr. Lucia’s legacy, a light that’s built to last.
In the face of time’s great trial, her spirit stands so tall,
A beacon of nostalgia, that guides us through it all.

(Bridge)
In the twilight of her years, a stroke could not restrain,
The unwavering spirit, that coursed through every vein.
Surrounded by her loved ones, her final breaths she drew,
Leaving a legacy of hope, for dreamers to pursue.

(Chorus)
Oh, the moments we remember, the echoes of the past,
Dr. Lucia’s legacy, a light that’s built to last.
In the face of time’s great trial, her spirit stands so tall,
A beacon of nostalgia, that guides us through it all.

(Outro)
As we stand in admiration, of the path that she once paved,
We carry forth her memory, in the lives she touched and saved.
Dr. Lucia, your spirit shines, through the trials and the tears,
A timeless inspiration, transcending all the years.
`

function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleSelectorChange"
  > & {
    multiModal?: boolean;
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
    window.alert(mockMessage);
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

  const handleOnChange = async (options:  MultiValue<{value: string; label: string}>) => {
    const optionsValues = options.map(({ value }) => value);
    props.handleSelectorChange(optionsValues);
  }

  const disabled = false; // !(selectedOptions.length > 0)
  const allowedExtensions = ['pdf', 'txt', 'md'];
  const buttonLabel = '📝 Generate';
  
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white p-4 shadow-xl space-y-4"
    >
      {imageUrl && (
        <UploadImagePreview url={imageUrl} onRemove={onRemovePreviewImage} />
      )}
      <div className="flex w-full items-start justify-between gap-4 ">
        <ChatSelector onChange={handleOnChange} />
        <FileUploader
          config={{
            allowedExtensions,
            disabled,
            // TODO:
            // fileSizeLimit: 20MB
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
