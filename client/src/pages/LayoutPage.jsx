import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export const LayoutPage = () => {
  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};
