import "./mypage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../main/NewsCard";
import mypage_loading from "../photo/loading/mypage_loading.png";

function Mypage() {
  const navigate = useNavigate();

  const [likedNews, setLikedNews] = useState([]);
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [activeTab, setActiveTab] = useState("liked");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserNews = async () => {
      try {
        const res = await axios.get("http://13.209.84.48:2007/api/articles", {
          headers: {
            Authorization: `${token}`,
          },
        });

        const allArticles = res.data;
        const liked = allArticles.filter((article) => article.liked);
        const bookmarked = allArticles.filter((article) => article.bookmarked);

        setLikedNews(liked);
        setBookmarkedNews(bookmarked);

        const recent = allArticles.slice(0, 100);
        setRecentNews(recent);
      } catch (err) {
        console.error("유저 뉴스 목록 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserNews();
  }, [token]);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const recentIds = JSON.parse(
          localStorage.getItem("recentNewsIds") || "[]"
        );
        if (recentIds.length === 0) {
          setRecentNews([]);
          return;
        }

        const promises = recentIds.map((id) =>
          axios.get(`http://13.209.84.48:2007/api/articles/${id}`, {
            headers: { Authorization: token },
          })
        );

        const responses = await Promise.all(promises);
        const recentArticles = responses.map((res) => res.data);
        setRecentNews(recentArticles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentNews();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="mypage-loading">
        <img
          src={mypage_loading}
          width={500}
          height={500}
          alt="mypage_loading"
        />
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <div className="mypage-left-panel">
        <div className="mypage-font-line">
          <h2 className="mypage-name">
            "{localStorage.getItem("nickname")}"님
          </h2>
          <p className="mypage-username">
            ID: {localStorage.getItem("username")}
          </p>
          <br />
          <div className="mypage-stats">
            <span>
              좋아요 <br />
              {likedNews.length}개
            </span>
            <br />
            <span>
              북마크 <br /> {bookmarkedNews.length}개
            </span>
          </div>
        </div>
        <button className="logout-button" onClick={logout}>
          로그아웃
        </button>
      </div>

      <div className="mypage-right-panel">
        <div className="mypage-tab-buttons">
          {/* <button
            onClick={() => setActiveTab("recent")}
            className={activeTab === "recent" ? "active" : ""}
          >
            최근 본
          </button> */}
          <button
            onClick={() => setActiveTab("liked")}
            className={activeTab === "liked" ? "active" : ""}
          >
            좋아요
          </button>
          <button
            onClick={() => setActiveTab("bookmarked")}
            className={activeTab === "bookmarked" ? "active" : ""}
          >
            북마크
          </button>
        </div>

        <div className="mypage-news-list">
          {/* {activeTab === "recent" &&
            recentNews.map((news) => <NewsCard key={news.id} news={news} />)} */}
          {activeTab === "liked" &&
            likedNews.map((news) => <NewsCard key={news.id} news={news} />)}
          {activeTab === "bookmarked" &&
            bookmarkedNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Mypage;
