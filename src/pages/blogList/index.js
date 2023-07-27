import React, { useEffect, useState } from "react";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import DeleteArticle from "../../components/DeleteArticle";
import "./style.css";
import ImageCarousel from "../../components/ImageCarousel";

const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }
  return description.slice(0, maxLength) + "...";
};

const BlogList = () => {
  const [articles, setArticles] = useState([]);
  const [firstTwoBlogs, setFirstTwoBlogs] = useState([]);

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

  useEffect(() => {
    // Set the first two blogs separately
    setFirstTwoBlogs(articles.slice(0, 2));
  }, [articles]);

  return (
    <div style={{marginTop: "2.5rem"}}>
      {/* Render the ImageCarousel here */}
      <ImageCarousel />

      {/* Render the first two blogs beside the ImageCarousel */}
      <div className="special-blogs-container">
        {firstTwoBlogs.map((blog) => (
          <Link className="special-read-more" to={`/detail/${blog.id}`}>
            <div className="special-blog" key={blog.id}>
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="special-blog-image"
              />
              <h2 className="special-blog-title">{blog.title}</h2>
            </div>
          </Link>
        ))}
      </div>
      <h2 style={{ background: "linear-gradient(to right, #efefbb, #d4d3dd)", padding: "10px 0", marginTop:"5rem" }}>
        Popular
      </h2>
      {/* Render the remaining blogs in the regular blog list format */}
      <div className="blog-list-container">
        {articles.slice(2).map((article) => (
          <div className="col-md-4 blog-item" key={article.id}>
            <div className="blog-image-container">
              {/* Display category */}
              {article.category && (
                <div className="category">{article.category}</div>
              )}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="blog-image"
              />
            </div>
            <h2 className="blog-title">{article.title}</h2>

            {article.createdAt && (
              <div className="blog-date">
                Posted on: {article.createdAt.toDate().toDateString()}
              </div>
            )}

            <p className="blog-description">
              {truncateDescription(article.description, 50)}
            </p>
            <Link className="read-more" to={`/detail/${article.id}`}>
              Read Article →
            </Link>
            <DeleteArticle
              className="delete"
              id={article.id}
              imageUrl={article.imageUrl}
            />
            <Link className="edit" to={`/edit/${article.id}`}>
              <span className="material-symbols-outlined">edit</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
