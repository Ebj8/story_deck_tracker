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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import { useCreateSet } from "@/requests/gen/react-query/set";

// 1. Define a schema
const formSchema = z.object({
  set_name: z.string().min(2).max(255),
  release_year: z.number().int().min(2024).max(2100),
});

// 2. Define form component
const CreateSetForm = () => {
  const mutation = useCreateSet();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      set_name: "",
      release_year: 2024,
    },
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate(
      { data: values },
      {
        onSuccess: (response) => {
          toast({
            title: "Set created successfully",
            description: response.set_name + " was created!",
          });
          form.reset();
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error creating set",
            description: error.message,
          });
        },
      }
    );
    console.log(values);
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Create a new set</h1>
      <br />
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
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || "")
                    } // Convert to number
                    value={field.value || ""} // Ensure empty input doesn't cause NaN
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateSetForm;
