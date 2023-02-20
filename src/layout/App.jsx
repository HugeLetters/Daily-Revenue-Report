import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../store/store";
import Navigation from "./Navigation";
import Header from "./Header";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Error from "../components/Error";
import Loading from "../components/Loading";
import FourZeroFour from "../pages/404";
import { indexRedirect } from "../utils/utils";

const DailyRevenueReport = lazy(() => import("../pages/DailyRevenueReport"));
const Day = lazy(() => import("../pages/Day"));
const DailyReportsInput = lazy(() => import("../pages/day/Reports"));
const Financial = lazy(() => import("../pages/Financial"));
const Profile = lazy(() => import("../pages/user/Profile"));
const HotelPanel = lazy(() => import("../pages/config/Hotel"));
const AdminPanel = lazy(() => import("../pages/config/Admin"));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "drr", element: <DailyRevenueReport />, errorElement: <Error /> },
      {
        path: "day",
        children: [
          { path: "rooms", element: <Day page="rooms" /> },
          { path: "foodservice", element: <Day page="foodservice" /> },
          { path: "postings", element: <Day page="postings" /> },
          { path: "reports", element: <DailyReportsInput /> },
          { index: true, loader: indexRedirect("rooms") },
        ],
        errorElement: <Error />,
      },
      {
        path: "financial",
        children: [
          { path: "rooms", element: <Financial page="rooms" /> },
          { path: "foodservice", element: <Financial page="foodservice" /> },
          { path: "rolling", element: <Financial page="rolling" /> },
          { index: true, loader: indexRedirect("rooms") },
        ],
        errorElement: <Error />,
      },
      {
        path: "config",
        children: [
          { path: "hotel", element: <HotelPanel /> },
          { path: "admin", element: <AdminPanel /> },
          { index: true, loader: indexRedirect("hotel") },
        ],
        errorElement: <Error />,
      },
      { path: "profile", element: <Profile />, errorElement: <Error /> },
      { path: "login", element: <Login />, errorElement: <Error /> },
      { path: "register", element: <Register />, errorElement: <Error /> },
      { index: true, loader: indexRedirect("drr") },
      { path: "*", element: <FourZeroFour />, errorElement: <Error /> },
    ],
  },
]);

const queryClient = new QueryClient();
