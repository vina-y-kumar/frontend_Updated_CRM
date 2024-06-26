import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode, TextUpdaterNode,ButtonNode,SendMessage,AskQuestion,SetCondition } from './TextUpdaterNode.jsx';
import axios from 'axios';
import './dndWhatsapp.css';
import e from 'cors';
import { useMemo } from 'react';
const lastNode = initialNodes[initialNodes.length - 1];
import Sidebar from "./WhastappSidebar.jsx";

import "./dnd.css";
import initialNodes from "./nodes.jsx";

import initialEdges from "./edges.jsx";

// Extract the id property from the last node
let id = parseInt(lastNode.id) +1;
//let id = 10+1;

const getId = () => `${id++}`;

const WhatsappFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [editValue, setEditValue] = useState(nodes.data);
  const [title, setTitle] = useState(nodes.data);
  const [id, setId] = useState();
  const [selectNodeId, setSelectedNodeId] = useState();
  const [showSetCondition, setShowSetCondition] = useState(false);
  const [selectedValueOption, setSelectedValueOption]=useState();


  const nodeTypes = useMemo(() => ({ 
    textUpdater: TextUpdaterNode,
    customNode: CustomNode,
    buttonNode: ButtonNode,
    sendMessage: SendMessage,
    askQuestion: AskQuestion,
    setCondition: SetCondition,
  }), []);

  


  const onNodedoubleClick = (e, val) => {
    setTitle(val.data.heading);
    setEditValue(val.data.content);
    setId(val.id);
    
  };
  const onNodeClick = (e, val) => {
    
    setSelectedNodeId(val.type);
    setSelectedValueOption(val.data.selectedOption); 
    let action = val.data.selectedOption;
   console.log(val.data.selectedOption); 
    console.log(val.type);
   
  
    if (action == 'edit') {
      handleEdit();
    } else if (action == 'delete') {
      handleNodeDelete(val.id);
    } else if (action == 'copy') {
      handleCopyNode();
    } else {
      console.log('No action selected');
    }

    
  };
  const handleChange = (e) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };
  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleEdit = () => {
    const res = nodes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          data: {
            ...item.data,
            p: {
              ...item.data.p,
              content: {
                variable1: variable1,
                conditionType: conditionType,
                variable2: variable2
              }
            }
          }
        };
      }
      return item;
    });
    setNodes(res);
    
    setVariable1("");
    SetCondition("");
    setVariable2("");
  };
  const handleTitleEdit = () => {
    const res = nodes.map((item) => {
      if (item.id === id) {
        item.data = {
          ...item.data,
          heading: title,
        };
      }
      return item;
    });
    setNodes(res);
    setTitle("");
  };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
  (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    console.log(type);

    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    let newData;
    if (type === "customNode") {
      newData = {
        heading: "Custom Node Title", // Set the title for custom nodes
        content: "Custom Node Content", // Set the content for custom nodes
      };
    } 
    else if (type === "textUpdater") {
      newData = {
        heading: "Title", // Set the title for custom nodes
        content: "tent", // Set the content for custom nodes
      };
    } else {
      newData = {
        label: `${type} node`,
      };
    }

    const newNode = {
      id: getId(),
      type,
      position,
      data: newData,
    };

    setNodes((nds) => nds.concat(newNode));
  },
  [reactFlowInstance]
);

const sendDataToBackend = () => {
  // Provided data
  const data = {
    nodes: [
      { id: 0, type: "button", body: "Hi user, Welcome to our hospital. How can we help you today?" },
      { id: 1, type: "button_element", body: "Book an appointment" },
      { id: 2, type: "button_element", body: "Know Clinic Address" },
      { id: 3, type: "button_element", body: "Learn about us" },
      { id: 4, type: "Input", body: "Please share your appointment date." },
      { id: 5, type: "string", body: "Our Clinic address is" },
      { id: 6, type: "string", body: "about us" },
      { id: 7, type: "Input", body: "What time?" },
      { id: 8, type: "Input", body: "Name of the patient?" },
      { id: 9, type: "button", body: "Great! choose doctor" },
      { id: 10, type: "button_element", body: "Dr. Ira" },
      { id: 11, type: "button_element", body: "Dr. John" },
      { id: 12, type: "string", body: "Congrats, appointment booked." },
      { id: 13, type: "button", body: "Do you want to book an appointment?" },
      { id: 14, type: "button_element", body: "Yes" },
      { id: 15, type: "button_element", body: "No" },
      { id: 16, type: "button_element", body: "Talk to AI" },
      { id: 17, type: "AI", body: "Sure, directing you to AI section." },
      { id: 18, type: "string", body: "Thank you! Have a great day. Please visit again!" }
    ],
    adjacencyList: [
      [1, 2, 3], [4], [5], [6], [7], [13], [13], [8], [9], [10, 11], [12], [12], [], [14, 15, 16], [4], [18], [17], [], []
    ]
  };

  // Log formatted data
  console.log('Formatted Nodes:', JSON.stringify(data.nodes));
  console.log('Adjacency List:', JSON.stringify(data.adjacencyList));

  // Headers for the POST request
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
  };

  // Send data to the backend endpoint
  axios.post('https://whatsappbotserver.azurewebsites.net/flowdata', data, { headers })
    .then((response) => {
      console.log(response.data);
      // Handle response if needed
    })
    .catch((error) => {
      console.error('Error sending data to backend:', error);
    });
};


  
  console.log('Nodes:', nodes); // Log nodes
  console.log('Edges:', edges);
  
  const handleNodeDelete = (nodeId) => {
    // Filter out the node with the given nodeId
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
  
    // Filter out the edges associated with the deleted node
    const updatedEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
  
    // Update the nodes and edges state
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }


  const handleCopyNode = () => {
    const selectedNode = nodes.find((node) => node.id === selectNodeId); 
    console.log("Selected Node ID:", selectNodeId);
    console.log("Nodes:", nodes);
    if (selectedNode) {
      const copiedNode = {
        ...selectedNode,
        id: generateUniqueId(), // Ensure a unique ID for the copied node
        position: {
          x: selectedNode.position.x + 100,
          y: selectedNode.position.y + 100
        }
      };
      setNodes(prevNodes => [...prevNodes, copiedNode]);
    }
  };
  



 
 
  return (
    <div className="dndwhatsappflow">
      <div className="updatenode">
       </div>
      <Sidebar />
      <button className="send-button" onClick={sendDataToBackend}>Send Data to Backend</button>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            elementsSelectable={true}
            onNodeDoubleClick={(e, val) => onNodedoubleClick(e, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={handleNodeDelete}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
            
          </ReactFlow>
        </div>  
      </ReactFlowProvider>
      
      
    </div>
    
  );
};

  

export default WhatsappFlow;
