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
import { db } from "../firebase-config";

const Detail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
        // You can add more fields like userId to identify the user who posted the comment
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
    <div className="container border bg-light" style={{ marginTop: 70 }}>
      <div className="row">
        <div className="col-3">
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{ width: "100%", padding: 10 }}
          />
        </div>
        <div className="col-9 mt-3">
          <h2>{article.title}</h2>
          <h5>Author: {article.createdBy}</h5>
          {article.createdAt && (
            <div>Posted on: {article.createdAt.toDate().toDateString()}</div>
          )}
          <hr />
          <p>{article.description}</p>
          {/* Display comments */}
          <div>
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                {/* Display other comment information (e.g., user, date) if available */}
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Detail;
