import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import "./style.css";

const Detail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(timestamp.toMillis()).toLocaleString(undefined, options);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = doc(db, "Articles", id);
        const articleSnapshot = await getDoc(articleRef);
        if (articleSnapshot.exists()) {
          setArticle(articleSnapshot.data());
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      }
    };

    // Fetch article data
    fetchArticle();

    // Fetch comments related to the current blog post
    const commentsRef = collection(db, "Comments");
    const q = query(commentsRef, where("articleId", "==", id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return;
    }

    try {
      // Add the new comment to Firestore
      const commentsRef = collection(db, "Comments");
      await addDoc(commentsRef, {
        articleId: id,
        content: newComment,
        createdAt: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ marginTop: 70, margin: "auto" }}>
      <div className="row">
        <div>
          <img
            className="image"
            src={article.imageUrl}
            alt={article.title}
            // style={{ width: "100%", padding: 10 }}
          />
        </div>
        <div className="col-9 mt-3">
          <h2 className="title">{article.title}</h2>
          <h5>Author: {article.createdBy}</h5>
          {article.createdAt && (
            <div className="date">
              Posted on: {article.createdAt.toDate().toDateString()}
            </div>
          )}
          <hr />
          <p className="description"> {article.description}</p>

          {/* Add comment form */}
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment..."
              rows={3}
              required
            />
            <button type="submit">Submit</button>
          </form>

          {/* Display comments */}
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p className="comment-content">{comment.content}</p>
              <p className="comment-timestamp">
                {formatDate(comment.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
