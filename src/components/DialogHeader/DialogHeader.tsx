import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AskQuestionForm } from "../index";

const DialogHeader = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer bg:--accent text-primary mr-2"
        >
          Ask Question
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ask a question</DialogTitle>
        <AskQuestionForm />
      </DialogContent>
    </Dialog>
  );
};

export default DialogHeader;
