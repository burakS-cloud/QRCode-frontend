// import QRCode from "qrcode.react";
import Record from "./pages/Record";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import DashBoardUsers from "./components/DashBoardUsers";
import DashBoardQR from "./components/DashBoardQR";
import DashBoardCreateQr from "./components/DashBoardCreateQR";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
// import NavbarComp from "../src/components/NavbarComp";
import DashBoardQRDelete from "./components/DashBoardQRDelete";
import DashBoardUsedQRDelete from "./components/DashBoardUsedQRDelete";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <NavbarComp /> */}
        <Routes>
          <Route path="/record/:id" element={<Record />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashBoard />
              </RequireAuth>
            }
          >
            <Route index element={<DashBoardUsers />}></Route>
            <Route path="users" element={<DashBoardUsers />}></Route>
            <Route path="qrcodes" element={<DashBoardQR />}></Route>
            <Route
              path="qrcodes/deleteQR"
              element={<DashBoardQRDelete />}
            ></Route>
            <Route
              path="users/deleteUsedQR"
              element={<DashBoardUsedQRDelete />}
            ></Route>
            <Route path="createqr" element={<DashBoardCreateQr />}></Route>
          </Route>
          <Route path="/login/ekrem" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
