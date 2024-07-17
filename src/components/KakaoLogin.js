import React, { useState, useEffect } from "react";
import styled from "styled-components";
import login_button from "./../assets/login_button.png";
import { axiosInstance } from "../api/api";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const Rest_api_key = process.env.REACT_APP_KAKAO_API_KEY; // REST API KEY
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI; // Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&scope=openid`;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    try {
      window.location.href = kakaoURL;
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const buttonText = isLoggedIn ? "Logout" : "Login";
  const handleClick = isLoggedIn ? handleLogout : handleLogin;

  return (
    <Container>
      <Img src={login_button} alt="login" onClick={handleClick} />
      <Text>{buttonText}</Text>
    </Container>
  );
};

export default KakaoLogin;

const Img = styled.img`
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 14px;
  color: white;
  font-weight: 800;
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;
