import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import { features } from "./constants/features";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      ...(features.services ? [{ path: "services", Component: Services }] : []),
      { path: "contact", Component: Contact },
    ],
  },
];

export const router = createBrowserRouter(routes);
