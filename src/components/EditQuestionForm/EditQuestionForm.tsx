import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 character." }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character." }),
  attachedCode: z
    .string()
    .min(1, { message: "Code must be at least 1 character." }),
});

interface EditQuestionFormProps {
  defaultValues: {
    title: string;
    description?: string;
    attachedCode: string;
  };
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}

export function EditQuestionForm({
  defaultValues,
  onSubmit,
}: EditQuestionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input type="text" placeholder="Question title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Input
                  type="text"
                  placeholder="Question description"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachedCode"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="code">Attached code:</Label>
              <FormMessage className="text-red-500" />
              <FormControl>
                <Textarea
                  className="h-48"
                  id="code"
                  placeholder="Attach your code ..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">
          Save
        </Button>
      </form>
    </Form>
  );
}

export default EditQuestionForm;
