import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";
import React, { Suspense } from "react";
import Error from "../components/Error";
import { Provider } from "react-redux";
import store from "../store/store";
import Loading from "../components/Loading";

const veryLazyLoad = async (page, delay) => {
  await new Promise(r => setTimeout(() => r(), delay));
  return import(`../pages/${page}.jsx`);
};
const Test = React.lazy(() => veryLazyLoad("Test", 3000));
const Home = React.lazy(() => veryLazyLoad("Home", 1000));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: ":id",
        element: <Test />,
        errorElement: <Error />,
      },
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

function Layout() {
  return (
    <div id="app">
      <Header />
      <Navigation />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
