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
import { useCreateCatalogCard } from "@/requests/gen/react-query/catalog";
import { useGetSets } from "@/requests/gen/react-query/set";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/auth/firebase";

// 1. Define a schema
const formSchema = z.object({
  set_id: z.string().min(1).max(3),
  collector_number: z.string().min(2).max(5),
  is_variant: z.boolean(),
  //img_front_url: z.string().url(),
  // img_back_url: z.string().url(),
});

// 2. Define form component
const CreateCatalogForm = () => {
  const mutation = useCreateCatalogCard();
  const { data: sets } = useGetSets();
  const [frontImg, setFrontImg] = useState<File | null>(null);
  const [backImg, setBackImg] = useState<File | null>(null);
  // const [frontProgress, setFrontProgress] = useState(0);
  // const [frontDownloadURL, setFrontDownloadURL] = useState<String | null>(null);

  const handleFrontImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFrontImg(e.target.files[0]);
    }
  };

  const handleBackImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBackImg(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `card_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload error:", error);
          reject(null);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      set_id: "",
      collector_number: "",
      is_variant: false,
      // img_front_url: "",
      // img_back_url: "",
    },
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let uploadedFrontImageURL = null;
    let uploadedBackImageURL = null;

    if (frontImg) {
      uploadedFrontImageURL = await uploadImage(frontImg);
    }

    if (backImg) {
      uploadedBackImageURL = await uploadImage(backImg);
    }

    // Ensure the image URL is included before sending data
    const formData = {
      set_id: parseInt(values.set_id),
      collector_number: values.collector_number,
      is_variant: values.is_variant,
      img_front_url: uploadedFrontImageURL || "",
      img_back_url: uploadedBackImageURL || "",
    };

    console.log("Final form data:", formData);

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (response) => {
          console.log("Card added to catalog successfully!", response);
        },
        onError: (error) => {
          console.error("Error creating catalog entry:", error);
        },
      }
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Add a Card to the Catalog</h1>
      <br />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="set_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={sets ? sets[0]?.set_name : ""}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sets?.map((set) => (
                      <SelectItem
                        key={set.set_id}
                        value={set.set_id.toString()}
                      >
                        {set.set_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row ">
            <div className="w-[80%]">
              <FormField
                control={form.control}
                name="collector_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collector Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="01"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ""} // Ensure empty input doesn't cause NaN
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[20%] justify-items-center items-center">
              <br />
              <FormField
                control={form.control}
                name="is_variant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none justify-end">
                      <FormLabel>Variant</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <FormItem className="w-[50%] mr-4">
              <FormLabel>Card Image Front</FormLabel>
              <FormControl>
                <Input
                  className="cursor-pointer"
                  id="front_img"
                  type="file"
                  onChange={handleFrontImgChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem className="w-[50%]">
              <FormLabel>Card Image Back</FormLabel>
              <FormControl>
                <Input
                  className="cursor-pointer"
                  id="back_img"
                  type="file"
                  onChange={handleBackImgChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateCatalogForm;
