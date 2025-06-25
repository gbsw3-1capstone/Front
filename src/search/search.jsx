import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NewsCard from "../main/NewsCard";
import "./search.css";
import { useEffect, useState } from "react";

function Search() {
  const location = useLocation();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(location.search);
  const query = params.get("q")?.toLocaleLowerCase() || "";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:2007/api/articles");
        setNewsList(res.data);
      } catch (err) {
        console.error("뉴스 검색 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  const filteredNews = newsList.filter((news) =>
    news.title.toLocaleLowerCase().includes(query)
  );
  if (loading) return <div className="serach-loading">검색중입니다.</div>;

  return (
    <div className="background">
      <div className="search-results">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <Link
              to={`/main/${news.id}`}
              key={news.id}
              className="search-news-link"
            >
              <NewsCard key={news.id} news={news} />
            </Link>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
export default Search;
