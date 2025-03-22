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
import { customFetch, formSchemaRegisterForm } from "@/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";


function RegisterForm() {
  const form = useForm<z.infer<typeof formSchemaRegisterForm>>({
    resolver: zodResolver(formSchemaRegisterForm),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchemaRegisterForm>) {
    const { confirmPassword, ...reqData } = values;
    setIsSubmitting(true);
    try {
      await customFetch.post("/register", reqData);
      toast("You are successfully registered!");
      form.reset();
      navigate("/login");
    } catch (err) {
      console.error("Error registering user:", err);
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-primary"
              >
                Confirm Password
              </label>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input id="confirmPassword" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitBtn
          text="Register"
          className="w-full cursor-pointer"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}

export default RegisterForm;
