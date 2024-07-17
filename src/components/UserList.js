import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/api";
import ListItem from "./ListItem";
import styled from "styled-components";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get("/users/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        setError("사용자 리스트 조회에 실패하였습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <UserListContainer>
      <Title>로그인 한 사람들 조회</Title>
      {users.map((user) => (
        <ListItem key={user.id} user={user} />
      ))}
    </UserListContainer>
  );
};

export default UserList;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  background-color: black;
  color: white;
  min-height: 100vh;
`;
const Title = styled.h3`
  color: white;
  font-weight: 700;
  margin: 15px 0;
`;
