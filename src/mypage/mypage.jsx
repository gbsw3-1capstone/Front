import "./mypage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Mypage() {
  const navigate = useNavigate();

  const [likedNews, setLikedNews] = useState([]);
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserNews = async () => {
      try {
        const res = await axios.get("http://localhost:2007/api/articles", {
          headers: {
            Authorization: `${token}`,
          },
        });

        const allArticles = res.data;
        const liked = allArticles.filter((article) => article.liked);
        const bookmarked = allArticles.filter((article) => article.bookmarked);

        setLikedNews(liked);
        setBookmarkedNews(bookmarked);
      } catch (err) {
        console.error("유저 뉴스 목록 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserNews();
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
    return <div className="mypage-container">로딩 중...</div>;
  }

  return (
    <div className="mypage-container">
      <div className="mypage-card">
        <h2 className="mypage-myprofile">내 프로필</h2>
        <p className="mypage-name">{localStorage.getItem("nickname")}</p>
        <p className="mypage-username">{localStorage.getItem("username")}</p>
      </div>

      <div className="mypage-card">
        <h2>마음에 드는 뉴스</h2>
        {likedNews.length === 0 ? (
          <p className="mypage-empty">
            좋아요한 뉴스가 없습니다. 뉴스를 탐색해보세요!
          </p>
        ) : (
          <div className="horizontal-scroll">
            {likedNews.map((news) => (
              <div className="news-card" key={news.id}>
                <img src={news.image} alt={news.title} />
                <h4>{news.title}</h4>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mypage-card">
        <h2>저장한 뉴스</h2>
        {bookmarkedNews.length === 0 ? (
          <p className="mypage-empty">
            북마크한 뉴스가 없습니다. 뉴스를 탐색해보세요!
          </p>
        ) : (
          <div className="horizontal-scroll">
            {likedNews.map((news) => (
              <div className="news-card" key={news.id}>
                <img src={news.image} alt={news.title} />
                <h4>{news.title}</h4>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mypage-card">
        <h2>설정</h2>
        <button className="logout-button" onClick={logout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Mypage;
