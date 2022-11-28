import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const DashBoardCreateQR = () => {
  const [amount, setAmount] = useState(1);
  const [backendResponse, setBackendResponse] = useState("");

  const { handleSubmit } = useForm();

  return (
    <>
      {backendResponse && <div>{backendResponse}</div>}
      <div style={{ textAlign: "center", position: "relative" }}>
        <form
          onSubmit={handleSubmit(async (data, event) => {
            event.preventDefault();
            const response = await axios.post(
              `http://localhost:3001/api/CreateQR`,
              {
                amount: amount,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            setBackendResponse(response.data);
          })}
        >
          <label style={{ marginRight: "1em" }} htmlFor="number">
            Enter how many QR Codes you want to create:
          </label>
          <input
            style={{ padding: ".25rem" }}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            style={{
              display: "block",
              position: "absolute",
              left: "46%",
              top: "150%",
              border: "none",
              padding: ".25rem .5rem",
              color: "white",
              background: "black",
              borderRadius: "10%",
            }}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default DashBoardCreateQR;
