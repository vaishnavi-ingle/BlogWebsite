import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase-config";
import { deleteObject, ref } from "firebase/storage";

export default function DeleteArticle({ id, imageUrl }) {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Articles", id));
      toast("Article deleted successfully", { type: "success" });
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      toast("Error deleting article", { type: "error" });
      console.log(error);
    }
  };
  return (
    <div>
      <button
        style={{
          float: "right",
          border: "none",
          background: "none",
          color: "#e63946",
          // marginLeft: "-7.7rem",
          marginRight:"20rem",
          marginTop: "1.4rem",
        
        }}
        onClick={handleDelete}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}
