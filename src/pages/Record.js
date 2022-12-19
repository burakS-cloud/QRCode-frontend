import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";
import RecordCSS from "./Record.module.css";

const Record = () => {
  const inputRef = useRef();
  const videoRef = useRef();
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [file, setFile] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [isDataSentToBackend, setIsDataSentToBackend] = useState(false);
  const [videoDurationMsg, setVideoDurationMsg] = useState(
    "Your video can't be longer than 20 seconds."
  );
  const [duration, setDuration] = useState(0);
  const [isVideoDurationValid, setIsVideoDurationValid] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const sendParams = async () => {
      const res = await axios.post(
        `https://qrcode-app.adaptable.app/api/receiveParams`,
        {
          qrparams: location.pathname.split("record")[1].slice(1),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.length > 12) {
        console.log(res.data);
        setVideoURL(res.data);
        setIsLoading(false);
        //navigate(res.data);
        // window.location.assign(videoURL);
      } else {
        setError(res.data);
        setIsLoading(false);
      }
    };

    sendParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoURL]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //Bu if bloğunun aq, re-render'ların sebebi %90 bu.
  // if (videoURL !== "empty") {
  //   window.location.assign(videoURL);
  // }

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    console.log(`The video is ${video.duration} seconds long.`);
    setDuration(Math.floor(video.duration));
    if (video.duration === 0 || video.duration > 20) {
      setVideoDurationMsg("Your video can't be longer than 20 seconds");
      setIsVideoDurationValid(false);
    } else {
      setVideoDurationMsg("Your video is appropriate.");
      setIsVideoDurationValid(true);
    }
  };

  // console.log(videoRef.current);
  // let nameInput = watch().name ? watch().name : "";
  // let emailInput = watch().email ? watch().email : "";

  // let qrcodeID = url.substring(16, url.length);
  console.log("videoURL:", videoURL);
  console.log("error:", error);

  console.log(
    "location:",
    typeof location.pathname.split("record")[1].slice(1)
  );

  const handleSaveButtonClick = () => {
    if (isSaveButtonClicked === false) {
      setIsSaveButtonClicked(true);
    }
  };
  console.log("isvideoselected:", isVideoSelected);

  // This will be the actual params

  // console.log(window.location.href.split("params=")[1]);

  let conditionalRenderDecision = () => {
    if (isLoading) {
      return <h3>Loading...</h3>;
    }
    if (error === "nonexistent") {
      return <h3>Böyle bir QR code bulunmamaktadır.</h3>;
    }
    if (error === "empty") {
      return (
        <div className={RecordCSS.fullContainerDiv}>
          <form
            onSubmit={handleSubmit(async (data, event) => {
              event.preventDefault();
              const formData = new FormData();
              formData.append("file", file);
              formData.append("form", {
                user_email: data?.email,
                user_name: data?.name,
              });
              const response = await axios.post(
                `https://qrcode-app.adaptable.app/api/saveVideoQr`,
                {
                  file: file,
                  form: { user_email: data?.email, user_name: data?.name },
                  qrparams: location.pathname.split("record")[1].slice(1),
                },
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
              if (response.data) {
                setIsDataSentToBackend(true);
              }

              console.log(response.data);
            })}
            id="myform"
            encType="multipart/form-data"
          >
            <div className={RecordCSS.recordVidDiv}>
              <label
                className={RecordCSS.recordVidDivLabel}
                onClick={() => setIsVideoSelected(true)}
                // style={{
                //   marginTop: ".2em",
                //   border: "1px solid black",
                //   background: "black",
                //   color: "white",
                //   padding: ".5rem",
                //   borderRadius: ".25rem",
                //   cursor: "pointer",
                // }}
                htmlFor="capture"
              >
                Record Video
              </label>

              <input
                className={RecordCSS.videoInputEl}
                // style={{ display: "none" }}
                onChange={(e) => {
                  videoRef.current.src = window.URL.createObjectURL(
                    inputRef.current.files[0]
                  );
                  setFile(e.target.files[0]);
                  // const file = e.target.files[0];
                  // const reader = new FileReader();
                  // reader.addEventListener("load", () => {
                  //   console.log(reader.result);
                  // });
                  // reader.readAsDataURL(file);
                }}
                // name="capture"
                // placeholder="Record video"
                // {...register("capture", {
                //   required: "Please select or record a video",
                // })}
                ref={inputRef}
                type="file"
                id="capture"
                accept="video/*"
                capture
              />
            </div>

            <div className={RecordCSS.videoContainer}>
              <div className={RecordCSS.flexVideoContainer}>
                <p>
                  <video
                    className={RecordCSS.videoEl}
                    // style={{
                    //   marginTop: "1em",
                    //   marginLeft: "3em",
                    //   border: "1px solid gray",
                    // }}
                    width={300}
                    height={300}
                    ref={videoRef}
                    src=""
                    id="audio"
                    controls
                    onLoadedMetadata={handleLoadedMetadata}
                  ></video>
                </p>

                <div className={RecordCSS.videoMessageDiv}>
                  {/* {duration === 0 || duration > 20
                  ? videoDurationMsg
                  : "You're good to go"} */}
                  {videoDurationMsg}
                </div>
              </div>
            </div>

            {isVideoSelected ? (
              <div
                className={RecordCSS.userInfoDiv}
                // style={{
                //   display: "flex",
                //   flexDirection: "column",
                //   width: "250px",
                //   marginLeft: "7em",
                // }}
              >
                <label className={RecordCSS.nameLabel} htmlFor="name">
                  Full Name:
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  {...register("name", {
                    required: "Please enter a name",
                  })}
                />
                {errors.name ? (
                  <p className={RecordCSS.errorMessage}>
                    {errors.name.message}
                  </p>
                ) : (
                  ""
                )}
                <label
                  className={RecordCSS.emailLabel}
                  // style={{ marginBottom: ".4em", marginTop: ".4em" }}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email", {
                    required: "Please enter an email",
                  })}
                />
                {errors.email ? (
                  <p className={RecordCSS.errorMessage}>
                    {errors.email.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {/* <button>send req</button> */}
            <button
              className={RecordCSS.saveButton}
              onClick={() => handleSaveButtonClick()}
              disabled={!isVideoDurationValid}
              style={{
                // marginTop: "1em",
                // marginLeft: "7em",
                // border: "none",
                // outline: "none",
                // padding: ".5rem",
                // width: "250px",
                display: !isDataSentToBackend ? "block" : "none",
                // background: "black",
                // color: "white",
                // borderRadius: ".25rem",
              }}
            >
              Save Video
            </button>
          </form>
        </div>
      );
    }
    if (videoURL) {
      window.location.assign(videoURL);
    }
  };

  return <>{conditionalRenderDecision()}</>;
};

export default Record;
