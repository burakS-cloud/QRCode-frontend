import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DashBoardUsedQRDelete = () => {
  const [QRCodes, setQRCodes] = useState([]);
  const [deleteResponse, setDeleteResponse] = useState("");

  let navigate = useNavigate();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const requestQR = async () => {
      const res = await axios.get(
        `https://qrcode-app.adaptable.app/api/getUsedQRCodes`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data) {
        console.log(res.data);
        setQRCodes(res.data.codes);
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
          <th>Video_ID</th>
          <th>Video_URL</th>
          <th>Content Type</th>
          <th>Email</th>
          <th>Name</th>
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
                      `https://qrcode-app.adaptable.app/api/deleteUsedQR`,
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
              <td style={{ textAlign: "center" }}>{qr.video_ID}</td>
              <td style={{ textAlign: "center" }}>{qr.video_URL}</td>
              <td style={{ textAlign: "center" }}>{qr.contentType}</td>
              <td style={{ textAlign: "center" }}>{qr.user_email}</td>
              <td style={{ textAlign: "center" }}>{qr.user_name}</td>
              <td style={{ textAlign: "center" }}>{qr.createdAt}</td>
            </tr>
          </>
        ))}
      </table>
    </>
  );
};

export default DashBoardUsedQRDelete;
