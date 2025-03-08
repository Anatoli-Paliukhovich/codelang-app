import { SnippetLoaderData } from "@/utils";
import { SnippetCard } from "@/components";
import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

const Snippet = () => {
  const { data } = useLoaderData() as SnippetLoaderData;
  const { id, language, code, user, comments, marks } = data;
  console.log(comments);

  return (
    <>
      <SnippetCard
        id={id}
        language={language}
        code={code}
        user={user}
        comments={comments}
        marks={marks}
      />
      {comments.map((comment) => {
        const { id: commentId, content, user: commentUser } = comment;

        return (
          <Card
            className="mb-4 p-4 bg-secondary flex gap-2"
            key={commentId}
          >
            <CardHeader className="p-0">
              <div className="text-primary">Comment from:</div>
              <div className="flex items-center">
                <UserIcon className="mr-2" />
                <span className="text-lg font-semibold">
                  {commentUser.username}
                </span>
              </div>
              <hr className="border-border" />
            </CardHeader>
            <CardContent className="p-0 min-h-27 flex">
              <p className="whitespace-pre-wrap break-all ml-2">{content}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default Snippet;
