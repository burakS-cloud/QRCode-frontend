// import QRCode from "qrcode.react";
import Record from "./pages/Record";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import DummyPage from "./pages/DummyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/record" element={<Record />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="https://qrcode-lp7c.onrender.com/dummy"
          element={<DummyPage />}
        ></Route>

        {/* <QRCode style={{ marginLeft: "15rem" }} value="www.google.com" id="5" /> */}
      </Routes>
    </Router>
  );
}

export default App;
