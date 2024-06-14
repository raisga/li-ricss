import { Loader2, CheckCircle } from "lucide-react";
import { IEventData } from "@/app/lib/interfaces";

export type Props = {
  data?: IEventData[];
}

function Status({ data }: Props) {
  const iconSize = 18;
  const statusToIcon = {
    loading: <Loader2 className="" size={iconSize} />,
    done: <CheckCircle className="text-green-600" size={iconSize} />,
  };
  if (!data) return;
  return (
    <div className="flex flex-col gap-5 items-start mt-2">
      {data.map((eventData, idx) => (
        <div key={idx} className="flex gap-1 text-sm text-gray-600">
          <span className="mx-1">{statusToIcon[eventData.status as never]}</span>
          {eventData.message}
        </div>
      ))}
    </div>
  );
};

export default Status;
