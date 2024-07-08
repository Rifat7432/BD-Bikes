import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routes.genaerator";
import SignUp from "../pages/userManegment/SignUp";
import Login from "../pages/userManegment/Login";
import Private from "./Private";
import { buyerPaths, sellerPaths } from "./app.routes";

//all  routs
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Private>
        <App />
      </Private>
    ),
  },
  {
    path: "/seller",
    element: (
      <Private>
        <App />
      </Private>
    ),
    children: routeGenerator(sellerPaths),
  },
  {
    path: "/buyer",
    element: (
      <Private>
        <App />
      </Private>
    ),
    children: routeGenerator(buyerPaths),
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
