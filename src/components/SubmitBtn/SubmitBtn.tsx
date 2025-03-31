import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

const SubmitBtn = ({
  text,
  className,
  isSubmitting,
}: {
  text: string;
  className?: string;
  isSubmitting: boolean;
}) => {
  return (
    <Button type="submit" className={className} disabled={isSubmitting}>
      {isSubmitting ? (
        <span className="flex items-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          <span>Submitting...</span>
        </span>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitBtn;
