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

function NaverRedirect({ setGetToken, setUserInfo }) {
  const REACT_APP_API = 'http://localhost:8080';

  // 토큰을 로컬 스토리지에서 가져오는 함수
  function getTokenFromLocalStorage() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  }

  // Naver 로그인 처리 함수
  async function naverLogin() {
    try {
      // 현재 URL에서 코드와 상태 파라미터 추출
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      // 인증 코드를 백엔드로 전송
      const res = await axios.post(REACT_APP_API + `/api/user-info`, { token: code });
      const { accessToken, refreshToken } = res.data;

      // 성공적으로 로그인된 경우 로컬 스토리지에 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(res.data);

      // 가져온 토큰 출력
      const { accessToken: storedAccessToken, refreshToken: storedRefreshToken } = getTokenFromLocalStorage();
      console.log("저장된 액세스 토큰:", storedAccessToken);
      console.log("저장된 리프레시 토큰:", storedRefreshToken);

      // 로그인 성공 메시지 표시
    //   alert("로그인이 성공했습니다.");
      
      // 메인 페이지로 이동
      window.location.href = "/Home";
    } catch (error) {
      console.error("로그인 오류:", error);
      // alert("로그인에 실패했습니다.");
    }
  }

  // 페이지 로딩 시 Naver 로그인 함수 호출
  useEffect(() => {
    naverLogin();
  }, []);

  return null; // 렌더링할 내용이 없음
}

export default NaverRedirect;
