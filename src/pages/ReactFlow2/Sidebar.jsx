import React from 'react';
import './sidebar.css';
import { useMemo } from 'react';
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <h2>Add Nodes</h2>
     {/*  <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Starting Node
      </div>*/}
    {/*   <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Middle Node
      </div>*/}
    {/* }  <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Ending Node
    </div>*/}
    {/*   <div className="dndnode custom Button" onDragStart={(event) => onDragStart(event, 'buttonNode')} draggable>
       Buttons Node
      </div>*/}
    {/*   <div className="dndnode custom AI" onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
       AI Node
      </div>*/}
      <div className="Send-Message-Node" onDragStart={(event) => onDragStart(event, 'sendMessage')} draggable>
        <h3>Send a Message</h3>
        <p>Sends text, images, lists, documents, audio</p>
      </div>
       <div className="Ask-Question-Node" onDragStart={(event) => onDragStart(event, 'askQuestion')} draggable>
        <h3>Ask a Question</h3>
        <p>Use me to ask questions from clients. We can store data and use it for later processing</p>
      </div>
       <div className="Condition-Node" onDragStart={(event) => onDragStart(event, 'setCondition')} draggable>
       <h3>Set a Condition</h3>
       <p>Make creative user journeys by giving them a choice</p>
      </div>
      <div className="Ice-Breaker-Node" onDragStart={(event) => onDragStart(event, 'iceBreaker')} draggable>
       <h3>Ice Breakers</h3>
       <p>Make creative user journeys by giving them a choice</p>
      </div>
      <div className="Persistent-Menu-Node" onDragStart={(event) => onDragStart(event, 'persistentMenu')} draggable>
       <h3>Persistent Menu</h3>
       <p>Make creative user journeys by giving them a choice</p>
      </div>
      <div className="Generic-Template-Node" onDragStart={(event) => onDragStart(event, 'genericTemplate')} draggable>
       <h3>Generic Template</h3>
       <p>Make creative user journeys</p>
      </div>
    </aside>
  );
};
