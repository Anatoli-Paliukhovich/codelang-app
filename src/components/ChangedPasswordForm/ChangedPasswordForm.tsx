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
import { customFetch, formSchemaChangedPasswordForm } from "@/utils";
import { useState } from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

function ChangedPasswordForm() {
  const form = useForm<z.infer<typeof formSchemaChangedPasswordForm>>({
    resolver: zodResolver(formSchemaChangedPasswordForm),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(
    values: z.infer<typeof formSchemaChangedPasswordForm>
  ) {
    const { confirmPassword, ...reqData } = values;
    setIsSubmitting(true);
    try {
      await customFetch.patch("/me/password", reqData);
      toast("Password successfully changed!");
      form.reset();
    } catch (err) {
      console.error("Error changing password:", err);
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
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input type="password" placeholder="Old password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input type="password" placeholder="New password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitBtn
          text="Change Password"
          className="w-full cursor-pointer"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}

export default ChangedPasswordForm;
