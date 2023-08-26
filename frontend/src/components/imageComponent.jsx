import React from "react";
import "./ImageUpload.css";

export default function ImageUpload(props) {
  const pickImageHandler = () => {
    document.querySelector("#imageUrl").click();
  };

  const pickedhandler = (e) => {
    if (e.target.files.length > 0) {
      const pickedFile = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        document.querySelector(".image-upload__preview img").src =
          fileReader.result;
      };
      fileReader.readAsDataURL(pickedFile);
      props.getImage(pickedFile);
    } else {
      return false;
    }
  };

  return (
    <div className="form-control">
      <input
        type="file"
        name="imageUrl"
        id="imageUrl"
        hidden
        onChange={pickedhandler}
      />
      <div className="image-upload center">
        <div className="image-upload__preview">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${props.uploadedImage}`}
            alt="Preview"
          />
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
    </div>
  );
}
