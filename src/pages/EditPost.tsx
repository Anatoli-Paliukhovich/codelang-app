import { EditPostForm, Loading } from "@/components";
import { customFetch, Snippet } from "@/utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Snippet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await customFetch.get(`/snippets/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to fetch post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (formData: { language: string; code: string }) => {
    try {
      await customFetch.patch(`/snippets/${id}`, formData);
      toast.success("Post updated successfully!");
      navigate(`/mysnippets`);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post.");
    }
  };

  if (!post) {
    return <Loading />;
  }

  return (
    <div className="text-5xl">
      <h2 className="mb-6 text-primary">Edit Post</h2>
      <EditPostForm
        defaultValues={{
          language: post.language,
          code: post.code,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditPost;
