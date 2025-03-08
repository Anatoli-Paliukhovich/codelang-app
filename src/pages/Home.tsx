import { useLoaderData } from "react-router-dom";
import { type SnippetsResponse } from "@/utils";
import { Pagination } from "@/components";
import SnippetCard from "../components/SnippetCard/SnippetCard";

const Home = () => {
  const {
    data: { data: snippets },
  } = useLoaderData() as SnippetsResponse;

  return (
    <>
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
