// ImageCarousel.js (Updated)
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import "./style.css";

const ImageCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const carouselRef = collection(db, "Carousel");
    const unsubscribe = onSnapshot(carouselRef, (snapshot) => {
      const carouselData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarouselData(carouselData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="carousel-container-left">
      {/* <h2>Featured Blog Posts</h2> */}
      <Carousel showThumbs={false} autoPlay interval={2000} className="Carousel">
        {carouselData.map((item) => (
          <div key={item.blogPostId} className="carousel-slide">
            <img src={item.imageUrl} alt={item.title} className="carousel-image" />
            <div className="carousel-overlay">
              <p className="carousel-title">{item.title}</p>
              {/* <Link to={`/detailCarousel/${item.id}`} className="read-full-article">
                Read Full Article →
              </Link> */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
