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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { customFetch } from "@/utils";
import { useAppDispatch } from "@/hooks";
import { updateUser } from "@/features/user/userSlice";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

function ChangedPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const dispatch = useAppDispatch();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await customFetch.patch("/me", values);
      toast("Username successfully changed!");
      dispatch(updateUser({ username: values.username }));
    } catch (err) {
      console.error("Error changing username:", err);
      toast("Something went wrong!");
      return null;
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
        <Button type="submit" className="w-full cursor-pointer">
          SAVE
        </Button>
      </form>
    </Form>
  );
}

export default ChangedPasswordForm;
