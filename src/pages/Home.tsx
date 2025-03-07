import { useLoaderData } from "react-router-dom";
import { type SnippetsResponse } from "@/utils";
import { Pagination } from "@/components";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  UserIcon,
  SquareDashedBottomCode,
  ThumbsUp,
  ThumbsDown,
  MessageSquareText,
} from "lucide-react";
import { getLineNumbers } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { likeSnippet, dislikeSnippet } from "../features/snippetSlice";

const apiUrl = import.meta.env.VITE_CODELANG_API_URL;
console.log("API URL from client:", apiUrl);

const Home = () => {
  const {
    data: { data: snippets },
  } = useLoaderData() as SnippetsResponse;
  const dispatch = useAppDispatch();
  const marks = useAppSelector((state) => state.likes.marks);

  return (
    <>
      {snippets.map((snippet) => {
        const {
          id,
          language,
          code,
          user,
          comments,
          marks: serverMarks,
        } = snippet;

        const likes =
          serverMarks.filter((mark) => mark.type === "like").length +
          marks.filter((mark) => mark.type === "like" && mark.snippetId === id)
            .length;

        const dislikes =
          serverMarks.filter((mark) => mark.type === "dislike").length +
          marks.filter(
            (mark) => mark.type === "dislike" && mark.snippetId === id
          ).length;

        const commentsCount = comments.length;
        const lineNumbers = getLineNumbers(code);

        return (
          <Card className="mb-4 p-4 flex gap-2" key={id}>
            <CardHeader className="p-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <UserIcon className="mr-2" />
                  <span className="text-lg font-semibold">{user.username}</span>
                </div>
                <div className="flex items-center">
                  <SquareDashedBottomCode className="mr-2" />
                  <span className="text-lg font-light">{language}</span>
                </div>
              </div>
              <hr className="border-border" />
            </CardHeader>
            <CardContent className="p-0 min-h-27 flex">
              <div className="flex flex-col items-center bg-accent pr-1 border-r border-muted-foreground">
                {lineNumbers.map((lineNumber) => (
                  <div
                    key={lineNumber}
                    className="text-muted-foreground text-center"
                  >
                    {lineNumber}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="whitespace-pre-wrap break-all ml-2">{code}</p>
              </div>
            </CardContent>
            <hr className="border-border" />
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center">
                <ThumbsUp
                  className="mr-1 cursor-pointer text-chart-5"
                  onClick={() => {
                    console.log(`Liking snippet with ID: ${id}`);
                    dispatch(likeSnippet(id));
                  }}
                />
                <span>{likes}</span>
                <ThumbsDown
                  className="ml-4 mr-1 cursor-pointer text-chart-1"
                  onClick={() => {
                    console.log(`Disliking snippet with ID: ${id}`);
                    dispatch(dislikeSnippet(id));
                  }}
                />
                <span>{dislikes}</span>
              </div>
              <Link
                to={`/posts/${id}`}
                className="ml-2 flex items-center gap-1"
              >
                <span>{commentsCount}</span>
                <MessageSquareText className="mr-1 text-chart-5" />
              </Link>
            </CardFooter>
          </Card>
        );
      })}
      <Pagination />
    </>
  );
};

export default Home;
