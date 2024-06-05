import React, { useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import './dashboard.css';


// Import your components from different parts of your code
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import Tablee from "./Table";
import Tables from "./Table";
// import Kanban1 from "../../components/Kanban/Kanban1";

const Dashboard = () => {
  const [layout, setLayout] = useState([]);
  const [isDraggable, setIsDraggable] = useState(false);
  const gridLayoutRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
 /* const DraggableComponents = [
    { id: "Client List", name: "Client List", component: <AllStudents /> },
    { id: "Company List", name: "Company List", component: <AllTeachers /> },
    { id: "Appeals", name: "Appeals", component: <ApealList /> },
  ];*/
  const handleAddComponent = (componentId) => {
    const newItem = {
      i: `new-item-${layout.length}`,
      x: 0,
      y: 0,
      w: Math.floor(window.innerWidth / 200), // Adjust as needed
      h: Math.floor(window.innerHeight / 200), // Adjust as needed
      componentId: componentId,
    };
    setLayout((prevLayout) => [...prevLayout, newItem]);
  };

  const handleDragStart = () => {
    setIsDraggable(true);
  };

  const handleDragEnd = () => {
    setIsDraggable(false);
  };
  const toggleVisibility = () => {
    setIsExpanded((prevState) => !prevState);
  };
  return (
   <div>
  
    <div className="attendance">
     
        
          <div className="atenndance_left_box">
            <Sidebar />
          </div>
          <div className="attendance_right_box">
            <Header name="Dashboard" />
            <div className="atenndance_right_box_inner">
             
              <Tables/>
              
            </div>
          </div>
        </div>
   </div>
  
   
  );
};

export default Dashboard;
