import {
  Register,
  Login,
  HomeLayout,
  Home,
  Snippet,
  Account,
  Users,
  UserProfile,
  CreatePost,
  Questions,
  MyPosts,
  EditQuestion,
  EditPost,
} from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error } from "./pages";
import { ErrorElement } from "./components";
import {
  usersLoader,
  userLoader,
  snippetsLoader,
  snippetLoader,
  snippetsByUserIdLoader,
  questionsLoader,
} from "./api";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <ErrorElement />,
          loader: snippetsLoader,
        },
        {
          path: "snippets/:id",
          element: <Snippet />,
          errorElement: <ErrorElement />,
          loader: snippetLoader,
        },
        {
          path: "me",
          element: <Account />,
          errorElement: <ErrorElement />,
        },
        {
          path: "post",
          element: <CreatePost />,
          errorElement: <ErrorElement />,
        },
        {
          path: `mysnippets`,
          element: <MyPosts />,
          errorElement: <ErrorElement />,
          loader: snippetsByUserIdLoader,
        },
        {
          path: `mysnippets/:id`,
          element: <EditPost />,
          errorElement: <ErrorElement />,
        },
        {
          path: "questions",
          element: <Questions />,
          errorElement: <ErrorElement />,
          loader: questionsLoader,
        },
        {
          path: "editQuestion/:id",
          element: <EditQuestion />,
          errorElement: <ErrorElement />,
        },
        {
          path: "users",
          element: <Users />,
          errorElement: <ErrorElement />,
          loader: usersLoader,
        },
        {
          path: "users/:id",
          element: <UserProfile />,
          errorElement: <ErrorElement />,
          loader: userLoader,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default App;
