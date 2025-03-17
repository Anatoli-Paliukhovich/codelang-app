import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import { useSearchParams, useLoaderData, Link } from "react-router-dom";
import { customFetch, SnippetsResponseWithParams } from "@/utils";
import { FiltersSnippet, Pagination, SnippetCard } from "@/components";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const MyPosts = () => {
  const userId = useAppSelector((state) => state.userState.user?.id);
  const userLogin = useAppSelector((state) => state.userState.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: snippets } = useLoaderData() as SnippetsResponseWithParams;
  const [mySnippetState, setMySnippetState] = useState(snippets);
  useEffect(() => {
    if (userId && searchParams.get("userId") !== userId.toString()) {
      setSearchParams({ userId });
    }
  }, [userId, setSearchParams, searchParams]);

  const handleDeleteSnippet = async (snippetId: string) => {
    try {
      const response = await customFetch.delete(`/snippets/${snippetId}`);

      if (response.status === 200) {
        const updatedSnippets = {
          ...mySnippetState,
          data: mySnippetState.data.filter(
            (snippet) => snippet.id !== snippetId
          ),
        };
        setMySnippetState(updatedSnippets);
        toast.success("Post has been deleted!");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Post hasn't been deleted!");
    }
  };

  return (
    <>
      <FiltersSnippet />
      {mySnippetState.data.length === 0 ? (
        <div className="">
          <div className="text-center text-lg text-muted-foreground">
            There are no snippets!
          </div>
          <Button asChild>
            <Link to="/post">Post Snippet</Link>
          </Button>
        </div>
      ) : (
        userLogin &&
        mySnippetState.data.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            id={snippet.id}
            language={snippet.language}
            code={snippet.code}
            user={snippet.user}
            comments={snippet.comments}
            marks={snippet.marks}
            onDelete={handleDeleteSnippet}
          />
        ))
      )}
      {userLogin && <Pagination />}
    </>
  );
};

export default MyPosts;
