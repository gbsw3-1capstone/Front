import "./login.css"
import logo from "../photo/main_logo.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
    const handlelogin = (e) => {
        e.preventDefault();
        if(!id || !pw){ 
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        alert("다입력함");
        navigate('/mypage');
    }
    return(
        <div className="login-container">
            <form className="login">
                <img src={logo} width={200} height={200} alt="login" className="login-logo"></img>
                <div className="login-con">
                    <label className="login-text">아이디</label>
                    <input id="id" onChange={e => {
                        setId(e.target.value);
                    }} type="text" placeholder="아이디*" className="login-id"></input>
                </div>
                <div className="login-con">
                    <label className="login-text">비밀번호</label>
                    <input id="password" onChange={e => {
                        setPw(e.target.value);
                    }} type="password" placeholder="비밀번호*" className="login-password"></input>
                </div>
                    <input type="button" value={"로그인"} className="button-login" onClick={handlelogin}></input>
                    <Link to="/signup" className="nologin">회원가입을 하지 않으셨나요?</Link>
            </form>
        </div>
    )
}
export default Login;