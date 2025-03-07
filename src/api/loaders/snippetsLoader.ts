import { customFetch } from "@/utils";
import { LoaderFunction } from "react-router-dom";
import { type SnippetsResponseWithParams } from "@/utils";

const url = "/snippets";
const loader: LoaderFunction = async ({
  request,
}): Promise<SnippetsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch<SnippetsResponseWithParams>(url, {
    params,
  });
  console.log(response.data);
  return { ...response.data, params };
};
export default loader;
