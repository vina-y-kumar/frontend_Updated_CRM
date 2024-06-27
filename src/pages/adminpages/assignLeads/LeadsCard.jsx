import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { NavLink } from "react-router-dom";

const DummyCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

const DummyCard = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  width: 250px;
  text-align: left;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1];
  }
  return null;
};

const LeadsCard = ({ userId, dummyCards, selectedLeads, handleLeadSelection }) => {
  const tenantId = getTenantIdFromUrl();

  const handleCheckboxChange = (event, cardId) => {
    if (event.target.checked) {
      handleLeadSelection(cardId);
    } else {
      handleLeadSelection(cardId);
    }
  };

  return (
    <DummyCardsContainer>
      {dummyCards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided) => (
            <DummyCard
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Checkbox
                type="checkbox"
                checked={selectedLeads.includes(card.id)}
                onChange={(e) => handleCheckboxChange(e, card.id)}
              />
              <div className="content_">
                <NavLink to={`/${tenantId}/ShowLead/${card.id}`}>
                  <div className="c1">{card.name}</div>
                </NavLink>
                <div className="c2">{card.address}</div>
                <div className="c2">{card.email}</div>
                <div className="c2">{card.website}</div>
              </div>
            </DummyCard>
          )}
        </Draggable>
      ))}
    </DummyCardsContainer>
  );
};

export default LeadsCard;





// import React from 'react';
// import styled from 'styled-components';
// import { Draggable } from 'react-beautiful-dnd';
// import { NavLink } from "react-router-dom";

// const DummyCardsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin-top: 10px;
// `;

// const DummyCard = styled.div`
//   background-color: #f5f5f5;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px;
//   width: 250px;
//   text-align: left;
//   border: 1px solid #ddd;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

// const Checkbox = styled.input`
//   margin-right: 10px;
// `;

// const getTenantIdFromUrl = () => {
//   const pathArray = window.location.pathname.split('/');
//   if (pathArray.length >= 2) {
//     return pathArray[1];
//   }
//   return null;
// };

// const LeadsCard = ({ userId, dummyCards, selectedLeads, handleLeadSelection }) => {
//   const tenantId = getTenantIdFromUrl();

//   const handleCheckboxChange = (event, cardId) => {
//     if (event.target.checked) {
//       handleLeadSelection(cardId);
//     } else {
//       handleLeadSelection(cardId);
//     }
//   };

//   return (
//     <DummyCardsContainer>
//       {dummyCards.map((card, index) => (
//         <Draggable key={card.id} draggableId={card.id} index={index}>
//           {(provided) => (
//             <DummyCard
//               ref={provided.innerRef}
//               {...provided.draggableProps}
//               {...provided.dragHandleProps}
//             >
//               <Checkbox
//                 type="checkbox"
//                 checked={selectedLeads.includes(card.id)}
//                 onChange={(e) => handleCheckboxChange(e, card.id)}
//               />
//               <div className="content_">
//                 <NavLink to={`/${tenantId}/ShowLead/${card.id}`}>
//                   <div className="c1">{card.name}</div>
//                 </NavLink>
//                 <div className="c2">{card.address}</div>
//                 <div className="c2">{card.email}</div>
//                 <div className="c2">{card.website}</div>
//               </div>
//             </DummyCard>
//           )}
//         </Draggable>
//       ))}
//     </DummyCardsContainer>
//   );
// };

// export default LeadsCard;
