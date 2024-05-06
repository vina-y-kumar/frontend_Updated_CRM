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

import axios from 'axios';
import './dnd.css';
import e from 'cors';

const lastNode = initialNodes[initialNodes.length - 1];
import Sidebar from "./Sidebar";

import "./dnd.css";
import initialNodes, { CustomNode } from "./nodes.jsx";
import initialEdges from "./edges.jsx";

// Extract the id property from the last node
let id = parseInt(lastNode.id) +1;
//let id = 10+1;

const getId = () => `${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [editValue, setEditValue] = useState(nodes.data);
  const [title, setTitle] = useState(nodes.data);
  const [id, setId] = useState();

  const onNodeClick = (e, val) => {
    setEditValue(val.data.content);
    setId(val.id);
  };
  const onTitleClick = (e, val) => {
    setTitle(val.data.heading);
    setId(val.id);
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
        item.data = {
          ...item.data,
          content: editValue,
        };
      }
      return item;
    });
    setNodes(res);
    setEditValue("");
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

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const sendDataToBackend = () => {
    // Transform nodes to the required format
    const formattedNodes = nodes.map((node) => ({
      id: parseInt(node.id), // Convert id to integer
      type: node.type,
      body: node.data.label,
    }));
  
    // Transform edges to the adjacency list format
    const adjacencyList = edges.reduce((adjList, edge) => {
      const { source, target } = edge;
      if (!adjList[source]) {
        adjList[parseInt(source)] = [];
      }
      adjList[parseInt(source)].push(parseInt(target));
      return adjList;
    }, {});
    const adjacencyListAsList = Object.values(adjacencyList).map(targets => [...targets]);
  
    // Log adjacency list and nodes
    console.log('Formatted Nodes:', JSON.stringify(formattedNodes));
    console.log('Adjacency List:', JSON.stringify(adjacencyListAsList ));
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    };
    // Send data to the backend endpoint
    axios.post('https://69af-14-142-75-54.ngrok-free.app/flowdata', {
      nodes: formattedNodes,
      adjacencyList: adjacencyList,
    } ,{ headers })
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
    const updatedElements = nodes.filter((element) => element.id !== nodeId);
    setNodes(updatedElements);
  };
  const nodeTypes = {
    customNode: CustomNode,
  };
  return (
    <div className="dndflow">
      <div className="updatenode">
        <input
          type="text"
          placeholder="Update Title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <button
          style={{ marginLeft: "35px" }}
          className="btn btn-primary"
          onClick={handleTitleEdit}
        >
          Update Title
        </button>
        <br />
        <input
          type="text"
          placeholder="Update Content"
          value={editValue}
          onChange={handleChange}
        />
        <br />
        <button
          style={{ marginLeft: "35px" }}
          className="btn btn-primary"
          onClick={handleEdit}
        >
          Update Data
        </button>
      </div>
      <button onClick={sendDataToBackend}>Send Data to Backend</button>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            elementsSelectable={true}
            onNodeDragStart={(e, val) => onTitleClick(e, val)}
            onNodeDragStop={(e, val) => onNodeClick(e, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
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
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
