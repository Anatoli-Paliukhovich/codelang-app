import { type LoaderFunction, type LoaderFunctionArgs } from "react-router-dom";
import { customFetch, type SnippetLoaderData } from "@/utils";

const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs): Promise<SnippetLoaderData> => {
  const snippetId = params.id;
  const response = await customFetch<SnippetLoaderData>(
    `/snippets/${snippetId}`
  );
  return { ...response.data };
};

export default loader;
