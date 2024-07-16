import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const List = () => {
  return (
    <>
      <Navbar />
      <ListWrapper>
        <ListContainer>
          <UserList />
        </ListContainer>
      </ListWrapper>
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
