import "./main.css";
import { newsList } from "../newsList";
import NewsCard from "./NewsCard.jsx";
import HeroSlider from "..//components/HeroSlider.jsx";

function Main() {
  const sortedNews = [...newsList].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <HeroSlider newsList={newsList} />
      <div className="background">
        <div className="news-header">최신 뉴스</div>
        <div className="news-scroll">
          {sortedNews.slice(0, 10).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        <div className="news-header">시사</div>
        <div className="news-scroll">
          {newsList
            .filter((news) => news.tag === "시사")
            .map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
        </div>

        <div className="news-header">문화</div>
        <div className="news-scroll">
          {newsList
            .filter((news) => news.tag === "문화")
            .map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
        </div>

        <div className="news-header">IT</div>
        <div className="news-scroll">
          {newsList
            .filter((news) => news.tag === "IT")
            .map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
