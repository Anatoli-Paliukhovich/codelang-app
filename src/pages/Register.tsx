import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";
import { customFetch } from "@/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({
  request,
}): Promise<null | Response> => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return null;
  }

  try {
    await customFetch.post("/register", {
      username,
      password,
    });
    toast.success("Successfully registered!");
    return redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.msg || "An error occurred";
      toast.error(message);
    } else {
      toast.error("An unexpected error occurred");
    }
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FormInput type="text" name="username" />
            <FormInput type="password" name="password" />
            <FormInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />
            <SubmitBtn text="Register" className="w-full mt-4" />
            <p className="text-center mt-4">
              Already have an account?
              <Button type="button" asChild variant="link">
                <Link to="/login">Login</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Register;
