import { customFetch } from "@/utils";
import { LoaderFunction } from "react-router-dom";
import { type UsersResponseWithParams } from "@/utils";

const url = "/users";
const loader: LoaderFunction = async ({
  request,
}): Promise<UsersResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch<UsersResponseWithParams>(url, { params });
  return { ...response.data, params };
};
export default loader;
