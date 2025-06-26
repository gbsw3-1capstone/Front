import { useParams } from "react-router-dom";
import axios from "axios";
import "./NewsDetailPage.css";
import { useEffect, useState } from "react";

function NewsDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const token = localStorage.getItem("token");

  const fetchNews = async () => {
    try {
      const res = await axios.get(`http://localhost:2007/api/articles/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setNews(res.data);
      setLiked(res.data.liked);
      setBookmarked(res.data.bookmarked);
    } catch (err) {
      console.error("뉴스 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  const handleLikeClick = async () => {
    try {
      await axios.post(
        `http://localhost:2007/api/articles/${id}/like`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchNews();
    } catch (err) {
      console.error("좋아요 토글 실패", err);
      alert("로그인 이후 이용 가능합니다!");
    }
  };

  const handleBookmarkClick = async () => {
    try {
      await axios.post(
        `http://localhost:2007/api/articles/${id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchNews();
    } catch (err) {
      console.error("북마크 토글 실패", err);
      alert("로그인 후 이용 가능합니다!");
    }
  };

  if (loading)
    return <div className="NewsDetailPage-loading">불러오는 중...</div>;

  if (!news) return <div>뉴스를 찾을 수 없습니다.</div>;

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
          className="news-detail-button"
          onClick={() => window.open(news.news_link, "_blank")}
          title="원본 기사 보기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M18 13v6a2 2 0 0 1-2 2H6a2 
             2 0 0 1-2-2V8a2 2 0 0 
             1 2-2h6"
            ></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>

        <button
          className={`news-detail-button ${liked ? "liked" : ""}`}
          onClick={handleLikeClick}
          title={liked ? "좋아요 취소" : "좋아요"}
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
          onClick={handleBookmarkClick}
          title={bookmarked ? "북마크 해제" : "북마크"}
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
