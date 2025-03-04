import { useLoaderData } from "react-router-dom";
import { type UsersResponse } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Filters, Pagination } from "@/components";

const Users = () => {
  const {
    data: { data: users },
  } = useLoaderData() as UsersResponse;
  return (
    <>
      <Filters></Filters>
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
      <Pagination></Pagination>
    </>
  );
};
export default Users;
