// Filters.tsx
import { Form, useLoaderData, Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { SnippetsResponseWithParams } from "@/utils";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";

const FiltersSnippet = () => {
  const { data, params } = useLoaderData() as SnippetsResponseWithParams;
  const { search, sortBy, searchBy } = params;
  const location = useLocation();
  const SEARCH_BY_OPTIONS = ["language", "code"];

  const SORT_BY_OPTIONS = [
    "code:ASC",
    "code:DESC",
    "language:ASC",
    "language:DESC",
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
        defaultValue={searchBy || "language"}
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
        <Link to={location.pathname === "/mysnippets" ? "/mysnippets" : "/"}>
          Reset
        </Link>
      </Button>
    </Form>
  );
};
export default FiltersSnippet;
