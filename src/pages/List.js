import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import { useNavigate } from "react-router";
import { axiosInstance } from "../api/api";

const List = () => {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);

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

  useEffect(() => {
    verifyJWT();
  }, []);

  return (
    <>
      <Navbar />
      {verify && (
        <ListWrapper>
          <ListContainer>
            <UserList />
          </ListContainer>
        </ListWrapper>
      )}
    </>
  );
};

export default List;

const ListWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;
const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8rem;
  overflow-y: auto;
  width: 100%;
`;
