import { Form, Link, redirect, type ActionFunction } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitBtn, FormInput } from "@/components";
import { customFetch } from "@/utils";
import { toast } from "sonner";
import { type ReduxStore } from "@/store";
import { loginUser } from "@/features/user/userSlice";
import { AxiosResponse, AxiosError } from "axios";

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response: AxiosResponse = await customFetch.post(
        "/auth/login",
        data
      );
      const username = response.data.data.username;
      const id = response.data.data.id;
		const role = response.data.data.role
      store.dispatch(loginUser({ username, id, role }));
      return redirect("/");
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

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FormInput type="text" name="username" />
            <FormInput type="password" name="password" />
            <SubmitBtn text="Login" className="w-full mt-4" />
            <p className="text-center mt-4">
              Don't have an account yet?
              <Button type="button" asChild variant="link">
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
