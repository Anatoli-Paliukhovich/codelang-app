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
import { loader as usersLoader } from "./pages/Users";
import { loader as userLoader } from "./pages/UserProfile";
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
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
