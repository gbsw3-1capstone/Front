import "./mypage.css";
import { useNavigate } from "react-router-dom";

const likedNews = [];

function Mypage() {
  const navigate = useNavigate();
  const logout = (e) => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

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
          <ul className="liked-news-list">
            {likedNews.map((news, idx) => (
              <li key={idx} className="news-item">
                <img src={news.image} alt={news.title} />
                <span>{news.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mypage-card">
        <h2>저장한 뉴스</h2>
        {likedNews.length === 0 ? (
          <p className="mypage-empty">
            북마크한 뉴스가 없습니다. 뉴스를 탐색해보세요!
          </p>
        ) : (
          <ul className="liked-news-list">
            {likedNews.map((news, idx) => (
              <li key={idx} className="news-item">
                <img src={news.image} alt={news.title} />
                <span>{news.title}</span>
              </li>
            ))}
          </ul>
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
