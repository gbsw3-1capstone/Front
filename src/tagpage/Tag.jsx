import { useParams } from "react-router-dom";
import { newsList } from "../newsList";
import NewsCard from "../main/NewsCard";
import "./Tag.css";

const Tag = () => {
  const { tagName } = useParams(); // URL에서 tagName 추출
  const filteredNews = newsList.filter((news) => news.small_tag === tagName);

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
