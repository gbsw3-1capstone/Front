import "./main.css";
import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard.jsx";
import HeroSlider from "../components/HeroSlider.jsx";

function Main() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:2007/api/articles");
        setNewsList(res.data);
      } catch (error) {
        console.error("뉴스 데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchNews();
  }, []);

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
          "society",
          newsList.filter((news) => news.tag === "politics")
        )}
        {renderSection(
          "문화",
          newsList.filter((news) => news.tag === "문화")
        )}
        {renderSection(
          "IT",
          newsList.filter((news) => news.tag === "IT")
        )}
      </div>
    </div>
  );
}

export default Main;
