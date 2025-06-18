import { Link, useLocation } from "react-router-dom";
import { newsList } from "../newsList";
import NewsCard from "../main/NewsCard";
import "./search.css";

function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q")?.toLocaleLowerCase() || "";

  const filteredNews = newsList.filter((news) =>
    news.title.toLocaleLowerCase().includes(query)
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
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
export default Search;
