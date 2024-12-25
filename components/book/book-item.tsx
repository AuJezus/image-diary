import Image from "next/image";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { lt } from "date-fns/locale";

type Props = {
  imageUrl: string;
  description: string;
  date: string;
  reverse?: boolean;
};

export default function BookItem({
  imageUrl,
  description,
  date,
  reverse = false,
}: Props) {
  const formattedDate = format(new Date(date), "d MMMM, yyyy", { locale: lt });

  return (
    <div
      className={cn("flex h-full w-full items-center", {
        "flex-row-reverse": reverse,
      })}
    >
      <div className="mx-8 h-auto w-fit max-w-[50%] border-2 border-neutral-500 bg-pink-200 p-2 pb-6">
        <Image
          alt="photo"
          src={imageUrl}
          className="h-auto max-h-[100%] w-full object-cover"
          width={500}
          height={500}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p>"{description}"</p>

        <p className="text">{formattedDate}</p>
      </div>
    </div>
  );
}
