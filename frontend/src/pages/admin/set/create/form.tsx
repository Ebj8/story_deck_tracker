import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Everything up to hear are standard imports for forms
import { useCreateSet } from "@/requests/gen/react-query/set";

// 1. Define a schema
const formSchema = z.object({
  set_name: z.string().min(2).max(255),
  release_year: z.number().int().min(2024).max(2100),
});

const CreateSetForm = () => {
  const mutation = useCreateSet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      set_name: "",
      release_year: 2024,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate(
      { data: values },
      {
        onSuccess: (response) => {
          console.log("Set created successfully!", response);
        },
        onError: (error) => {
          console.error("Error creating set:", error);
        },
      }
    );
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="set_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set Name</FormLabel>
              <FormControl>
                <Input placeholder="Chasmfriends" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Year</FormLabel>
              <FormControl>
                <Input
                  placeholder="2024"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value) || "")} // Convert to number
                  value={field.value || ""} // Ensure empty input doesn't cause NaN
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSetForm;
