"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { format } from "date-fns";
import { createBookEntry } from "../../lib/newEntry";
import { createClient } from "../../utils/supabase/client";

export default function CreateAlbumEntryPage() {
  const supabase = createClient();

  const formSchema = z.object({
    date: z.date(),
    description: z
      .string()
      .min(5, "Aprašymas per trumpas.")
      .max(200, "Aprašymas per ilgas."),
    image: z.instanceof(File).refine((file) => file.size < 7000000, {
      message: "Your resume must be less than 7MB.",
    }),
  });

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(2025),
      description: "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images") // Replace with your bucket name
      .upload(`public/${Date.now()}-${values.image.name}`, values.image);

    if (uploadError) {
      console.error("Failed to upload image:", uploadError);
      return;
    }

    // Get the public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);

    createBookEntry({
      date: values.date,
      imageUrl: publicUrlData.publicUrl,
      description: values.description,
    });
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-pink-100 p-6"
        >
          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Data</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>Įveskite albumo įrašo datą.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trumpas aprašymas</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Įveskite trumpą aprašymą..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Aprašykite albumą trumpai.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paveikslėlio nuoroda</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    value={undefined}
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files && event.target.files[0],
                      )
                    }
                  />
                </FormControl>
                <FormDescription>Įveskite paveikslėlio URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Pateikti
          </Button>
        </form>
      </Form>
    </div>
  );
}
