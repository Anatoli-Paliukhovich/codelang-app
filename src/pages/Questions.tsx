import { useLoaderData } from "react-router-dom";
import { QuestionResponseWithParams } from "@/utils/types";
import { FiltersQuestions, Pagination } from "@/components";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import { useState } from "react";
import { toast } from "sonner";
import { customFetch } from "@/utils";

const Questions = () => {
  const {
    data: { data: questions },
  } = useLoaderData() as QuestionResponseWithParams;
  const [questionState, setQuestionState] = useState(questions);

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const response = await customFetch.delete(`/questions/${questionId}`);

      if (response.status === 200) {
        setQuestionState(
          questionState.filter((question) => question.id !== questionId)
        );
        toast.success("Question has been deleted!");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
      toast.error("Question hasn't been deleted!");
    }
  };

  return (
    <>
      <FiltersQuestions />
      <div className="text-5xl">
        <div>
          {questionState.map((question) => {
            const { id, title, description, attachedCode } = question;
            const questionUserId = question.user.id;
            const username = question.user.username;
            return (
              <QuestionCard
                key={id}
                id={id}
                title={title}
                description={description}
                attachedCode={attachedCode}
                username={username}
                questionUserId={questionUserId}
                onDelete={handleDeleteQuestion}
              />
            );
          })}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Questions;
