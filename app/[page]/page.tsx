import Link from "next/link";
import Book from "../../components/book/book";
import { Button, buttonVariants } from "../../components/ui/button";
import { getBookEntries } from "../../lib/newEntry";
import { cn } from "../../lib/utils";

export default async function Home({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const { data: bookItems, count } = await getBookEntries(Number(page), 6);

  return (
    <>
      <main className="flex h-screen w-screen items-center justify-center gap-12">
        {Number(page) !== 1 && (
          <Link
            href={`${Number(page) - 1}`}
            className={cn("text-5xl transition-colors hover:text-pink-900")}
          >{`<`}</Link>
        )}

        <div className="flex flex-col items-center gap-12">
          <Book page={Number(page)} />

          <Link href={"/new"} className={buttonVariants()}>
            Pridėti įrašą
          </Link>
        </div>

        {Number(page) * 6 < (count ?? 0) && (
          <Link
            href={`${Number(page) + 1}`}
            className={cn("text-5xl transition-colors hover:text-pink-900")}
          >{`>`}</Link>
        )}
      </main>
    </>
  );
}
