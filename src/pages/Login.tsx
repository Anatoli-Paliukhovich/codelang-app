import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { LoginForm } from "@/components";

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
          <p className="text-center mt-4">
            Don't have an account yet?
            <Button type="button" asChild variant="link">
              <Link to="/register">Register</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
