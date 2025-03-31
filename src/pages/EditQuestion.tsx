import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { customFetch } from "@/utils";
import { toast } from "sonner";
import { EditQuestionForm, Loading } from "@/components";

type Question = {
  title: string;
  description: string;
  attachedCode: string;
};

const EditQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await customFetch.get(`/questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
        toast.error("Failed to fetch question.");
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmit = async (formData: Question) => {
    try {
      await customFetch.patch(`/questions/${id}`, formData);
      toast.success("Question updated successfully!");
      navigate(`/questions`);
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question.");
    }
  };

  if (!question) {
    return <Loading />;
  }

  return (
    <div className="text-5xl">
      <h2 className="mb-6 text-primary">Edit Question</h2>
      <EditQuestionForm
        defaultValues={{
          title: question.title,
          description: question.description,
          attachedCode: question.attachedCode,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditQuestion;
