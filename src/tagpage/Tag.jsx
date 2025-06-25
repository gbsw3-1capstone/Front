import { useParams } from "react-router-dom";
import NewsCard from "../main/NewsCard";
import "./Tag.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Tag = () => {
  const { tagName } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:2007/api/articles");
        setNewsList(res.data);
      } catch (err) {
        console.log("뉴스 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredNews = newsList.filter((news) => news.small_tag === tagName);

  if (loading) return <div className="tag-page-loading">불러오는 중...</div>;

  if (filteredNews.length === 0) {
    return <div className="tag-page">해당 태그의 뉴스가 없습니다.</div>;
  }

  return (
    <div className="tag-page">
      <h2 className="news-header">📌 {tagName}</h2>
      <div className="tag-news-list">
        {filteredNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default Tag;
