import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import ErrorPage from "../components/ErrorPage";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Coverage from "../pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, Component : Home},
      {path : "/coverage", Component : Coverage}
    ]
  },
  {
    path : "/",
    Component : AuthLayouts,
    children : [
      {
        path : "/register",
        Component : Register
      },
      {
        path : "/login",
        Component : Login
      }
    ]
  }
]);