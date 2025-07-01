import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import "./ink.css";

const Ink = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [maxId, setMaxId] = useState(null);
  const observer = useRef(null);
  const lastNewsObserver = useRef(null);
  const cardRefs = useRef([]);
  const token = localStorage.getItem("token");

  const fetchMaxId = async () => {
    try {
      const res = await axios.get(
        "http://13.209.84.48:2007/api/articles/max-id"
      );
      if (res.data && typeof res.data.max_id === "number") {
        setMaxId(res.data.max_id);
      }
    } catch (err) {
      console.error("최대 ID 불러오기 실패", err);
    }
  };

  const fetchRandomNewsById = async () => {
    try {
      setLoading(true);

      const maxRes = await axios.get(
        "http://13.209.84.48:2007/api/articles/max-id"
      );
      const currentMaxId = maxRes.data?.max_id;
      if (!currentMaxId) return;

      let news = null;
      let attempts = 0;

      while (!news && attempts < 10) {
        const randomId = Math.floor(Math.random() * currentMaxId) + 1;
        try {
          const res = await axios.get(
            `http://13.209.84.48:2007/api/articles/${randomId}`,
            { headers: { Authorization: token } }
          );
          if (res.data && res.data.id) {
            news = res.data;
          }
        } catch (err) {}
        attempts++;
      }

      if (news) {
        setNewsList((prev) => [...prev, news]);
      }
    } catch (err) {
      console.error("뉴스 로딩 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaxId();
  }, []);

  useEffect(() => {
    if (maxId !== null) {
      fetchRandomNewsById();
    }
  }, [maxId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < newsList.length - 1) {
          setProgressKey((k) => k + 1);
          return prev + 1;
        }
        return prev;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [newsList]);

  useEffect(() => {
    if (cardRefs.current[currentIndex]) {
      cardRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (observer.current) {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.current.unobserve(ref);
      });
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setCurrentIndex((prevIndex) => {
              if (Math.abs(index - prevIndex) > 1) return prevIndex;
              if (index !== prevIndex) {
                setProgressKey((k) => k + 1);
                return index;
              }
              return prevIndex;
            });
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.8 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.current.observe(ref);
    });

    return () => {
      if (observer.current) {
        cardRefs.current.forEach((ref) => {
          if (ref) observer.current.unobserve(ref);
        });
        observer.current.disconnect();
      }
    };
  }, [newsList]);

  const lastNewsRef = useCallback(
    (node) => {
      if (loading) return;
      if (lastNewsObserver.current) lastNewsObserver.current.disconnect();

      lastNewsObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchRandomNewsById();
        }
      });

      if (node) lastNewsObserver.current.observe(node);
    },
    [loading, maxId]
  );

  const updateNewsStatus = (id, field) => {
    setNewsList((prevNews) =>
      prevNews.map((news) =>
        news.id === id ? { ...news, [field]: !news[field] } : news
      )
    );
  };

  const handleLikeClick = async (id) => {
    if (!token) {
      alert("로그인 후 이용 가능합니다!");
      return;
    }
    try {
      await axios.post(
        `http://13.209.84.48:2007/api/articles/${id}/like`,
        {},
        { headers: { Authorization: token } }
      );
      updateNewsStatus(id, "liked");
    } catch (err) {
      alert("로그인 후 이용 가능합니다!");
      console.error("좋아요 토글 실패", err);
    }
  };

  const handleBookmarkClick = async (id) => {
    if (!token) {
      alert("로그인 후 이용 가능합니다!");
      return;
    }
    try {
      await axios.post(
        `http://13.209.84.48:2007/api/articles/${id}/bookmark`,
        {},
        { headers: { Authorization: token } }
      );
      updateNewsStatus(id, "bookmarked");
    } catch (err) {
      alert("로그인 후 이용 가능합니다!");
      console.error("북마크 토글 실패", err);
    }
  };

  return (
    <div className="ink-container">
      {newsList.map((news, index) => (
        <div
          className="ink-card"
          key={news.id || index}
          data-index={index}
          ref={(el) => {
            cardRefs.current[index] = el;
            if (index === newsList.length - 1) lastNewsRef(el);
          }}
        >
          <div>
            <img src={news.image} alt={news.title} className="ink-image" />
            <div className="ink-content">
              <h1 className="ink-title">{news.title}</h1>
              <p className="ink-date">{news.date}</p>
              <p className="ink-highlight">{news.summary_highlight}</p>
              <div className="ink-actions">
                <button
                  className={`ink-detail-button ${news.liked ? "liked" : ""}`}
                  onClick={() => handleLikeClick(news.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill={news.liked ? "red" : "none"}
                    stroke={news.liked ? "red" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.8 4.6c-1.7-1.7-4.4-1.7-6.1 0L12 7.3l-2.7-2.7c-1.7-1.7-4.4-1.7-6.1 0s-1.7 4.4 0 6.1l8.8 8.8 8.8-8.8c1.7-1.7 1.7-4.4 0-6.1z" />
                  </svg>
                </button>
                <button
                  className={`ink-detail-button ${
                    news.bookmarked ? "bookmarked" : ""
                  }`}
                  onClick={() => handleBookmarkClick(news.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill={news.bookmarked ? "dodgerblue" : "none"}
                    stroke={news.bookmarked ? "dodgerblue" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                </button>
              </div>
            </div>
            {index === currentIndex && (
              <div className="progress-bar-wrapper">
                <div key={progressKey} className="progress-bar-fill" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ink;
