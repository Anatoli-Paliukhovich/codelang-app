import {
  Home,
  User,
  SquareDashedBottomCode,
  SquareDashedBottom,
  FileQuestion,
  Users,
} from "lucide-react";
import { ComponentType } from "react";

type Links = {
  title: string;
  url: string;
  icon: ComponentType;
};
export const links: Links[] = [
  { title: "Home", url: "/", icon: Home },
  { title: "My Account", url: "/users/:id", icon: User },
  { title: "Post Snippet", url: "#", icon: SquareDashedBottom },
  { title: "MySnippets", url: "#", icon: SquareDashedBottomCode },
  { title: "Questions", url: "#", icon: FileQuestion },
  { title: "Users", url: "/users", icon: Users },
];
