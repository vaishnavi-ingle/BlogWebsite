import React, { useEffect, useState } from "react";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import DeleteArticle from "../../components/DeleteArticle";
import "./style.css";
import ImageCarousel from "../../components/ImageCarousel";

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
    setFirstTwoBlogs(articles.slice(4, 6));
  }, [articles]);

  const remainingBlogs = articles.slice(6, 12);

  const totalDisplayedBlogs = firstTwoBlogs.length + 4 + 6;

  const remainingRecentPosts = remainingBlogs.slice(
    Math.max(0, totalDisplayedBlogs - articles.length)
  );

  const truncateDescription = (description) => {
    const maxLength = 350;
    if (description.length > maxLength) {
      return description.substr(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div style={{ marginTop: "2.5rem" }}>
      <ImageCarousel />

      {/* Render the first two blogs beside the ImageCarousel */}
      <div className="special-blogs-container">
        {firstTwoBlogs.map((blog) => (
          <Link
            className="special-read-more"
            to={`/detail/${blog.id}`}
            key={blog.id}
          >
            <div className="special-blog">
            <div className="special-category">{blog.category}</div>
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

      {/* Render the remaining blogs in the regular blog list format */}
      <div className="blog-list-container container">
        <h2
          style={{
            // background: "linear-gradient(to right, #efefbb, #d4d3dd)",
            textAlign: "start",
            paddingLeft: "15px",
          }}
        >
          Popular
        </h2>
        <hr
          style={{
            marginTop: "5px",
            marginLeft: "15px",
            width: "3rem",
            border: "2px solid black",
          }}
        />

        {remainingBlogs.slice(0, 6).map((article) => (
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

            {article.createdAt && (
              <div className="blog-date">
                Posted on: {article.createdAt.toDate().toDateString()}
              </div>
            )}

            <h2 className="blog-title">{article.title}</h2>

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

      {/* Render the remaining articles in grid template column format */}
      <div className="recent-posts-container container">
        <h2>Recent Posts</h2>
        <hr style={{ width: "3rem", border: "2px solid black" }} />

        <div className="grid-container">
          {remainingRecentPosts.map((article) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/detail/${article.id}`}
              key={article.id}
            >
              <div className="recent-post-item">
                <div className="recent-category">{article.category}</div>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="recent-post-image"
                />
                <div className="post-content">
                  <h3 className="recent-post-title title-date">
                    {article.title}
                  </h3>
                  <p className="recent-post-desc">
                    {truncateDescription(article.description)}
                  </p>
                  {article.createdAt && (
                    <div className="recent-post-date title-date">
                      Posted on: {article.createdAt.toDate().toDateString()}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
