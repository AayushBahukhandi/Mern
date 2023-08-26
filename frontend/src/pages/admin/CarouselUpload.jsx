import React, { useState, useEffect, useRef } from "react";
import "./carouselupload.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import withAdminAuth from './withAdminAuth';


const CarouselUpload=()=> {
  const [imageUrl, setImageUrl] = useState("");
  const [showUrl, setShowUrl] = useState([]);
  const [count, setCount] = useState(0);
  const inpRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const data = { imageUrl };
    inpRef.current.value = "";

    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/postImage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/getImage`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setShowUrl(data);
        } else {
          setShowUrl([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowUrl([]);
      });
  }, [count]);

  function remove(id) {
    console.log("url id", imageUrl, id);

    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/deleteImage/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Sidebar />

      <div id="dash_carou_field">
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label1>
              ImageUrl <br />
              <input
                type="text"
                ref={inpRef}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </label1>
          </div>
          <button id="addImgBtn" type="submit">
            Add Carousel Images
          </button>
        </form>
        <br />
        {showUrl.length === 0 ? (
          <h1>No Carousel Images!!!</h1>
        ) : (
          showUrl.map((u, i) => (
            <div key={i} id="dash_carou_img">
              <img src={u.imageUrl} className="img1" alt={u.imageUrl} />
              <button
                className="delete-button1"
                onClick={() => remove(u._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
export default withAdminAuth(CarouselUpload);
