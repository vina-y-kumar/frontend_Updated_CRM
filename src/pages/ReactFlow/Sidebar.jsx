import React from 'react';
import { CustomNode } from './nodes';


export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  

  return (
    <aside>
      <h2>Add Nodes</h2>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Starting Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Middle Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Ending Node
      </div>
      <div className="dndnode custom" onDragStart={(event) => onDragStart(event, 'customNode')} draggable>
        Custom Node
      </div>
    </aside>
  );
};