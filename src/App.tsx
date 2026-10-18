import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import PostDetalis from "./Pages/PostDetails/PostDetalis";
import Notfound from "./Pages/Notfound/Notfound";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteOut from "./Components/ProtectedRouteOut/ProtectedRouteOut";
import useNetworkState from './../node_modules/react-use/esm/useNetworkState';
import Online from "./Components/Online/Online";



let query = new QueryClient();


const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postdetails/:postId",
        element: (
          <ProtectedRoute>
            {" "}
            <PostDetalis />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRouteOut>
            {" "}
            <Login />
          </ProtectedRouteOut>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRouteOut>
            {" "}
            <Register />
          </ProtectedRouteOut>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  let {online} = useNetworkState()
  return (
    <>
      {!online && <Online />}
      <AuthContextProvider>
        <QueryClientProvider client={query}>
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
