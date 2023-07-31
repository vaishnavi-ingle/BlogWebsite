import React, { useEffect, useState } from "react";
import { collection, orderBy, query, limit, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import "./style.css";

const ImageCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(4));
    onSnapshot(q, (snapshot) => {
      const carouselData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarouselData(carouselData);
    });
  }, []);

  return (
    <div className="carousel-container-left">
      <Carousel
        showThumbs={false}
        autoPlay
        interval={5000}
        className="Carousel"
        infiniteLoop
      >
        {carouselData.map((item) => (
          <Link className="special-read-more" to={`/detail/${item.id}`} key={item.id}>
            <div className="carousel-slide">
              <div className="carousel-category">{item.category}</div>
              <img src={item.imageUrl} alt={item.title} className="carousel-image" />
              <div className="carousel-overlay">
                <p className="carousel-title">{item.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
