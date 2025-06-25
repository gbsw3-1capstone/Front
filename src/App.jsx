import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./navbar/navbar.jsx";
import Main from "./main/main.jsx";
import Login from "./login/login.jsx";
import Signup from "./signup/signup.jsx";
import Search from "./search/search.jsx";
import NewsDetailPage from "./main/NewsDetailPage.jsx";
import Mypage from "./mypage/mypage.jsx";
import Tag from "./tagpage/Tag.jsx";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="navbar-layout">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className="main-content"
          style={{
            marginLeft: isSidebarOpen ? "220px" : "60px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} />
            <Route path="/main/:id" element={<NewsDetailPage />} />
            <Route path="/:id" element={<NewsDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/tag/:tagName" element={<Tag />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
