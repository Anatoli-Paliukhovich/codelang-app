import { useLoaderData, type LoaderFunction } from "react-router-dom";
import { customFetch, type UsersResponse } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const url = "/users";
export const loader: LoaderFunction = async (): Promise<UsersResponse> => {
  const response = await customFetch<UsersResponse>(url);
  return { ...response.data };
};

const Users = () => {
  const {
    data: { data: users },
  } = useLoaderData() as UsersResponse;
  return (
    <div className="text-5xl">
      <div>
        {users.map((user) => {
          const { username, id, role } = user;
          return (
            <Link to={`/users/${id}`} key={id}>
              <Card className="mb-4">
                <CardContent className="flex justify-between p-3 text-xl font-semibold text-primary">
                  <div>
                    User name:{" "}
                    <span className="text-lg font-light">{username}</span>
                  </div>
                  <div>
                    Role: <span className="text-lg font-light">{role}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Users;
