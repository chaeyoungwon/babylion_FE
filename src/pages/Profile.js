import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../api/api";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [id, setId] = useState();
  const [nickname, setNickname] = useState();
  const [description, setDescription] = useState();
  const [age, setAge] = useState();
  const [mbti, setMBTI] = useState("");
  const [message, setMessage] = useState("");

  const handleIDChange = (e) => {
    setId(e.target.value);
  };

  const handleNameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleMBTIChange = (e) => {
    setMBTI(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const verifyJWT = async () => {
    try {
      const response = await axiosInstance.get("/auth/kakao/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setVerify(true);
      console.log(response.data);
    } catch (error) {
      alert("로그인 ㄱㄱ");
      navigate("/");
    }
  };

  const getMyInfo = async () => {
    const access_token = localStorage.getItem("accessToken");

    try {
      const response = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = response.data;
      console.log(data);
      setId(data.id);
      setNickname(data.nickname);
      setDescription(data.description);
      setAge(data.age);
      setMBTI(data.mbti);
    } catch (error) {
      console.error("Failed to load my information", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.patch(
        "/users",
        {
          id: id,
          nickname: nickname,
          description: description,
          age: age,
          mbti: mbti,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Success:", response.data);
      setMessage("Information updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to update information.");
    }
  };

  useEffect(() => {
    verifyJWT();
    getMyInfo();
  }, []);

  return (
    <>
      <Navbar />
      <Body>
        <MyInfo>My Info</MyInfo>
        {verify && (
          <InfoContainer>
            <DetailBox>
              <InfoDetail>
                사용자 ID
                <Input type="number" value={id} onChange={handleIDChange} />
              </InfoDetail>
              <InfoDetail>
                닉네임
                <Input type="text" value={id} onChange={handleNameChange} />
              </InfoDetail>
              <InfoDetail>
                나이
                <Input type="number" value={age} onChange={handleAgeChange} />
              </InfoDetail>
              <InfoDetail>
                MBTI
                <Input type="text" value={mbti} onChange={handleMBTIChange} />
              </InfoDetail>
              <InfoDetail>
                한 줄 소개
                <Input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </InfoDetail>
            </DetailBox>
          </InfoContainer>
        )}
        <EditBtn onClick={handleUpdate}>내 정보 수정하기</EditBtn>
        {message && <Message>{message}</Message>}
      </Body>
    </>
  );
};

export default Profile;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 69px;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: black;
`;

const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const MyInfo = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: lightsalmon;
`;

const InfoDetail = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  margin: 20px;
  color: white;
`;

const InfoContainer = styled.div`
  display: flex;
  margin: 30px 0;
`;

const Input = styled.input`
  display: flex;
  text-align: center;
  width: 150px;
  height: 40px;
  margin: 0 20px;
  padding: 10px;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 16px;
  border-bottom: 2px solid white;
`;

const EditBtn = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightsalmon;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin: 0 5px;
`;

const Message = styled.span`
  color: white;
  font-size: 16px;
  margin-top: 10px;
`;
