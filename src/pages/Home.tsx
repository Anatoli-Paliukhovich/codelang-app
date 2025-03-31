import { useLoaderData } from "react-router-dom";
import { type SnippetsResponse } from "@/utils";
import { Pagination } from "@/components";
import SnippetCard from "../components/SnippetCard/SnippetCard";
import { FiltersSnippet } from "@/components";

const Home = () => {
  const {
    data: { data: snippets },
  } = useLoaderData() as SnippetsResponse;

  return (
    <>
      <h1 className="text-center text-5xl font-bold py-1">
        Welcome to Codelang!
      </h1>
      <div className="text-5xl font-bold text-center mb-10">{"</>"}</div>
      <FiltersSnippet></FiltersSnippet>
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          id={snippet.id}
          language={snippet.language}
          code={snippet.code}
          user={snippet.user}
          comments={snippet.comments}
          marks={snippet.marks}
        />
      ))}
      <Pagination />
    </>
  );
};

export default Home;
