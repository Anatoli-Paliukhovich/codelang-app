import { customFetch, type SnippetLoaderData } from "@/utils";
import { SnippetCard } from "@/components";
import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleMore, PencilLine, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Snippet = () => {
  const { data } = useLoaderData() as SnippetLoaderData;
  const { id, language, code, user, comments: initialComments, marks } = data;
  const userState = useAppSelector((state) => state.userState.user);
  const [comments, setComments] = useState(initialComments);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentAdd = async () => {
    if (newComment.trim() === "") {
      toast.error("Comment content cannot be empty!");
      return;
    }
    try {
      const response = await customFetch.post("/comments", {
        content: newComment,
        snippetId: id,
      });

      if (response.status === 201) {
        const addedComment = response.data.data;
        setComments([...comments, addedComment]);
        toast.success("Comment has been added!");
        setNewComment("");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Comment hasn't been added!");
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (editContent.trim() === "") {
      toast.error("Comment content cannot be empty!");
      return;
    }
    try {
      const response = await customFetch.patch(`/comments/${commentId}`, {
        content: editContent,
      });

      if (response.status === 200) {
        setComments(
          comments.map((comment) =>
            Number(comment.id) === commentId
              ? { ...comment, content: editContent }
              : comment
          )
        );
        toast.success("Comment has been updated!");
        setEditCommentId(null);
        setEditContent("");
      }
    } catch (err) {
      console.error("Error updating comment:", err);
      toast.error("Comment hasn't been updated!");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await customFetch.delete(`/comments/${commentId}`);

      if (response.status === 200) {
        setComments(
          comments.filter((comment) => Number(comment.id) !== commentId)
        );
        toast.success("Comment has been deleted!");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Comment hasn't been deleted!");
    }
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

      <div className="mb-4 flex gap-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          className="border p-2 w-full h-35"
        />
        <Button
          onClick={handleCommentAdd}
          className="bg-chart-2 cursor-pointer"
        >
          <MessageCircleMore />
        </Button>
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
              {editCommentId === commentId ? (
                <div className="flex w-full">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="border p-2 w-full"
                  />
                  <div className="flex flex-col ml-2">
                    <Button
                      onClick={() => handleUpdateComment(Number(commentId))}
                      className="mb-2 bg-chart-2 cursor-pointer"
                    >
                      Save
                    </Button>
                    <Button
                      className="bg-chart-1 cursor-pointer"
                      onClick={() => setEditCommentId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-lg flex-grow">{content}</p>
                  {userState && userState.id === commentUser.id.toString() && (
                    <div className="flex gap-2 ml-2">
                      <Button
                        className="bg-chart-2 cursor-pointer"
                        onClick={() => {
                          setEditCommentId(commentId);
                          setEditContent(content);
                        }}
                      >
                        <PencilLine />
                      </Button>
                      <Button
                        className="bg-chart-1 cursor-pointer"
                        onClick={() => handleDeleteComment(Number(commentId))}
                      >
                        <Trash2 />
                      </Button>
                    </div>
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
