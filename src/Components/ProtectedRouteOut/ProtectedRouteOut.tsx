import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteOut({ children } :{children : ReactNode}) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to={"/"} />;
  } else {
    return <> {children}</>;
  }

  return;
}


