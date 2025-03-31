import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components";

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm></RegisterForm>
          <p className="text-center mt-4">
            Already have an account?
            <Button type="button" asChild variant="link">
              <Link to="/login">Login</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Register;
