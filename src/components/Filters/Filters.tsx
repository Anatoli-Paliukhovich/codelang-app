// Filters.tsx
import { Form, useLoaderData, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UsersResponseWithParams } from "@/utils";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";

const Filters = () => {
  const { data, params } = useLoaderData() as UsersResponseWithParams;
  const { search, sortBy, searchBy } = params;

  const SEARCH_BY_OPTIONS =
    data?.data?.length > 0
      ? Object.keys(data.data[0])
      : ["id", "username", "role"];
  console.log(SEARCH_BY_OPTIONS);

  const SORT_BY_OPTIONS = [
    "id:ASC",
    "id:DESC",
    "username:ASC",
    "username:DESC",
    "role:ASC",
    "role:DESC",
  ];
  return (
    <Form className="mb-4 border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
      <FormInput
        type="search"
        label="Search value"
        name="search"
        defaultValue={search}
      />
      <FormSelect
        label="Search by field"
        name="searchBy"
        options={SEARCH_BY_OPTIONS}
        defaultValue={searchBy || "username"}
      />
      <FormSelect
        label="Sort by"
        name="sortBy"
        options={SORT_BY_OPTIONS}
        defaultValue={sortBy}
      />

      <Button type="submit" size="sm" className="self-end mb-2 cursor-pointer">
        Search
      </Button>
      <Button
        type="button"
        asChild
        size="sm"
        variant="outline"
        className="self-end mb-2"
      >
        <Link to="/users">Reset</Link>
      </Button>
    </Form>
  );
};
export default Filters;
