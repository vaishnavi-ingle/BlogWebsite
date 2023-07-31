// TrendingCategory.js
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config"
import { Link } from "react-router-dom";
// import "./TrendingCategory.css";

const TrendingCategory = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);

  useEffect(() => {
    // Fetch articles with the trending category
    const fetchTrendingArticles = async () => {
      const articleRef = collection(db, "Articles");
      const q = query(articleRef, where("category", "==", "trending"));

      try {
        const querySnapshot = await getDocs(q);
        const trendingArticlesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrendingArticles(trendingArticlesData);
      } catch (error) {
        console.error("Error fetching trending articles:", error);
      }
    };

    fetchTrendingArticles();
  }, []);

  return (
    <div className="trending-category-container">
      <h2>Trending Category</h2>
      <hr style={{ width: "3rem", border: "2px solid black" }} />

      <div className="trending-blogs-container">
        {trendingArticles.map((article) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/detail/${article.id}`}
            key={article.id}
          >
            <div className="trending-blog">
              <div className="trending-category">{article.category}</div>
              <img
                src={article.imageUrl}
                alt={article.title}
                className="trending-blog-image"
              />
              <h2 className="trending-blog-title">{article.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingCategory;
