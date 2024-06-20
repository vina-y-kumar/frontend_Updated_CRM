import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DummyCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
//   border: 1px red solid;
`;

const DummyCard = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  width: 120px;
  text-align: left;
`;

const LeadsCard = ({ userId, dummyCards, onDragEnd }) => {
  return (
    <Droppable droppableId={userId} type="DUMMY_CARD">
      {(provided) => (
        <DummyCardsContainer ref={provided.innerRef} {...provided.droppableProps}>
          {dummyCards.map((dummyCard, index) => (
            <Draggable key={`${userId}-${index}`} draggableId={`${userId}-${index}`} index={index}>
              {(provided) => (
                <DummyCard ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  {dummyCard}
                </DummyCard>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </DummyCardsContainer>
      )}
    </Droppable>
  );
};

export default LeadsCard;