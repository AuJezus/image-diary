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

          <div className="flex flex-col gap-2">
            <Link href={"/new"} className={buttonVariants()}>
              Pridėti įrašą
            </Link>
            <Link
              className="text-center"
              target="_blank"
              href={
                "https://drive.google.com/file/d/1q7d7_kvjj0xD964LqNkxWoSYlxoQy1Ku/view?usp=drive_link"
              }
            >
              Kas čia?
            </Link>
          </div>
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
