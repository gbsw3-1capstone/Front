import { useParams } from "react-router-dom";
import { newsList } from "../newsList";
import "./NewsDetailPage.css";
import { useState } from "react";

function NewsDetailPage() {
  const { id } = useParams();
  const news = newsList.find((item) => String(item.id) === id);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!news) {
    return <div>뉴스를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="news-detail-container">
      <div
        className="news-detail-image"
        style={{ backgroundImage: `url(${news.image})` }}
      ></div>

      <div className="news-deatil-header">
        <h1 className="news-detail-title">{news.title}</h1>
        <p className="news-detail-meta">
          {news.date} | {news.news_source}
        </p>
      </div>

      <div className="summary-box">{news.summary_highlight}</div>

      <div className="news-detail-content">
        <p className="news-detail-summary">{news.summary}</p>
      </div>

      <div className="news-detail-fixed-button">
        <button
          className={`news-detail-button ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill={liked ? "red" : "none"}
            stroke={liked ? "red" : "black"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6c-1.7-1.7-4.4-1.7-6.1 0L12 7.3l-2.7-2.7c-1.7-1.7-4.4-1.7-6.1 0s-1.7 4.4 0 6.1l8.8 8.8 8.8-8.8c1.7-1.7 1.7-4.4 0-6.1z"></path>
          </svg>
        </button>

        <button
          className={`news-detail-button ${bookmarked ? "bookmarked" : ""}`}
          onClick={() => setBookmarked(!bookmarked)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill={bookmarked ? "dodgerblue" : "none"}
            stroke={bookmarked ? "dodgerblue" : "black"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NewsDetailPage;
