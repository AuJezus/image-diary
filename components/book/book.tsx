import { getBookEntries } from "../../lib/newEntry";
import BookItem from "./book-item";

export default async function Book({ page }: { page: number }) {
  const { data: bookItems } = await getBookEntries(page, 6);

  return (
    <div className="flex aspect-[3/2] w-[60vw] justify-center divide-x-2 divide-zinc-500 bg-red-500 p-6">
      <div className="grid h-full w-full grid-cols-1 grid-rows-3 gap-3 bg-pink-100 p-3 shadow-[inset_-10px_0_30px_10px] shadow-neutral-300">
        {bookItems.slice(0, 3).map((item, i) => (
          <BookItem key={item.id} {...item} reverse={(i + 1) % 2 == 0} />
        ))}
      </div>
      <div className="grid h-full w-full grid-cols-1 grid-rows-3 gap-3 bg-pink-100 p-3 shadow-[inset_10px_0_30px_10px] shadow-neutral-300">
        {bookItems.slice(3, 6).map((item, i) => (
          <BookItem key={item.id} {...item} reverse={(i + 1) % 2 == 0} />
        ))}
      </div>
    </div>
  );
}
