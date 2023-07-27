import React, { useState, useEffect } from "react";
import "./style.css";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddEditBlog({ user}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const [progress, setProgress] = useState({ percentage: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if(!user){
      navigate("/auth");
      return;
    }
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress({ percentage: progressPercent });
      },
      (err) => {
        console.log(err);
      },
      () => {
        setProgress({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div className="mt-3 mb-0 Create">
      <h2
        style={{
          border: "none",
          textDecoration: "underline",
          textDecorationColor: "#adb5bd",
        }}
      >
        Create article
      </h2>

      <div className="title">
        <label htmlFor="">Title:</label>
        <input
          name="title"
          className="form-control"
          type="text"
          placeholder="Add a title"
          style={{
            border: "none",
            backgroundColor: "#e9ecef",
            borderRadius: "0",
          }}
          onChange={(e) => handleChange(e)}
        />
      </div>

      {/* description */}
      <div>
        <label htmlFor="">Description: </label>
        <textarea
          name="description"
          className="form-control desc"
          placeholder="Add a description"
          style={{ border: "none", backgroundColor: "#e9ecef" }}
          onChange={(e) => handleChange(e)}
        />
      </div>

      {/* image */}
      <div className="image">
        <label htmlFor="">Image: </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="fomr-control"
          onChange={(e) => handleImageChange(e)}
        />
      </div>

      {progress === 0 ? null : (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped mt-2 mb-2"
            style={{ marginBottom: "1rem", width: `${progress}%` }}
          >
            {`uploading image ${progress}%`}
          </div>
        </div>
      )}

      <button className=" publish" onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
}

export default AddEditBlog;
