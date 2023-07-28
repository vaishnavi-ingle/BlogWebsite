import React, { useEffect, useState } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import BlogPreview from "../BlogPreview";

const CategoryPage = ({ category }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      const blogsRef = collection(db, "Articles");
      const q = query(blogsRef, where("category", "==", category));
      const snapshot = await getDocs(q);
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
    };

    fetchBlogsByCategory();
  }, [category]);

  return (
    <div>
      <h2>{category} Blogs</h2>
      <div>
        {blogs.map((blog) => (
          <BlogPreview key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
