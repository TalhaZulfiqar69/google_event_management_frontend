import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Events from "../components/Events";
import AuthSuccess from "../components/AuthSuccess";

interface Route {
  name: string;
  path: string;
  component: React.ComponentType<any>;
}

const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
  },
  {
    name: "Events",
    path: "/events",
    component: Events,
  },
  {
    name: "AuthSuccess",
    path: "/auth/success",
    component: AuthSuccess,
  },
];

export default routes;
