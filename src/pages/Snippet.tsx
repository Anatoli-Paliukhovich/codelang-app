import { type SnippetLoaderData } from "@/utils";
import { SnippetCard } from "@/components";
import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  updateComment,
  deleteComment,
  addComment,
} from "@/features/snippetsSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Snippet = () => {
  const { data } = useLoaderData() as SnippetLoaderData;
  const { id, language, code, user, comments, marks } = data;
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState.user);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [newComment, setNewComment] = useState<string>(""); // Состояние для нового комментария

  const handleEditComment = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditContent(content);
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
  };

  const handleUpdateComment = async (commentId: number) => {
    await dispatch(updateComment({ id: commentId, content: editContent }));
    setEditCommentId(null);
    setEditContent("");
  };

  const handleAddComment = async () => {
    await dispatch(addComment({ content: newComment, snippetId: Number(id) }));
    console.log("Adding comment:", newComment);
    setNewComment("");
  };

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

      {/* Форма для добавления нового комментария */}
      <div className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          className="border p-2 w-full"
        />
        <Button onClick={handleAddComment}>Submit</Button>
      </div>

      {comments.map((comment) => {
        const { id: commentId, content, user: commentUser } = comment;

        return (
          <Card className="mb-4 p-4 bg-secondary flex gap-2" key={commentId}>
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
            <CardContent className="p-0 min-h-27 flex break-all">
              {userState && userState.id === commentUser.id.toString() ? (
                <>
                  <input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <Button
                    onClick={() => handleUpdateComment(Number(commentId))}
                  >
                    Update
                  </Button>
                  <Button onClick={() => setEditCommentId(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <p className="text-lg">{content}</p>
                  {userState && userState.id === commentUser.id.toString() && (
                    <>
                      <Button
                        onClick={() =>
                          handleEditComment(Number(commentId), content)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteComment(Number(commentId))}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default Snippet;
