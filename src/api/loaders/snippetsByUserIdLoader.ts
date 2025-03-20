import { customFetch } from "@/utils";
import { LoaderFunction } from "react-router-dom";
import { type SnippetsResponseWithParams } from "@/utils";
import { store } from "@/store";

const loader: LoaderFunction = async ({ request }) => {
  const userId = store.getState().userState.user?.id;
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const url = `/snippets?userId=${userId}`;
  const response = await customFetch<SnippetsResponseWithParams>(url, {
    params,
  });
  return { ...response.data, params };
};

export default loader;
