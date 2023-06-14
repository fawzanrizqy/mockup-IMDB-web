import { createBrowserRouter, redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import { MoviesPage } from "../pages/MoviesPage";
import { GenrePage } from "../pages/GenrePage";
import { UserPage } from "../pages/UserPage";
import { FormMovies } from "../components/FormMovies";
import { FormGenre } from "../components/FormGenre";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "",
        element: <MoviesPage />,
        children: [
          {
            path: "add",
            element: <FormMovies />,
          },
          {
            path: "movies/:id",
            element: <FormMovies />,
          },
        ],
      },
      {
        path: "genres",
        element: <GenrePage />,
        children: [
          {
            path: "add",
            element: <FormGenre />,
          },
          {
            path: "edit/:id",
            element: <FormGenre />,
          },
        ],
      },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      } else {
        return null;
      }
    },
  },
]);

export default router;
