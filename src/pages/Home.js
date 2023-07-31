import React, { useState, useEffect } from "react";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-config";
// import { useParams } from "react-router-dom";
import BlogList from "./blogList";
import Footer from "../components/Footer";
// import ImageCarousel from "../components/ImageCarousel";
// import Footer from "../components/Footer";

function Articles() {
  // const { id } = useParams();
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articlesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesData);
    });
  }, []);

  return (
    <div>
      {/* <ImageCarousel /> */}

      <BlogList articles={articles} />

      <Footer />
    </div>
  );
}

export default Articles;
