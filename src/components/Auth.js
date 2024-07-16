import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/api";

const Auth = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const sendVerified = async () => {
    try {
      const response = await axiosInstance.post("/auth/kakao/login", {
        access_code: code,
      });
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        navigate("/list");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 404) {
          try {
            const registerResponse = await axiosInstance.post(
              "/auth/kakao/register",
              {
                access_code: code,
                description: "welcome",
              }
            );
            if (registerResponse.status === 200) {
              localStorage.setItem(
                "accessToken",
                registerResponse.data.access_token
              );
              localStorage.setItem(
                "refreshToken",
                registerResponse.data.refresh_token
              );
              navigate("/list");
            }
          } catch (registerError) {
            console.error("Registration failed", registerError);
          }
        } else if (error.response.status === 401) {
          alert("인증 실패");
        }
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  useEffect(() => {
    const handleLogin = async () => {
      try {
        console.log("Attempting login with code:", code);
        const response = await axiosInstance.post("/auth/kakao/login", {
          access_code: code,
        });
        if (response.status === 200) {
          console.log("Login successful:", response.data);
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("refreshToken", response.data.refresh_token);
          navigate("/users/list");
        }
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response) {
          if (error.response.status === 404) {
            handleRegistration();
          } else if (error.response.status === 400) {
            alert("이미 등록된 사용자입니다.");
          } else if (error.response.status === 401) {
            alert("인증 실패");
          } else {
            console.error("Unexpected error during login:", error.response);
          }
        } else {
          console.error("Unexpected error during login:", error);
        }
      }
    };

    const handleRegistration = async () => {
      try {
        console.log("Attempting registration with code:", code);
        const registerResponse = await axiosInstance.post(
          "/auth/kakao/register",
          {
            access_code: code,
            description: "방가방가",
          }
        );
        if (registerResponse.status === 200) {
          console.log("Registration successful:", registerResponse.data);
          localStorage.setItem(
            "accessToken",
            registerResponse.data.access_token
          );
          localStorage.setItem(
            "refreshToken",
            registerResponse.data.refresh_token
          );
          navigate("/users/list");
        }
      } catch (registerError) {
        console.error("Registration failed:", registerError);
        if (registerError.response) {
          if (registerError.response.status === 400) {
            alert("등록 실패: 잘못된 요청입니다.");
          } else {
            console.error(
              "Unexpected error during registration:",
              registerError.response
            );
          }
        } else {
          console.error("Unexpected error during registration:", registerError);
        }
      }
    };

    if (code) {
      handleLogin();
    } else {
      console.error("No code found in URL");
      navigate("/");
    }
  }, [code, navigate]);

  return <div>Loading...</div>;
};

export default Auth;
