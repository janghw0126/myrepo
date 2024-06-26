import React, { useState, useEffect } from "react";
import {
  Routes,
  Route, 
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Notice from "./Notice.js";
import History from "./History.js";
import Home from "./Home.js";
import NaverRedirect from "./NaverRedirect";

function Xlog({ setGetToken, setUserInfo }) {
  const [buttonOpen, setButtonOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();



  const handleTreeClick = () => {
    const NAVER_CLIENT_ID = 'o72MtePRXsbwlztUtJoj';
    const NAVER_REDIRECT_URI = 'http://localhost:3000/authuser';
    const REACT_APP_NAVER_STATE = '123';
    const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}&state=${REACT_APP_NAVER_STATE}`;
    window.location.href = NAVER_URI;
  };

  return (
    <>
      <h1>Green Day!</h1>
      <h4>
        Q. 여러분은 평소에 환경을 얼마큼 생각하시나요?
        <br />
        Green Day는 제로-웨이스트 시도 또는 습관을 기르려는 사람들을 위한
        공간입니다.
      </h4>
      <title>네이버 로그인</title>
      <div className="App">
        <div>
          <h5>
            <br />
            환영합니다.
            <br />
            <br />
            <div className="one"></div>
          </h5>

          <ul className="xlog-navigation-menu">
            <li>
              <div onClick={() => alert("나무를 눌러서 로그인을 해주세요")}>
                홈
              </div>
            </li>
            <br />
            <br />
            <li>
              <div onClick={() => alert("나무를 눌러서 로그인을 해주세요")}>
                게시판
              </div>
            </li>
            <br />
            <br />
            <li>
              <div onClick={() => alert("나무를 눌러서 로그인을 해주세요")}>
                히스토리
              </div>
            </li>
            <br />
            <br />
            <li>
              <Link to="/home">로그인 후 화면</Link>
            </li>

            <br />
          </ul>
          <Routes>
            <Route path="/home" element={<NaverRedirect />} />
            <Route path="/Notice" element={<Notice />} />
            <Route path="/History" element={<History />} />
            <Route path="/Xlog" element={<Xlog />} />
          </Routes>
        </div>
      </div>

      <button className="tree_image" onClick={handleTreeClick}>
        <img src="tree.png" alt="tree" />
      </button>

      {buttonOpen && (
        <div>
          <div className="login_button">
            <img src="a.png" alt="a" />
          </div>

          <button>
            <div className="login_button_content">
              <img
                src="x.png"
                alt="x"
                onClick={() => {
                  setButtonOpen(false);
                }}
              />
            </div>
          </button>
        </div>
      )}

    </>
  );
}

export default Xlog;
