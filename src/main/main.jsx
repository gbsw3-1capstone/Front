import "./main.css";
import axios from "axios";
import loading_image from "../photo/loading/loading.png";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard.jsx";
import HeroSlider from "../components/HeroSlider.jsx";

function Main() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://13.209.84.48:2007/api/articles");
        setNewsList(res.data);
      } catch (error) {
        console.error("뉴스 데이터를 가져오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="main-page-loading">
        <img
          className="loading-img"
          src={loading_image}
          width={400}
          height={400}
          alt="loading"
        ></img>
      </div>
    );

  const sortedNews = [...newsList].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const renderSection = (title, filteredNews) => (
    <div>
      <div className="news-header">{title}</div>
      <div className="news-scroll">
        {filteredNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <HeroSlider newsList={sortedNews} />

      <div className="background">
        {renderSection("최신 뉴스", sortedNews)}
        {renderSection(
          "시사",
          newsList.filter((news) => news.tag2 === "시사")
        )}
        {renderSection(
          "문화",
          newsList.filter((news) => news.tag2 === "문화")
        )}
        {renderSection(
          "IT",
          newsList.filter((news) => news.tag2 === "IT")
        )}
      </div>
    </div>
  );
}

export default Main;
