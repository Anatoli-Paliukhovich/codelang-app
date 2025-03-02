import { type LoaderFunction, type LoaderFunctionArgs } from "react-router-dom";
import {
	customFetch,
	type UserResponse,
	type UserStatisticResponse,
	type UserProfileLoaderData,
 } from "@/utils";

 
const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs): Promise<UserProfileLoaderData> => {
  const userId = params.id;

  const [userResponse, statisticResponse] = await Promise.all([
    customFetch<UserResponse>(`/users/${userId}`),
    customFetch<UserStatisticResponse>(`/users/${userId}/statistic`),
  ]);

  return {
    user: userResponse.data.data,
    statistic: statisticResponse.data.data.statistic,
  };
};
export default loader;
