import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './dnd.css';
import initialNodes, { CustomNode } from "./nodes.jsx";
import initialEdges from "./edges.jsx";
import e from 'cors';


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const[editValue,setEditValue]=useState(nodes.data);
  const[id,setId]=useState();

  const onNodeClick=(e,val)=>{
    setEditValue(val.data.content);
    setId(val.id);
  }
  const handleChange=(e)=>{
    e.preventDefault();
    setEditValue(e.target.value);
  }
  const handleEdit=()=>{
    const res=nodes.map((item)=>{
      if(item.id===id){
        item.data={
          ...item.data,
          content:editValue
        }
      }
      return item;
    })
    setNodes(res);
    setEditValue('');
  }
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
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
    [reactFlowInstance],
  );
  const nodeTypes = {
    customNode: CustomNode,
  };
  return (
    <div className="dndflow">
      <div className="updatenode">
        
        <input type="text" placeholder='Update Nodes' value={editValue} onChange={handleChange}/><br/>
        <button style={{marginLeft:"35px"}} className='btn btn-primary' onClick={handleEdit} >Update:</button>
      </div>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={(e,val)=>onNodeClick(e,val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <MiniMap/>
            <Background/>
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
