import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState(null);
  const auth = useAuth();
  const handleLogin = () => {
    if (
      process.env.REACT_APP_ADMIN_USERNAME === user &&
      process.env.REACT_APP_ADMIN_PASSWORD === password
    ) {
      auth.login(user);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login/ekrem", { replace: true });
    }
  };

  return (
    <>
      <div>
        <label>
          Username:{" "}
          <input type="text" onChange={(e) => setUser(e.target.value)} />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
