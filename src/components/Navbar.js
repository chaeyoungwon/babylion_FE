import React from "react";
import styled from "styled-components";
import KakaoLogin from "./KakaoLogin";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Bar>
      <Link to="/" style={{ textDecoration: "none" }}>
        <TitleList>
          <Title> HONGIK LIKELION 🦁 </Title>
          <Subtitle> social login </Subtitle>
        </TitleList>
      </Link>
      <BtnList>
        <KakaoLogin />
        <Link to="/users">
          <ProfileBtn active={isActive("/users") ? 1 : 0}>
            My profile
          </ProfileBtn>
        </Link>
        <Link to="/users/list">
          <ListBtn active={isActive("/users/list") ? 1 : 0}>
            Profile list
          </ListBtn>
        </Link>
      </BtnList>
    </Bar>
  );
};

export default Navbar;

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  padding: 10px;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
`;

const Title = styled.h2`
  font-size: 20px;
  color: white;
`;

const Subtitle = styled.span`
  margin: 0 15px;
  font-weight: 700;
  color: orange;
  font-size: 18px;
`;

const ProfileBtn = styled.button`
  background-color: transparent;
  width: 100px;
  color: ${({ active }) => (active ? "orange" : "white")};
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

const ListBtn = styled(ProfileBtn)``;

const BtnList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  padding: 0 5px;
`;

const TitleList = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
