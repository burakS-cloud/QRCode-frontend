import React, { useEffect } from "react";
import DashBoardQR from "../components/DashBoardQR";
import DashBoardUsers from "../components/DashBoardUsers";
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
      {/* <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Sanane yarram" position="top">
            <button>hey</button>
          </TooltipComponent>
          <button
            type="button"
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
            style={{ background: "blue", borderRadius: "50%" }}
          >
            <FiSettings />
          </button>
        </div>
      </div> */}
      {/* <a
        href="http://localhost:3000/dashboard/users"
        style={{
          border: "1px solid black",
          padding: ".5rem",
          marginBottom: "-3em",
        }}
      >
        See Users
      </a> */}
      <div className={DashBoardCSS.userNameAndLogoutDiv}>
        <span className={DashBoardCSS.userName}>Welcome {auth.user}</span>
        <button className={DashBoardCSS.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={DashBoardCSS.navigationBtnDiv}>
        <Link
          className={DashBoardCSS.dashboardBtn}
          // style={{
          //   marginRight: "3em",
          // }}
          to="users"
        >
          Show Users
        </Link>

        <Link
          className={DashBoardCSS.dashboardBtn}
          // style={{
          //   marginRight: "3em",
          // }}
          to="qrcodes"
        >
          Show QRCodes
        </Link>

        <Link
          className={DashBoardCSS.dashboardBtn}
          // style={{
          //   textDecoration: "none",
          //   border: "1px solid black",
          //   padding: ".25rem",
          //   background: "black",
          //   color: "white",
          //   borderRadius: "5%",
          // }}
          to="createqr"
        >
          Create QRCodes
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default DashBoard;
