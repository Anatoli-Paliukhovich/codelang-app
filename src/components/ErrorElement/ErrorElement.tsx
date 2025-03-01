import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <h1 className=" text-center text-red-500 text-3xl sm:text-5xl tracking-wide font-bold">
      There is an error...
    </h1>
  );
};
export default ErrorElement;
