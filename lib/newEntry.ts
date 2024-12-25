"use server";

import { createClient } from "../utils/supabase/server";

export async function createBookEntry({
  description,
  date,
  imageUrl,
}: {
  description?: string;
  date: Date;
  imageUrl: string;
}) {
  const supabase = await createClient();

  try {
    // Insert the book entry into the database with the imageUrl
    const { data: entryData, error: entryError } = await supabase
      .from("book-entry")
      .insert([
        {
          imageUrl: imageUrl,
          description: description || null,
          date,
        },
      ]);

    if (entryError) {
      throw new Error(`Failed to create book entry: ${entryError.message}`);
    }

    return entryData;
  } catch (error) {
    console.error("Error creating book entry:", error);
    throw error;
  }
}

export async function getBookEntries(page: number, limit: number) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  try {
    // Fetch paginated entries from the 'book_entries' table
    const { data, error, count } = await supabase
      .from("book-entry")
      .select("*", { count: "exact" })
      .order("date", { ascending: false }) // Order by date, most recent first
      .range(offset, offset + limit - 1); // Paginate with offset and limit

    if (error) {
      throw new Error(`Failed to fetch book entries: ${error.message}`);
    }

    console.log(data);

    return { data, count };
  } catch (error) {
    console.error("Error fetching book entries:", error);
    throw error;
  }
}
