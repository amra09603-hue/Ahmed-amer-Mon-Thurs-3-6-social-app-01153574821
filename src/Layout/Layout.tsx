import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container min-h-[50%] mx-auto my-12">
        <Outlet />
      </div>

      
    </>
  );
}
