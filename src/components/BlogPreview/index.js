import React from "react";
import { Link } from "react-router-dom";

const BlogPreview = ({ blog }) => {
  return (
    <div className="blog-preview">
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
      <Link to={`/detail/${blog.id}`}>Read More</Link>
    </div>
  );
};

export default BlogPreview;
