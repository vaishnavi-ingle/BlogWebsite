import React, { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config"

const DetailCarousel = ({ match }) => {
  // Make sure to handle the case when match is undefined or the parameter is missing
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    if (!match || !match.params.id) {
      return; // Early return if no valid blogPostId
    }

    const fetchBlogPost = async () => {
      try {
        const blogPostRef = doc(db, "Carousel", match.params.id);
        const blogPostSnapshot = await getDoc(blogPostRef);
        if (blogPostSnapshot.exists()) {
          setBlogPost(blogPostSnapshot.data());
        } else {
          console.log("Blog post not found!");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [match]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <img src={blogPost.imageUrl} alt={blogPost.title} />
      <p>{blogPost.description}</p>
      {/* Add the full content of the blog post here */}
    </div>
  );
};

export default DetailCarousel;
