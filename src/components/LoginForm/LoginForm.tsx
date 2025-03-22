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
import { customFetch } from "@/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "@/hooks";
import { loginUser } from "@/features/user/userSlice";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import { useState } from "react";

const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters." })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[\W_]/, { message: "Password must contain at least one symbol." });

const formSchemaLoginForm = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." }),
  password: passwordValidation,
});

function LoginForm() {
  const form = useForm<z.infer<typeof formSchemaLoginForm>>({
    resolver: zodResolver(formSchemaLoginForm),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchemaLoginForm>) {
    const { ...reqData } = values;
    setIsSubmitting(true);
    try {
      const response = await customFetch.post("/auth/login", reqData);
      const { username, id, role } = response.data.data;
      dispatch(loginUser({ username, id, role }));
      form.reset();
      navigate("/");
    } catch (err) {
      console.error("Error logging user:", err);
      if (axios.isAxiosError(err)) {
        console.error("Server response:", err.response?.data);
      } else {
        console.error("Unexpected error:", err);
      }
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
              <label
                htmlFor="username"
                className="block text-sm font-medium text-primary"
              >
                Username
              </label>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input id="username" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary"
              >
                Password
              </label>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input id="password" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitBtn
          text="Login"
          className="w-full cursor-pointer"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}

export default LoginForm;
