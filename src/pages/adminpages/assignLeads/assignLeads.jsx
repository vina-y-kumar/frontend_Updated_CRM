// import React, { useState } from 'react';
// import styled from 'styled-components';

// const UserProfileContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
//   font-family: Arial, sans-serif;
//   ${({ isCardClicked }) =>
//     isCardClicked &&
//     `
//       grid-template-columns: repeat(6, 1fr);
//       align-items: start;
//     `}
// `;

// const UserCard = styled.div`
//   background-color: ${(props) => props.bgColor};
//   border-radius: 10px;
//   padding: 30px 20px;
//   text-align: center;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 200px;
//   cursor: pointer;
//   ${({ isCardClicked }) =>
//     isCardClicked
//       ? `
//         transform: scale(0.6);
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//       `
//       : ''}
// `;

// const UserImage = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-bottom: 10px;
//   border: 2px solid white;
// `;

// const UserName = styled.div`
//   font-size: 16px;
//   font-weight: bold;
//   color: #333;
// `;

// const AssignLeads = () => {
//   const [isCardClicked, setIsCardClicked] = useState(false);
//   const [clickedCardIndex, setClickedCardIndex] = useState(null);

//   const userData = [
//     { name: 'Mark Taylor', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#E6E6FA' },
//     { name: 'Sarah Walker', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#D8F5D8' },
//     { name: 'William Davis', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFE6E6' },
//     { name: 'Matthew Brown', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFE6E6' },
//     { name: 'Emily Taylor', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFF5E6' },
//     { name: 'Jennifer Harris', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#E6F5FF' },
//   ];

//   const handleCardClick = (index) => {
//     setIsCardClicked(true);
//     setClickedCardIndex(index);
//   };

//   return (
//     <UserProfileContainer isCardClicked={isCardClicked}>
//       {userData.map((user, index) => (
//         <UserCard
//           key={index}
//           bgColor={user.bgColor}
//           isCardClicked={clickedCardIndex === index}
//           onClick={() => handleCardClick(index)}
//         >
//           <UserImage src={user.imageUrl} alt={user.name} />
//           <UserName>{user.name}</UserName>
//         </UserCard>
//       ))}
//     </UserProfileContainer>
//   );
// };

// export default AssignLeads;



// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const UserProfileContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
//   font-family: Arial, sans-serif;
//   ${({ isCardClicked }) =>
//     isCardClicked &&
//     `
//       grid-template-columns: repeat(6, 1fr);
//       align-items: start;
//       `}
//       `;
      
//       const UserCard = styled.div`
//       background-color: ${(props) => props.bgColor};
//       border-radius: 10px;
//       padding: 30px 20px;
//       text-align: center;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       min-height: 200px;
//       cursor: pointer;
//       ${({ isCardClicked }) =>
//         isCardClicked
//       ? `
//       border:1px green solid;
//       display: flex;
//         transform: scale(1.2);
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//       `
//       : ''}
// `;

// const UserImage = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-bottom: 10px;
//   border: 2px solid white;
// `;

// const UserName = styled.div`
//   font-size: 16px;
//   font-weight: bold;
//   color: #333;
// `;

// const DummyCardsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin-top: 10px;
//   border: 1px red solid;
// `;

// const DummyCard = styled.div`
//   background-color: #f5f5f5;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px;
//   width: 120px;
//   text-align: left;
// `;

// const AssignLeads = () => {
//   const [isCardClicked, setIsCardClicked] = useState(false);
//   const [clickedCardIndex, setClickedCardIndex] = useState(null);
//   const [userData, setUserData] = useState([
//     { id: '1', name: 'Mark Taylor', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#E6E6FA', dummyCards: ['Dummy Card 1', 'Dummy Card 2'] },
//     { id: '2', name: 'Sarah Walker', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#D8F5D8', dummyCards: ['Dummy Card 3', 'Dummy Card 4'] },
//     { id: '3', name: 'William Davis', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFE6E6', dummyCards: ['Dummy Card 5', 'Dummy Card 6'] },
//     { id: '4', name: 'Matthew Brown', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFE6E6', dummyCards: ['Dummy Card 7', 'Dummy Card 8'] },
//     { id: '5', name: 'Emily Taylor', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFF5E6', dummyCards: ['Dummy Card 9', 'Dummy Card 10'] },
//     { id: '6', name: 'Jennifer Harris', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#E6F5FF', dummyCards: ['Dummy Card 11', 'Dummy Card 12'] },
//   ]);

//   const handleCardClick = (index) => {
//     setIsCardClicked(true);
//     setClickedCardIndex(index);
//   };

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const newUserData = [...userData];
//     const [movedCard] = newUserData[source.droppableId].dummyCards.splice(source.index, 1);
//     newUserData[destination.droppableId].dummyCards.splice(destination.index, 0, movedCard);

//     setUserData(newUserData);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <UserProfileContainer isCardClicked={isCardClicked}>
//         {userData.map((user, index) => (
//           <React.Fragment key={index}>
//             <UserCard
//               bgColor={user.bgColor}
//               isCardClicked={clickedCardIndex === index}
//               onClick={() => handleCardClick(index)}
//             >
//               <UserImage src={user.imageUrl} alt={user.name} />
//               <UserName>{user.name}</UserName>
//             </UserCard>
//             {clickedCardIndex === index && (
//               <Droppable droppableId={user.id} type="DUMMY_CARD">
//                 {(provided) => (
//                   <DummyCardsContainer ref={provided.innerRef} {...provided.droppableProps}>
//                     {user.dummyCards.map((dummyCard, index) => (
//                       <Draggable key={`${user.id}-${index}`} draggableId={`${user.id}-${index}`} index={index}>
//                         {(provided) => (
//                           <DummyCard ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                             {dummyCard}
//                           </DummyCard>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </DummyCardsContainer>
//                 )}
//               </Droppable>
//             )}
//           </React.Fragment>
//         ))}
//       </UserProfileContainer>
//     </DragDropContext>
//   );
// };

// export default AssignLeads;



// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { DragDropContext } from 'react-beautiful-dnd';
// import ProfileCard from './ProfileCard';
// // import DummyCards from './DummyCards';
// import LeadsCard from './LeadsCard';

// const UserProfileContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
//   font-family: Arial, sans-serif;
//   ${({ isCardClicked }) =>
//     isCardClicked &&
//     `
//       grid-template-columns: repeat(6, 1fr);
//       align-items: start;
//     `}
// `;

// const ProfileCardsRow = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const AssignLeads = () => {
//   const [isCardClicked, setIsCardClicked] = useState(false);
//   const [clickedCardIndex, setClickedCardIndex] = useState(null);
//   const [userData, setUserData] = useState([
//     { id: '1', name: 'Mark Taylor', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#E6E6FA', dummyCards: ['Dummy Card 1', 'Dummy Card 2'] },
//     { id: '2', name: 'Sarah Walker', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#D8F5D8', dummyCards: ['Dummy Card 3', 'Dummy Card 4'] },
//     { id: '3', name: 'William Davis', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFE6E6', dummyCards: ['Dummy Card 5', 'Dummy Card 6'] },
//     { id: '4', name: 'Matthew Brown', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFE6E6', dummyCards: ['Dummy Card 7', 'Dummy Card 8'] },
//     { id: '5', name: 'Emily Taylor', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#FFF5E6', dummyCards: ['Dummy Card 9', 'Dummy Card 10'] },
//     { id: '6', name: 'Jennifer Harris', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s', bgColor: '#E6F5FF', dummyCards: ['Dummy Card 11', 'Dummy Card 12'] },
//   ]);

//   const handleCardClick = (index) => {
//     setIsCardClicked(true);
//     setClickedCardIndex(index);
//   };

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const newUserData = [...userData];
//     const [movedCard] = newUserData[source.droppableId].dummyCards.splice(source.index, 1);
//     newUserData[destination.droppableId].dummyCards.splice(destination.index, 0, movedCard);

//     setUserData(newUserData);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       {isCardClicked ? (
//         <>
//           <ProfileCardsRow>
//             {userData.map((user, index) => (
//               <ProfileCard
//                 key={user.id}
//                 user={user}
//                 isCardClicked={clickedCardIndex === index}
//                 handleCardClick={() => handleCardClick(index)}
//               />
//             ))}
//           </ProfileCardsRow>
//           <LeadsCard
//             userId={userData[clickedCardIndex].id}
//             dummyCards={userData[clickedCardIndex].dummyCards}
//             onDragEnd={onDragEnd}
//           />
//         </>
//       ) : (
//         <UserProfileContainer isCardClicked={isCardClicked}>
//           {userData.map((user, index) => (
//             <ProfileCard
//               key={user.id}
//               user={user}
//               isCardClicked={clickedCardIndex === index}
//               handleCardClick={() => handleCardClick(index)}
//             />
//           ))}
//         </UserProfileContainer>
//       )}
//     </DragDropContext>
//   );
// };

// export default AssignLeads;




// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { DragDropContext } from 'react-beautiful-dnd';
// import LeadsCard from './LeadsCard';

// // ... styled components remain the same

// const UserProfileContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
//   font-family: Arial, sans-serif;
//   ${({ isCardClicked }) =>
//     isCardClicked &&
//     `
//       grid-template-columns: repeat(6, 1fr);
//       align-items: start;
//     `}
// `;

// const ProfileCardsRow = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// // Temporary ProfileCard component for debugging
// const TempProfileCard = ({ user, isCardClicked, handleCardClick }) => (
//   <div 
//     onClick={handleCardClick} 
//     style={{ 
//       background: user.bgColor, 
//       padding: '10px', 
//       margin: '5px', 
//       borderRadius: '5px',
//       boxShadow: isCardClicked ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
//       cursor: 'pointer'
//     }}
//   >
//     <h3>{user.name}</h3>
//     <p>Username: {user.username}</p>
//     <p>Role: {user.role}</p>
//   </div>
// );

// const AssignLeads = () => {
//   const [isCardClicked, setIsCardClicked] = useState(false);
//   const [clickedCardIndex, setClickedCardIndex] = useState(null);
//   const [userData, setUserData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const apiUrl = 'https://webappbaackend.azurewebsites.net/get-all-user/';
      
//       const headers = {
//         'X-Tenant-ID': '3',
//         // Add any other required headers here
//       };

//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: headers,
//         });

//         console.log("Response status:", response.status);
//         console.log("Response headers:", response.headers);

//         if (!response.ok) {
//           const text = await response.text();
//           throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
//         }

//         const data = await response.json();
//         console.log("API response:", data);

//         if (!Array.isArray(data)) {
//           throw new Error("API response is not an array");
//         }

//         const formattedUserData = data.map((user, index) => ({
//           id: user.id.toString(),
//           name: user.name || "No Name",
//           username: user.username || "No Username",
//           role: user.role || "No Role",
//           imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s',
//           bgColor: getBgColor(index),
//           dummyCards: [`Dummy Card ${index * 2 + 1}`, `Dummy Card ${index * 2 + 2}`],
//         }));

//         console.log("Formatted user data:", formattedUserData);
//         setUserData(formattedUserData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const getBgColor = (index) => {
//     const colors = ['#E6E6FA', '#D8F5D8', '#FFE6E6', '#FFF5E6', '#E6F5FF'];
//     return colors[index % colors.length];
//   };

//   const handleCardClick = (index) => {
//     setIsCardClicked(true);
//     setClickedCardIndex(index);
//   };

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const newUserData = [...userData];
//     const [movedCard] = newUserData[source.droppableId].dummyCards.splice(source.index, 1);
//     newUserData[destination.droppableId].dummyCards.splice(destination.index, 0, movedCard);

//     setUserData(newUserData);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       {isCardClicked ? (
//         <>
//           <ProfileCardsRow>
//             {userData.map((user, index) => (
//               <TempProfileCard
//                 key={user.id}
//                 user={user}
//                 isCardClicked={clickedCardIndex === index}
//                 handleCardClick={() => handleCardClick(index)}
//               />
//             ))}
//           </ProfileCardsRow>
//           {userData[clickedCardIndex] && (
//             <LeadsCard
//               userId={userData[clickedCardIndex].id}
//               dummyCards={userData[clickedCardIndex].dummyCards}
//               onDragEnd={onDragEnd}
//             />
//           )}
//         </>
//       ) : (
//         <UserProfileContainer isCardClicked={isCardClicked}>
//           {userData.map((user, index) => (
//             <TempProfileCard
//               key={user.id}
//               user={user}
//               isCardClicked={clickedCardIndex === index}
//               handleCardClick={() => handleCardClick(index)}
//             />
//           ))}
//         </UserProfileContainer>
//       )}
//     </DragDropContext>
//   );
// };

// export default AssignLeads;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import ProfileCard from './ProfileCard';
import LeadsCard from './LeadsCard';

const UserProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  font-family: Arial, sans-serif;
  ${({ isCardClicked }) =>
    isCardClicked &&
    `
      grid-template-columns: repeat(6, 1fr);
      align-items: start;
    `}
`;

const ProfileCardsRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const AssignLeads = () => {
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [clickedCardIndex, setClickedCardIndex] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const apiUrl = 'https://webappbaackend.azurewebsites.net/get-all-user/';
      
      const headers = {
        'X-Tenant-ID': '3',
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }

        const formattedUserData = data.map((user, index) => ({
          id: user.id.toString(),
          name: user.name || "No Name",
          username: user.username || "No Username",
          role: user.role || "No Role",
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRchNOQarbjmtb4x_sFAr1dfKN3bLy5I0BSsg&s',
          bgColor: getBgColor(index),
          dummyCards: [`Dummy Card ${index * 2 + 1}`, `Dummy Card ${index * 2 + 2}`],
        }));

        setUserData(formattedUserData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getBgColor = (index) => {
    const colors = ['#E6E6FA', '#D8F5D8', '#FFE6E6', '#FFF5E6', '#E6F5FF'];
    return colors[index % colors.length];
  };

  const handleCardClick = (index) => {
    setIsCardClicked(true);
    setClickedCardIndex(index);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newUserData = [...userData];
    const [movedCard] = newUserData[source.droppableId].dummyCards.splice(source.index, 1);
    newUserData[destination.droppableId].dummyCards.splice(destination.index, 0, movedCard);

    setUserData(newUserData);
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error}</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isCardClicked ? (
        <>
          <ProfileCardsRow>
            {userData.map((user, index) => (
              <ProfileCard
                key={user.id}
                user={user}
                isCardClicked={clickedCardIndex === index}
                handleCardClick={() => handleCardClick(index)}
              />
            ))}
          </ProfileCardsRow>
          {userData[clickedCardIndex] && (
            <LeadsCard
              userId={userData[clickedCardIndex].id}
              dummyCards={userData[clickedCardIndex].dummyCards}
              onDragEnd={onDragEnd}
            />
          )}
        </>
      ) : (
        <UserProfileContainer isCardClicked={isCardClicked}>
          {userData.map((user, index) => (
            <ProfileCard
              key={user.id}
              user={user}
              isCardClicked={clickedCardIndex === index}
              handleCardClick={() => handleCardClick(index)}
            />
          ))}
        </UserProfileContainer>
      )}
    </DragDropContext>
  );
};

export default AssignLeads;