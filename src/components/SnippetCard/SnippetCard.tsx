import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  UserIcon,
  SquareDashedBottomCode,
  ThumbsUp,
  ThumbsDown,
  MessageSquareText,
} from "lucide-react";
import { getLineNumbers } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { likeSnippet, dislikeSnippet } from "@/api";
import { Link } from "react-router-dom";
import { type Snippet } from "@/utils";
import { toast } from "sonner";

const SnippetCard: React.FC<Snippet> = ({
  id,
  language,
  code,
  user,
  comments,
  marks,
}) => {
  const dispatch = useAppDispatch();
  const marksState = useAppSelector((state) => state.likes.marks);
  const userLogin = useAppSelector((state) => state.userState.user);
  const likes =
    marks.filter((mark) => mark.type === "like").length +
    marksState.filter((mark) => mark.type === "like" && mark.snippetId === id)
      .length;

  const dislikes =
    marks.filter((mark) => mark.type === "dislike").length +
    marksState.filter(
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
            <div key={lineNumber} className="text-muted-foreground text-center">
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
        {userLogin ? (
          <div className="flex items-center">
            <ThumbsUp
              className="mr-1 cursor-pointer text-chart-5"
              onClick={() => {
                dispatch(likeSnippet(id));
              }}
            />
            <span>{likes}</span>
            <ThumbsDown
              className="ml-4 mr-1 cursor-pointer text-chart-1"
              onClick={() => {
                dispatch(dislikeSnippet(id));
              }}
            />
            <span>{dislikes}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <ThumbsUp
              className="mr-1 cursor-pointer text-chart-5"
              onClick={() => toast("Please login!")}
            />
            <span>{likes}</span>
            <ThumbsDown
              className="ml-4 mr-1 cursor-pointer text-chart-1"
              onClick={() => toast("Please login!")}
            />
            <span>{dislikes}</span>
          </div>
        )}
        {userLogin ? (
          <Link to={`/snippets/${id}`} className="ml-2 flex items-center gap-1">
            <span>{commentsCount}</span>
            <MessageSquareText className="mr-1 text-chart-5" />
          </Link>
        ) : (
          <div
            onClick={() => toast("Please login!")}
            className="ml-2 flex items-center gap-1 cursor-pointer"
          >
            <span>{commentsCount}</span>
            <MessageSquareText className="mr-1 text-chart-5" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SnippetCard;
