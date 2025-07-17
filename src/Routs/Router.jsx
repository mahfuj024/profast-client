import { createBrowserRouter } from "react-router";
import Rootlayoutes from "../Layouts/Rootlayoutes";
import Error from "../Pages/Shared/Error/Error";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Rootlayoutes></Rootlayoutes>,
        errorElement: <Error></Error>,
        children: [
            { index: true, Component: Home }
        ]
    },
]);