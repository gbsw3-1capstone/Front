import "./signup.css";
import logo from "../photo/main_logo.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nickname: "",
  });
  const [pw2, setPw2] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://13.209.84.48:2007/api/auth/signup",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(form);
      console.log("Response:", res.data);
      alert("회원가입에 성공하였습니다!");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message;
      alert(message);
    }
  };

  return (
    <div className="register-background">
      <form className="register" onSubmit={handleSignup}>
        <img src={logo} width={200} height={200} alt="logo" />
        <div className="register-con">
          <label className="register-text2">아이디</label>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            className="register-text"
            required
          />
        </div>
        <div className="register-con">
          <label className="register-text2">비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="register-password"
            required
          />
        </div>
        <div className="register-con">
          <label className="register-text2">비밀번호 재확인</label>
          <input
            type="password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            className="register-password2"
            required
          />
        </div>
        <div className="register-con">
          <label className="register-text2">이름</label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange}
            required
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
