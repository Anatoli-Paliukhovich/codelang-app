import { CreatePostForm } from "@/components";

const CreatePost = () => {
  return (
    <>
      <h2 className="text-center font-bold text-2xl mt-10 py-7">
        Create new snippet!
      </h2>
      <CreatePostForm></CreatePostForm>
    </>
  );
};
export default CreatePost;
