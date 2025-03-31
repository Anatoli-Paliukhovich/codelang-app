import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { customFetch, formSchemaChangedUserName } from "@/utils";
import { useAppDispatch } from "@/hooks";
import { updateUser } from "@/features/user/userSlice";
import { useState } from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

function ChangedPasswordForm() {
  const form = useForm<z.infer<typeof formSchemaChangedUserName>>({
    resolver: zodResolver(formSchemaChangedUserName),
    defaultValues: {
      username: "",
    },
  });

  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchemaChangedUserName>) {
    setIsSubmitting(true);
    try {
      await customFetch.patch("/me", values);
      toast("Username successfully changed!");
      dispatch(updateUser({ username: values.username }));
      form.reset();
    } catch (err) {
      console.error("Error changing username:", err);
      toast("Something went wrong!");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input type="text" placeholder="New username" {...field} />
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

export default ChangedPasswordForm;
