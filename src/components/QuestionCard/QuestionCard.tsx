import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { Target, Trash2, PencilLine } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type QuestionCardProps = {
  id: string;
  title: string;
  description?: string;
  username: string;
  attachedCode: string;
  questionUserId: number;
  onDelete: (id: string) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  description,
  attachedCode,
  username,
  questionUserId,
  onDelete,
}) => {
  const userId = useAppSelector((state) => state.userState.user?.id);
  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col gap-4 text-xl font-semibold text-muted-foreground">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Target className="text-chart-1" />
              <div className="flex flex-col gap-2">
                <div>
                  Title: <span className="text-lg font-light">{title}</span>
                </div>
                <div className="text-muted-foreground text-sm opacity-50">
                  asked by user: {username}
                </div>
              </div>
            </div>
            <div>
              <span className="text-lg font-light">{attachedCode}</span>
            </div>
          </div>
          {userId === questionUserId.toString() ? (
            <div className="flex flex-col gap-3">
              <Button
                className="bg-chart-1 cursor-pointer"
                onClick={() => onDelete(id)}
              >
                <Trash2 />
              </Button>
              <Button asChild className="bg-chart-2 cursor-pointer">
                <Link to={`/editQuestion/${id}`}>
                  <PencilLine />
                </Link>
              </Button>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
