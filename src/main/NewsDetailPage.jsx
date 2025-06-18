import { useParams } from "react-router-dom";
import { newsList } from "../newsList";
import "./NewsDetailPage.css";
import { useState } from "react";

function NewsDetailPage() {
  const { id } = useParams();
  const news = newsList.find((item) => String(item.id) === id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeContent] = useState(() => {
    return news?.likes ?? 0;
  });

  const handleLikeClick = () => {
    if (liked) {
      setLikeContent(likeCount - 1);
    } else {
      setLikeContent(likeCount + 1);
    }
    setLiked(!liked);
  };

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
      <div class="like-section">
        <p class="like-text">이 뉴스가 마음에 드시나요?</p>
        <button class="like-button">
          ❤️ <span class="like-count">0</span>
        </button>
      </div>
    </div>
  );
}
export default NewsDetailPage;
