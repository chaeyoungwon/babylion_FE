import styled from "styled-components";

const ListItem = ({ user }) => {
  return (
    <ListItemContainer>
      <InfoWrapper>
        <Info>
          <InfoType>닉네임</InfoType>
          <span>{user.nickname}</span>
        </Info>
        <Info>
          <InfoType>나이</InfoType>
          <span>{user.age}</span>
        </Info>
        <Info>
          <InfoType>MBTI</InfoType>
          <span>{user.mbti}</span>
        </Info>
        <Info>
          <InfoType>한줄소개</InfoType>
          <span>{user.description}</span>
        </Info>
      </InfoWrapper>
    </ListItemContainer>
  );
};

export default ListItem;

const ListItemContainer = styled.div`
  color: white;
  background-color: #5d5957;
  width: 800px;
  height: 400px;
  border-radius: 2rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 2rem;
  & + & {
    margin-top: 2rem;
  }
`;

const InfoWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  & + & {
    margin-top: 0.6rem;
  }
`;

const InfoType = styled.span`
  color: #ffa27e;
  font-size: 1.1rem;
  font-weight: 600;
  margin-right: 0.7rem;
`;
