import { Outlet } from "react-router";
import { SideBar } from "../components/SideBar";

export const Layout = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-2">
            <SideBar />
          </div>
          <div className="col col-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
