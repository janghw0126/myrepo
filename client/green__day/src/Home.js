import logo from "./logo.svg";
import "./App.css";
import Modal from "./modiary";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Notice from "./Notice.js";
import History from "./History.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState("");
  const [userInformation, setUserInformation] = useState({});
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 추가

  const handleTokenReceived = () => {
    const hash = location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token);
      console.log(token);
      sendTokenToBackend(token);
    }
  };

  async function sendTokenToBackend(token) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user-info",
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User info:", response.data);
      setUserInformation(response.data); // 사용자 정보 설정
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  }

  useEffect(() => {
    handleTokenReceived();
  }, [location]);

  const openModal = () => {
    setModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const apples = [
    { id: 1, src: "apple.png", style: { top: "215px", left: "850px" } },
    { id: 2, src: "apple.png", style: { top: "285px", left: "755px" } },
    { id: 3, src: "apple.png", style: { top: "320px", left: "890px" } },
    { id: 4, src: "apple.png", style: { top: "270px", left: "975px" } },
    { id: 5, src: "apple.png", style: { top: "390px", left: "730px" } },
    { id: 6, src: "apple.png", style: { top: "350px", left: "810px" } },
    { id: 7, src: "apple.png", style: { top: "360px", left: "1000px" } },
  ];

  return (
    <>
      <div className="App">
        <div>
          <h1>Green Day!</h1>
          <h4>
            Q. 여러분은 평소에 환경을 얼마큼 생각하시나요?
            <br />
            Green Day는 제로-웨이스트 시도 또는 습관을 기르려는 사람들을 위한 공간입니다.
          </h4>
          <h5>
            {userInformation.name}님,
            <br />
            환영합니다.
            <br />
            <br />
            <div className="one"></div>
          </h5>

          <ul className="navigation-menu">
            <li>
              <div className="click">홈</div>
            </li>
            <br />
            <li>
              <Link to="/Notice">게시판</Link>
            </li>
            <br />
            <li>
              <Link to="/History">히스토리</Link>
            </li>
            <br />
          </ul>

          <Routes>
            <Route path="/Notice" element={<Notice />} />
            <Route path="/History" element={<History />} />
          </Routes>
        </div>
      </div>
      <button
        className="tree_image"
        onClick={() => {
          setModalOpen(true); // 모달 열기
        }}
      >
        <img src="tree.png" alt="tree" />
      </button>

      <div className="App">
        {apples.map((apple) => (
          <button
            key={apple.id}
            className="apple_image"
            onClick={openModal}
            style={{ position: "absolute", ...apple.style }}
          >
            <img
              src={apple.src}
              alt={`Apple ${apple.id}`}
              style={{
                border: "none",
                backgroundColor: "transparent",
                width: "56px",
                height: "56px",
              }}
            />
          </button>
        ))}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
}

export default Home;
