import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "../ui/select"; // Убедитесь, что путь правильный
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { customFetch, formSchemaCreatePostForm } from "@/utils";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

type Languages = string[];

export function CreatePostForm() {
  const [languages, setLanguages] = useState<Languages>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const languageResponse = await customFetch.get(`/snippets/languages`);
        setLanguages(languageResponse.data.data);
      } catch (err) {
        console.error("Error fetching languages:", err);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchemaCreatePostForm>>({
    resolver: zodResolver(formSchemaCreatePostForm),
    defaultValues: {
      language: languages[0] || "",
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaCreatePostForm>) {
    const { ...reqData } = values;
    setIsSubmitting(true);
    try {
      await customFetch.post("/snippets", reqData);
      toast("Snippet created successfully!");
      form.reset();
    } catch (err) {
      console.error("Error creating snippet:", err);
      toast("Something went wrong!");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="language">Language of your snippet:</Label>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="code">Code of your snippet:</Label>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Textarea
                  className="h-48"
                  id="code"
                  placeholder="Write your snippet ..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <SubmitBtn
          text="Create Snippet"
          className="w-full cursor-pointer"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}

export default CreatePostForm;
