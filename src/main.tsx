import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { DetailsPage } from "./pages/DetailsPage.tsx";
import { store } from "./store/store.ts";
const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "details/:name",
    element: <DetailsPage />,
    errorElement: <>There are no such pokemon</>,
  },
]);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
