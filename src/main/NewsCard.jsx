import "./NewsCard.css";
import { useNavigate } from "react-router-dom";

function NewsCard({ news }) {
  const navigate = useNavigate();
  if (!news) {
    return null;
  }
  const { id, title, date, image } = news;

  return (
    <div className="news-container">
      <div className="news-card" onClick={() => navigate(`/main/${id}`)}>
        <img src={image} alt={title} className="news-image" />
        <div className="news-text">
          <h3 className="news-title">{title}</h3>
          <p className="news-date">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
