import { customFetch } from "@/utils";
import { LoaderFunction } from "react-router-dom";
import { type QuestionResponseWithParams } from "@/utils";

const url = "/questions";
const loader: LoaderFunction = async ({
  request,
}): Promise<QuestionResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch<QuestionResponseWithParams>(url, {
    params,
  });
  return { ...response.data, params };
};
export default loader;
