import { Label } from "@/components/ui/label";

type FormTextareaProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  rows?: number;
};

const FormTextarea = ({
  label,
  name,
  defaultValue,
  rows = 5,
}: FormTextareaProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize text-primary pb-2">
        {label || name}
      </Label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="border border-muted-foreground rounded-lg p-2 w-full"
      />
    </div>
  );
};

export default FormTextarea;
