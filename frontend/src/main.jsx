import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import {
  AuthPage,
  ContactPage,
  LandingPage,
  DashboardPage,
  ProfilePage,
  SessionPage,
  Protected,
} from "./index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/landing" replace />,
      },
      {
        path: "landing",
        element: (
          <Protected authentication={false}>
            <LandingPage />
          </Protected>
        ),
      },
      {
        path: "/auth/:slug",
        element: (
          <Protected authentication={false}>
            <AuthPage />
          </Protected>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Protected authentication>
            <DashboardPage />
          </Protected>
        ),
      },
      {
        path: "/profile/:slug",
        element: (
          <Protected authentication>
            <ProfilePage />
          </Protected>
        ),
      },
      {
        path: "/contact",
        element: (
          <Protected authentication>
            <ContactPage />
          </Protected>
        ),
      },
      {
        path: "/session",
        element: (
          <Protected authentication>
            <SessionPage />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
