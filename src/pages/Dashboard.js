import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth";
import DashBoardCSS from "../components/Dashboard.module.css";

const DashBoard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <>
      <div className={DashBoardCSS.userNameAndLogoutDiv}>
        <span className={DashBoardCSS.userName}>Welcome {auth.user}</span>
        <button className={DashBoardCSS.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={DashBoardCSS.navigationBtnDiv}>
        <Link className={DashBoardCSS.dashboardBtn} to="users">
          Show Users
        </Link>

        <Link className={DashBoardCSS.dashboardBtn} to="qrcodes">
          Show QRCodes
        </Link>

        <Link className={DashBoardCSS.dashboardBtn} to="createqr">
          Create QRCodes
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default DashBoard;
