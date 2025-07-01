import { useParams } from "react-router-dom";
import NewsCard from "../main/NewsCard";
import "./Tag.css";
import axios from "axios";
import { useEffect, useState } from "react";
import tag_loading from "../photo/loading/tag_loading.png";

const sortOptions = [
  { label: "최신순", value: "latest" },
  { label: "좋아요순", value: "likes" },
  { label: "전체 조회수순", value: "views" },
  { label: "북마크순", value: "bookmarks" },
  { label: "일일조회수", value: "daily_views" },
  { label: "주간조회수", value: "weekly_views" },
];

const Tag = () => {
  const { tagName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");

  const filteredNews = newsList.filter((news) => news.small_tag === tagName);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://13.209.84.48:2007/api/articles/ranking",
          {
            params: {
              sortBy,
              limit: 100,
            },
          }
        );
        const linkMap = new Map();

        res.data.forEach((news) => {
          try {
            const url = new URL(news.news_link);
            const normalizedLink = url.origin + url.pathname;

            if (!linkMap.has(normalizedLink)) {
              linkMap.set(normalizedLink, news);
            }
          } catch (e) {
            alert("1");
          }
        });

        const uniqueNews = Array.from(linkMap.values());
        setNewsList(uniqueNews);
      } catch (err) {
        console.log("뉴스 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [sortBy]);

  if (loading)
    return (
      <div className="tag-page-loading">
        <img src={tag_loading} width={500} height={500} alt="tag_loading"></img>
      </div>
    );

  if (filteredNews.length === 0) {
    return <div className="tag-page">해당 태그의 뉴스가 없습니다.</div>;
  }

  return (
    <div className="tag-page">
      <h2 className="news-header">📌 {tagName}</h2>
      <div className="sort-dropdown">
        <label className="sort-label">정렬 기준:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="tag-news-list">
        {paginatedNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      <div className="tag-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tag;
