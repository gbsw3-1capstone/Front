import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

function HeroSlider({ newsList }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const todaysNews = newsList.filter(
    (news) => news.date === today && news.image
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % todaysNews.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [todaysNews.length]);

  if (todaysNews.length === 0) {
    return null;
  }
  const { id, title, date, image, news_source } = todaysNews[current];

  return (
    <>
      <div
        className="hero-slider"
        style={{
          backgroundImage: `url(${image})`,
          transition: "opacity 0.3s ease-in-out",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/main/${id}`)}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-summary">{date}</p>
        </div>
        <div className="news-source">
          <p className="hero-source">{news_source}</p>
        </div>
      </div>
    </>
  );
}

export default HeroSlider;
