import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import {toast} from 'react-toastify'

const AdminLanding = () => {
  const [labelText, setLabelText] = useState();
  const [labelTextName, setLabelTextName] = useState(false);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState({
    postTitle: "",
    postDescription: "",
    postImage: null,
  });
  const handlePreviewData = () => {
    setCertificateData((prevData) => ({
      ...prevData,
      postImage: null,
    }));
    setLabelTextName(false);
  };
  const adjustHeight = () => {
    if (postDescription.current) {
      postDescription.current.style.height = "30px";
      postDescription.current.style.height = `${postDescription.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [content]);
  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setContent(event.target.value);
  };
  const postImage = useRef();
  const postDescription = useRef();
  const postTitle = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newImage = event.target.result;
        setCertificateData((prevData) => ({
          ...prevData,
          postImage: newImage,
        }));
      };

      reader.readAsDataURL(file);
      setLabelText(file.name);
      setLabelTextName(true);
    }
  };

  const handlePostSubmit = async(e) => {
    e.preventDefault();
    const file = postImage.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("postTitle", postTitle.current.value);
      formData.append("postDescription", postDescription.current.value);
      formData.append("postImage", file, file.name);

      axios
        .post(
          "https://mstapplication-backend.onrender.com/feed/createfeed",
          formData
        )
        .then((resp) => {
          console.log(resp.data);
        //   alert("data posted sucessfully");
            toast.success('Data Posted SucessFully')
          navigate("/adminPost");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("please Enter All Data");
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <div className="post-page-parent">
        {/* <h3>Post Activity</h3> */}
        <div className="post-page-child">
          <div className="certificateData">
            <div style={{ textAlign: "start" }}>
              <label htmlFor=""> Post Title</label> <br />
              <input
                className="certificateDataInput"
                type="text"
                name="postTitle"
                placeholder="Enter Post Title"
                ref={postTitle}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div style={{ textAlign: "start" }}>
              <label htmlFor="">Post Description</label> <br />
              <textarea
                name="postDescription"
                ref={postDescription}
                className="h-auto"
                value={content}
                onChange={handleInputChange}
                id="description"
                placeholder="Enter Post Description"
              />
            </div>
            <div>
              <div style={{ textAlign: "start" }}>
                <label htmlFor="">Attachments</label> <br />
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={postImage}
                  onChange={handleFileChange}
                />
              </div>
              <div className="text-area-attachments">
                {!labelTextName ? (
                  <div
                    style={{
                      position: "relative",
                      height: "60px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => postImage.current.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
                    </svg>
                    <span
                      style={{
                        zIndex: 1,
                        position: "absolute",
                        marginLeft: "16px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M14 26.7277V13.9999M14 13.9999V1.27197M14 13.9999H26.728M14 13.9999H1.27207"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <div
                      style={{
                        color: "#BABABA",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                    >
                      Click to add file
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
                    </svg>
                    <span
                      style={{
                        zIndex: 1,
                        position: "absolute",
                        marginLeft: "20px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                      >
                        <path
                          d="M2.42859 17.0713C1.34436 15.987 0.802247 14.6907 0.802247 13.1822C0.802246 11.6737 1.34436 10.3773 2.42859 9.29309L9.85321 1.86847C10.631 1.09065 11.5738 0.70174 12.6816 0.70174C13.7894 0.70174 14.7323 1.09065 15.5101 1.86847C16.2879 2.64628 16.6768 3.58909 16.6768 4.69689C16.6768 5.80469 16.2879 6.7475 15.5101 7.52532L8.79255 14.2428C8.29758 14.7378 7.70832 14.9853 7.02479 14.9853C6.34125 14.9853 5.75199 14.7378 5.25702 14.2428C4.76204 13.7479 4.51456 13.1586 4.51456 12.4751C4.51456 11.7915 4.76204 11.2023 5.25702 10.7073L11.9745 3.98979L13.0352 5.05045L6.31768 11.768C6.11733 11.9683 6.01716 12.204 6.01716 12.4751C6.01716 12.7461 6.11733 12.9818 6.31768 13.1822C6.51803 13.3825 6.75373 13.4827 7.02479 13.4827C7.29584 13.4827 7.53155 13.3825 7.73189 13.1822L14.4494 6.46466C14.9444 5.96969 15.1919 5.38043 15.1919 4.69689C15.1919 4.01336 14.9444 3.4241 14.4494 2.92913C13.9544 2.43415 13.3652 2.18666 12.6816 2.18666C11.9981 2.18666 11.4088 2.43415 10.9139 2.92913L3.48925 10.3537C2.71143 11.1316 2.32253 12.0744 2.32253 13.1822C2.32253 14.29 2.71144 15.2328 3.48925 16.0106C4.26707 16.7884 5.20988 17.1773 6.31768 17.1773C7.42548 17.1773 8.36829 16.7884 9.14611 16.0106L16.5707 8.58598L17.6314 9.64664L10.2068 17.0713C9.12254 18.1555 7.82617 18.6976 6.31768 18.6976C4.80918 18.6976 3.51282 18.1555 2.42859 17.0713Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <div
                      style={{
                        color: "#BABABA",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                    >
                      {labelText}
                    </div>
                    <div
                      style={{
                        color: "#2676C2",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      className="hoverItems"
                      onClick={() => postImage.current.click()}
                    >
                      Replace
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="previewData">
            <h3>Preview</h3>
            <div className="previewData-display">
              <div>
                <div className="previewCertifyData" style={{ padding: "20px" }}>
                  <div>
                    <h6
                      style={{
                        fontSize: "16px",
                        color: "#535353",
                        fontWeight: "500",
                        margin: "20px 0px",
                        maxWidth: "560px",
                        wordBreak: "break-word",
                      }}
                    >
                      {certificateData.postTitle}
                    </h6>
                    <h6
                      style={{
                        fontSize: "16px",
                        color: "#535353",
                        fontWeight: "400",
                        margin: 0,
                        marginBottom: "20px",
                        maxWidth: "560px",
                        wordBreak: "break-word",
                      }}
                    >
                      {certificateData.postDescription}
                    </h6>
                    <div>
                      {certificateData.postTitle &&
                        certificateData.postDescription &&
                        certificateData.postImage && (
                          <div style={{ display: "flex", alignItems: "start" }}>
                            {certificateData.postImage && (
                              <img
                                height="200px"
                                width="200px"
                                src={certificateData.postImage}
                                alt="Preview"
                              />
                            )}
                            <span
                              className="delete"
                              onClick={handlePreviewData}
                              style={{ marginLeft: "10px" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none"
                              >
                                <path
                                  d="M12.1111 8.77778V16.5556M7.66667 8.77778V16.5556M3.22222 4.33333V17.4444C3.22222 18.689 3.22222 19.3109 3.46443 19.7862C3.67748 20.2044 4.01719 20.545 4.43533 20.758C4.91022 21 5.53222 21 6.77434 21H13.0034C14.2456 21 14.8667 21 15.3416 20.758C15.7597 20.545 16.1005 20.2044 16.3136 19.7862C16.5556 19.3113 16.5556 18.69 16.5556 17.4479V4.33333M3.22222 4.33333H5.44444M3.22222 4.33333H1M5.44444 4.33333H14.3333M5.44444 4.33333C5.44444 3.29791 5.44444 2.78045 5.6136 2.37207C5.83914 1.82756 6.27147 1.3947 6.81597 1.16916C7.22435 1 7.74235 1 8.77778 1H11C12.0354 1 12.5531 1 12.9615 1.16916C13.506 1.3947 13.9385 1.82756 14.1641 2.37207C14.3332 2.78045 14.3333 3.29791 14.3333 4.33333M14.3333 4.33333H16.5556M16.5556 4.33333H18.7778"
                                  stroke="#2676C2"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-button-parent">
              <button className="post-button" onClick={handlePostSubmit}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
