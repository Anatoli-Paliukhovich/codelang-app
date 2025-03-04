import {
  Register,
  Login,
  HomeLayout,
  Home,
  Account,
  Users,
  UserProfile,
} from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error } from "./pages";
import { ErrorElement } from "./components";
import { usersLoader, userLoader } from "./api";
//actions
import { action as registerUser } from "./pages/Register";
import { store } from "./store";
import { action as loginUser } from "./pages/Login";

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
      },
      {
        path: "me",
        element: <Account />,
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
    action: loginUser(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerUser,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
