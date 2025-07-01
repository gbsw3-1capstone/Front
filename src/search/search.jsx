import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NewsCard from "../main/NewsCard";
import "./search.css";
import { useEffect, useState } from "react";
import search_logo from "../photo/loading/search_loading.png";
import no_search from "../photo/loading/no_search_logo.png";

function Search() {
  const location = useLocation();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(location.search);
  const query = params.get("q")?.toLocaleLowerCase() || "";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://13.209.84.48:2007/api/articles");
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
  if (loading)
    return (
      <div className="serach-loading">
        <img
          className="search-loading-logo"
          src={search_logo}
          width={500}
          height={500}
          alt="search_logo"
        ></img>
      </div>
    );

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
          <div className="no-search-logo">
            <img src={no_search} width={500} height={500} alt="No_search"></img>
          </div>
        )}
      </div>
    </div>
  );
}
export default Search;
