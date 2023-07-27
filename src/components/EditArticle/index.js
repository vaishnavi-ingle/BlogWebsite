import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./style.css";
import { toast } from "react-toastify";

function EditBlog() {
  const { articleId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "", // Add imageUrl field for the image URL
  });

  useEffect(() => {
    // Fetch the article data from Firestore
    const fetchArticleData = async () => {
      try {
        const docRef = doc(db, "Articles", articleId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.log("Article not found");
        }
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the article data in Firestore
      const docRef = doc(db, "Articles", articleId);
      const dataToUpdate = { ...formData };

      // Remove the image field from dataToUpdate
      delete dataToUpdate.image;

      // Update the article data in Firestore without modifying the image field
      await updateDoc(docRef, dataToUpdate);

      // Show success toast
      toast("Article updated successfully", { type: "success" });
    } catch (error) {
      console.error("Error updating article:", error);

      // Show error toast
      toast("Error updating article", { type: "error" });
    }
  };

  return (
    <div className="EditBlog">
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Display the current image */}
        {formData.imageUrl && (
          <div className="image">
            <label htmlFor="">Current Image: </label>
            <img
              src={formData.imageUrl}
              alt="Current Article"
              style={{ width: "100%", padding: 10 }}
              className="current-image"
            />
          </div>
        )}

        {/* Update image */}
        <div className="image">
          <label htmlFor="">Update Image: </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="fomr-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditBlog;
