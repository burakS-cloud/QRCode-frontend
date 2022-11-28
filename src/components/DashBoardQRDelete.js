import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DashBoardQRDelete = () => {
  const [QRCodes, setQRCodes] = useState([]);
  const [qrCodeIDS, setQrCodeIDS] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState("");

  let navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    const requestQR = async () => {
      const res = await axios.get(`http://localhost:3001/api/getQRCodes`, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data) {
        console.log(res.data);
        setQRCodes(res.data.codes);
        setQrCodeIDS(res.data.codesIDS);
      } else {
        console.log("couldnt fetch qrcodes");
      }
    };
    requestQR();
  }, []);

  return (
    <>
      {deleteResponse && <p>{deleteResponse}</p>}
      <table>
        <tr>
          {/* <th>Company</th>
          <th>Contact</th>
          <th>Country</th> */}
          {/* {QRCodes.map((qr) => (
            <>
              
            </>
          ))} */}
          <th>İşlemler</th>
          <th>Id</th>
          <th>DB_ID</th>
          <th>Creation Date</th>
        </tr>
        {QRCodes.map((qr) => (
          <>
            <tr key={qr.qrCode_ID}>
              <td style={{ textAlign: "center" }}>
                <form
                  onSubmit={handleSubmit(async (data, e) => {
                    e.preventDefault();
                    const response = await axios.post(
                      `http://localhost:3001/api/deleteQR`,
                      {
                        ID: qr.qrCode_ID,
                      },
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    );
                    console.log(response.data);
                    // setQRCodes(response.data.codes);
                    // setQrCodeIDS(response.data.codesIDS);
                    setDeleteResponse(response.data);
                    navigate("/dashboard/qrcodes");
                  })}
                >
                  <button
                    id={qr.qrCode_ID}
                    style={{
                      background: "red",
                      color: "white",
                      padding: ".25rem .5rem",
                      borderRadius: "10%",
                      border: "none",
                    }}
                  >
                    Delete
                  </button>
                </form>
              </td>
              <td style={{ textAlign: "center" }}>{qr.qrCode_ID}</td>
              <td style={{ textAlign: "center" }}>{qr._id}</td>
              <td style={{ textAlign: "center" }}>{qr.createdAt}</td>
            </tr>
          </>
        ))}
      </table>
    </>
  );
};

export default DashBoardQRDelete;
