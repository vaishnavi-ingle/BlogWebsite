// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../../firebase-config"

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || ''; // Get the category from the query parameter

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesRef = collection(db, 'Articles');
        let q = query(articlesRef);
        
        // Filter articles by category if the category is provided in the query parameter
        if (category) {
          q = query(articlesRef, where('category', '==', category));
        }

        const snapshot = await getDocs(q);
        const articlesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    // Fetch articles based on the selected category
    fetchArticles();
  }, [category]);

  return (
    <div>
      {/* Display the search results based on the filtered articles */}
      {/* You can use the articles state to render the articles */}
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          {/* Other article information */}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
