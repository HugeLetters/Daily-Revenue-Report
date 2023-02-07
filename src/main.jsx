import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import Homepage from "./components/pages/Homepage";
import "./index.css";
import store from "./store";

const Test = React.lazy(() => import("./components/pages/Test"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":id",
        element: (
          <Suspense>
            <Test />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Homepage />,
      },
    ],
  },
]);

// TODO
// # - ErrorBoundary in case of errors
// # - lazy load components
// # - fallback for  transition or laxyloads

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
