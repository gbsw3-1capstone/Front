import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";

const menuItems = [
  {
    label: "시사",
    icon: "📰",
    to: "/sisa",
    subMenu: [
      { label: "정치", to: "/tag/Politics" },
      { label: "경제", to: "/tag/Economy" },
      { label: "사회", to: "/tag/Society" },
      { label: "세계", to: "/tag/International" },
    ],
  },
  {
    label: "문화",
    icon: "🎨",
    to: "/culture",
    subMenu: [
      { label: "생활/문화", to: "/tag/Culture%2FLife" },
      { label: "연예", to: "/tag/Entertainment" },
    ],
  },
  {
    label: "IT",
    icon: "💻",
    to: "/it",
    subMenu: [
      { label: "기술", to: "/tag/Technology" },
      { label: "테크", to: "/tag/Tech" },
    ],
  },
];

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const [openMenus, setOpenMenus] = useState({});
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    }
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setSearchText("");
    }
  }, [isSidebarOpen]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

    if (!isSidebarOpen && ["시사", "문화", "IT"].includes(label)) {
      setIsSidebarOpen(true);
    }
  };

  const handleHomeClick = () => {
    navigate("/");
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };
  return (
    <div className="no-toggle">
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="top-bar left-fixed">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="toggle-btn"
          >
            ☰
          </button>
        </div>

        <div className="search-box">
          {isSidebarOpen ? (
            <form onSubmit={onSearchSubmit}>
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                className="search-input"
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchText(value);
                  navigate(`/search?q=${encodeURIComponent(value)}`);
                }}
                autoComplete="off"
              />
            </form>
          ) : (
            <span
              title="검색"
              onClick={() => setIsSidebarOpen(true)}
              style={{ cursor: "pointer" }}
            >
              🔍
            </span>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="menu-group">
            <div
              className="nav-item parent"
              onClick={() => {
                handleHomeClick();
                if (isSidebarOpen) setIsSidebarOpen(false);
              }}
              title={!isSidebarOpen ? "홈" : ""}
            >
              <span className="icon">🏠</span>
              {isSidebarOpen && <span className="label">홈</span>}
            </div>
          </div>
          <div className="menu-group">
            <div
              className="nav-item parent"
              onClick={() => {
                navigate("/INK");
                if (isSidebarOpen) setIsSidebarOpen(false);
              }}
              title={!isSidebarOpen ? "INK" : ""}
            >
              <span className="icon">🔥</span>
              {isSidebarOpen && <span className="label">INK</span>}
            </div>
          </div>
          {menuItems.map(({ label, icon, subMenu }) => (
            <div key={label} className="menu-group">
              <div
                className="nav-item parent"
                onClick={() => toggleMenu(label)}
                title={!isSidebarOpen ? label : ""}
              >
                <span className="icon">{icon}</span>
                {isSidebarOpen && <span className="label">{label}</span>}
                {isSidebarOpen && (
                  <span className={`arrow ${openMenus[label] ? "open" : ""}`}>
                    ▸
                  </span>
                )}
              </div>
              {openMenus[label] && isSidebarOpen && (
                <div className="sub-menu">
                  {subMenu.map(({ label: subLabel, to: subTo }) => (
                    <Link
                      key={subLabel}
                      to={subTo}
                      className={`nav-item sub-item ${
                        location.pathname === subTo ? "active" : ""
                      }`}
                      onClick={() => {
                        if (isSidebarOpen) setIsSidebarOpen(false);
                      }}
                    >
                      {subLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="menu-group">
            <div
              className="nav-item parent"
              onClick={() => {
                navigate("/tag/Sports");
                if (isSidebarOpen) setIsSidebarOpen(false);
              }}
              title={!isSidebarOpen ? "스포츠" : ""}
            >
              <span className="icon">⚽️</span>
              {isSidebarOpen && <span className="label">스포츠</span>}
            </div>
          </div>
        </nav>

        <div className="navbar-footer">
          {isSidebarOpen ? (
            localStorage.getItem("nickname") ? (
              <Link to="/mypage">
                <div style={{ padding: "10px", fontWeight: "bold" }}>
                  {localStorage.getItem("nickname")}님
                </div>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsSidebarOpen(false)}>
                  로그인
                </Link>
                <span className="divider">|</span>
                <Link to="/signup" onClick={() => setIsSidebarOpen(false)}>
                  회원가입
                </Link>
              </>
            )
          ) : (
            <span
              role="button"
              tabIndex={0}
              title="로그인/회원가입"
              className="footer-icon"
              onClick={() => setIsSidebarOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setIsSidebarOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              👤
            </span>
          )}
        </div>
      </aside>
    </div>
  );
}

export default Navbar;
