import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Error = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="min-h-[100vh] flex flex-col gap-4 items-center justify-center">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="text-3xl sm:text-5xl tracking-wide font-bold">
            Page is not found
          </h1>
          <p className="pt-2 text-2xl font-medium">
            Sorry, we could not find the page.
          </p>
        </div>
        <Button asChild className="mt-8" variant="outline" size="lg">
          <Link to="/">Back to Home page</Link>
        </Button>
      </main>
    );
  }
  return (
    <main className="min-h-[100vh] flex flex-col gap-4 items-center justify-center">
      <h3 className="text-center text-primary font-bold text-4xl">
        There is an error...
      </h3>
    </main>
  );
};
export default Error;
