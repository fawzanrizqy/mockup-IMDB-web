import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../actions/creator";

export const SideBar = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const handleLogout = () => {
    dispatcher(clearUser());
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar position-absolute">
        <ul className="list-sidebar">
          <li className="list-sidebar-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "list-sidebar-link d-flex align-items-center active"
                  : "list-sidebar-link d-flex align-items-center"
              }
            >
              <img
                className="list-sidebar-icon"
                src="/src/assets/img/movies.svg"
                width="23"
                height="23"
              />
              <span data-txt-key="txtSidebarItem2">Movies</span>
            </NavLink>
          </li>

          <li className="list-sidebar-item">
            <NavLink
              to="/genres"
              className={({ isActive }) =>
                isActive
                  ? "list-sidebar-link d-flex align-items-center active"
                  : "list-sidebar-link d-flex align-items-center"
              }
            >
              <img
                className="list-sidebar-icon"
                src="/src/assets/img/genres.svg"
                width="24"
                height="24"
              />
              <span data-txt-key="txtSidebarItem3">Genre</span>
            </NavLink>
          </li>

          <li className="list-sidebar-item">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "list-sidebar-link d-flex align-items-center active"
                  : "list-sidebar-link d-flex align-items-center"
              }
            >
              <img
                className="list-sidebar-icon"
                src="/src/assets/img/users.svg"
                width="24"
                height="24"
              />
              <span data-txt-key="txtSidebarItem1">Register User</span>
            </NavLink>
          </li>

          <li className="list-sidebar-item" onClick={handleLogout}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "list-sidebar-link d-flex align-items-center"
                  : "list-sidebar-link d-flex align-items-center"
              }
            >
              <img
                className="list-sidebar-icon"
                src="/src/assets/img/logout.svg"
                width="24"
                height="24"
              />
              <span data-txt-key="txtSidebarItem3">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
