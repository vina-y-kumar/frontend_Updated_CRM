




import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const UserCard = styled.div`
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  cursor: pointer;
  ${({ isCardClicked }) =>
    isCardClicked
      ? `
        transform: scale(1.2);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      `
      : ''}
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid white;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ProfileCard = ({ user, isCardClicked, handleCardClick, children }) => {
  return (
    <Droppable droppableId={user.id}>
      {(provided) => (
        <UserCard
          bgColor={user.bgColor}
          isCardClicked={isCardClicked}
          onClick={handleCardClick}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <UserImage src={user.imageUrl} alt={user.name} />
          <UserName>{user.name}</UserName>
          {children}
          {provided.placeholder}
        </UserCard>
      )}
    </Droppable>
  );
};

export default ProfileCard;
