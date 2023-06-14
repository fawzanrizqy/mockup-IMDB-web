import { createBrowserRouter, redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LayoutPage } from "../pages/LayoutPage";
import { MoviesPage } from "../pages/MoviesPage";
import { DetailPage } from "../pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <MoviesPage />,
      },
      {
        path: "details/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
