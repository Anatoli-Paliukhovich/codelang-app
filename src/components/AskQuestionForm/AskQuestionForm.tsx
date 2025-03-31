import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { customFetch, formSchemaAskQuestionForm } from "@/utils";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

export function AskQuestionForm() {
  const form = useForm<z.infer<typeof formSchemaAskQuestionForm>>({
    resolver: zodResolver(formSchemaAskQuestionForm),
    defaultValues: {
      title: "",
      description: "",
      attachedCode: "",
    },
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchemaAskQuestionForm>) {
    const { ...reqData } = values;
    setIsSubmitting(true);
    try {
      await customFetch.post("/questions", reqData);
      toast("Question created successfully!");
      form.reset();
      navigate("/questions");
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input type="text" placeholder="Question title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input
                  type="text"
                  placeholder="Question description"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachedCode"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="code">Attached code:</Label>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Textarea
                  className="h-48"
                  id="code"
                  placeholder="Attach your code ..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <SubmitBtn
          text="Save"
          className="w-full cursor-pointer"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}

export default AskQuestionForm;
