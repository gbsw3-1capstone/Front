import "./login.css";
import logo from "../photo/main_logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2007/api/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, userId, username, nickname } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("nickname", nickname);

      console.log(form);
      alert("로그인 성공");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message;
      alert(msg);
    }
  };
  return (
    <div className="login-container">
      <form className="login">
        <img
          src={logo}
          width={200}
          height={200}
          alt="login"
          className="login-logo"
        ></img>
        <div className="login-con">
          <label className="login-text">아이디</label>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            className="login-id"
            required
          ></input>
        </div>
        <div className="login-con">
          <label className="login-text">비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="login-password"
            required
          ></input>
        </div>
        <input
          type="button"
          value={"로그인"}
          className="button-login"
          onClick={handlelogin}
        ></input>
        <Link to="/signup" className="nologin">
          회원가입을 하지 않으셨나요?
        </Link>
      </form>
    </div>
  );
}
export default Login;
