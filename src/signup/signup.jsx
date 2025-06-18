import "./signup.css";
import logo from "../photo/main_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [nm, setNm] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!id || !pw || !pw2 || !nm) {
      alert("모든칸을 입력해주세요.");
      return;
    }
    if (pw !== pw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("모든칸에 입력함");
    navigate("/login");
  };

  return (
    <div className="register-background">
      <form className="register" onSubmit={handleSignup}>
        <img src={logo} width={200} height={200} alt="logo" />
        <div className="register-con">
          <label className="register-text2">아이디</label>
          <input
            id="id"
            onChange={(e) => setId(e.target.value)}
            type="text"
            placeholder="아이디*"
            className="register-text"
          />
        </div>
        <div className="register-con">
          <label className="register-text2">비밀번호</label>
          <input
            id="password"
            onChange={(e) => setPw(e.target.value)}
            type="password"
            placeholder="비밀번호*"
            className="register-password"
          />
        </div>
        <div className="register-con">
          <label className="register-text2">비밀번호 재확인</label>
          <input
            id="password2"
            onChange={(e) => setPw2(e.target.value)}
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="register-password2"
          />
        </div>
        <div className="register-con">
          <label className="register-text2">이름</label>
          <input
            id="name"
            onChange={(e) => setNm(e.target.value)}
            type="text"
            placeholder="이름"
            className="register-name"
          />
        </div>
        <button type="submit" className="register-button">
          회원가입
        </button>
        <Link to="/login" className="signup-tologin">
          이미 회원가입을 하셨나요?
        </Link>
      </form>
    </div>
  );
}

export default Signup;
