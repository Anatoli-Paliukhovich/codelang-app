import { ReloadIcon } from "@radix-ui/react-icons";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ReloadIcon className="animate-spin text-primary rounded-full h-16 w-16 border-10 border-dotted border-gray-200 border-t-blue-500"></ReloadIcon>
    </div>
  );
};

export default Loading;
