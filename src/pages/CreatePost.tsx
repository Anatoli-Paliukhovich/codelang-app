import { FormSelect, FormInputText } from "@/components";
import { Form } from "react-router-dom";
import { Button } from "@/components/ui/button";
const CreatePost = () => {
  return (
    <>
      <h2 className="text-center font-bold text-2xl mt-36 py-7">
        Create new snippet!
      </h2>
      <Form className="flex flex-col gap-7">
        <FormSelect
          label="Language of your snippet"
          name="searchBy"
          options={[]}
          defaultValue={""}
        ></FormSelect>
        <FormInputText
          name=""
          label="Code of your snippet"
          defaultValue=""
        ></FormInputText>
        <Button type="submit" className="uppercase cursor-pointer">
          Create Snippet
        </Button>
      </Form>
    </>
  );
};
export default CreatePost;
