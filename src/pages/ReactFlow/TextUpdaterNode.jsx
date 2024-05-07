
import { Handle, Position } from 'reactflow';
import React, { useState, useCallback } from 'react';
import './customnode.css';
const handleStyle = { left: 0 };

export const CustomNode = ({ data, handleNodeDelete }) => {
  return (
    <div
      style={{
        width: "200px",
        border: "2px solid #ddd",
        textAlign: "center",
        borderRadius: "5px",
        padding: "0px",
      }}
    >
      <div style={{ backgroundColor: data.headbg, padding: "5px", color: 'white' }}>
        <h3>{data.heading}</h3>
      </div>
      <div style={{ padding: "10px", fontWeight: "500", backgroundColor: "white" }}>
        <p>{data.content}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id={data.id} />
      <Handle type="target" position={Position.Top} id={data.id} />
      <Handle type="target" position={Position.Top} id={data.id} />
    </div>
  );
};

export const TextUpdaterNode = ({ data, isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div style={{ backgroundColor:'pink'}}>
    <h3 style={{ backgroundColor:'#feedcf',fontSize: '18px', color: 'blue' }}>{data.heading}</h3>
    <label htmlFor="text" style={{ fontSize: '14px', color: 'black' }}>Text:</label>
    <input id="text" name="text" onChange={onChange} className="nodrag" style={{ width: '100%', padding: '5px' }} />
    <p style={{ fontSize: '16px', color: 'green' }}>{data.content}</p>
  </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
};


export const ButtonNode = ({ isConnectable }) => {
  const [buttons, setButtons] = useState([]);

  const handleAddButton = useCallback(() => {
    const newButtonId = buttons.length + 1; // Generate unique ID for the button
    const newButton = { id: newButtonId, label: `Button ${newButtonId}` };
    setButtons([...buttons, newButton]);
  }, [buttons]);

  const handleButtonClick = useCallback((buttonId) => {
    console.log(`Button ${buttonId} clicked`);
    // Add your button click logic here
  }, []);

  return (
    <div className="button-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <p>Button Node</p>
        <div>
          {buttons.map((button) => (
            <div key={button.id}>
              <button onClick={() => handleButtonClick(button.id)}>{button.label}</button>
              <Handle type="source" position={Position.Bottom} id={`button-${button.id}`} style={handleStyle} isConnectable={isConnectable} />
            </div>
          ))}
          <button onClick={handleAddButton}>+</button> {/* Button to add new buttons */}
        </div>
      </div>
      {buttons.map((button) => (
            <Handle type="source" position={Position.Right} id={`button${button.id}`} style={handleStyle} isConnectable={isConnectable} />
          ))}
      <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
};

export const SendMessage = ({ isConnectable }) => {
 
 return (<div>
  <h1 style={{backgroundColor:'red',height:'30px',fontSize:'18px',textAlign:'center',borderRadius:'5px'}}>Send Message</h1>
  <div>
  <button className='send-message-button'>Message</button>
  <button className='send-message-button'>Image</button>
  <button className='send-message-button'>Document</button>
  <br /> 
  <button className='send-message-button'>Audio</button>
  <button className='send-message-button'>Video</button>
  </div>
  <Handle type="source" position={Position.Right} id="a" style={{}} isConnectable={isConnectable} />
  </div>);
   
};
export const AskQuestion = ({ isConnectable }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [askbutton,setaskButtons]=useState([]);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handleAddButton = useCallback(() => {
    if (askbutton.length < 3) {
      const newButtonId = askbutton.length + 1; // Generate unique ID for the button
      const newButton = { id: newButtonId, label: `Button ${newButtonId}` };
      setaskButtons([...askbutton, newButton]);
    }
  }, [askbutton]);

  return (<div>
    <h1 style={{backgroundColor:'orange',height:'30px',fontSize:'18px',textAlign:'center',borderRadius:'5px'}}>Ask Question</h1>
    
  
      {selectedOption === null && (
        <div>
            <h3>Choose Type</h3>
          <button className='ask-question-button' onClick={() => handleOptionClick('buttons')}>Buttons</button>
          <button className='ask-question-button' onClick={() => handleOptionClick('lists')}>Lists</button>
          <button className='ask-question-button' onClick={() => handleOptionClick('variables')}>Variables</button>
        </div>
      )}
      {selectedOption === 'buttons' && (
        <div>
          {/* Render div for buttons option */}
          <p>Here is a space for you to ask a question</p>
          <div>
          {askbutton.map((button) => (
            <div key={button.id}>
              <button className='ask-question-option-button'>{button.label}</button>
              <Handle type="source" position={Position.Bottom} id={`button-${button.id}`}  isConnectable={isConnectable} />
              
            </div>
          ))}
          {askbutton.length < 3 && (
  <button onClick={handleAddButton}>+</button>
)}
        </div>
          
        </div>
      )}
      {selectedOption === 'lists' && (
        <div>
          {/* Render div for lists option */}
          <p>Here is a space for you to ask a question</p>
    <ul>
    <li style={{backgroundColor: '#feedcf',borderColor: 'blue',borderWidth: '1px',borderRadius: '5px',padding: '10px',margin: '4px'}}>Choice 1</li>
      <li style={{backgroundColor: '#feedcf',borderColor: 'blue',borderWidth: '1px',borderRadius: '5px',padding: '10px',margin: '4px'}}>Choice 2</li>
      <li style={{backgroundColor: '#feedcf',borderColor: 'blue',borderWidth: '1px',borderRadius: '5px',padding: '10px',margin: '4px'}}>Choice 3</li>
      <li style={{backgroundColor: '#feedcf',borderColor: 'blue',borderWidth: '1px',borderRadius: '5px',padding: '10px',margin: '4px'}}>Choice 4</li>
    </ul>
        </div>
      )}
      {selectedOption === 'variables' && (
        <div>
          {/* Render div for variables option */}
          <p>Variables content</p>
        </div>
      )}

   
    </div>);
  
};
export const SetCondition = ({ isConnectable }) => {
  return (<div>
    <h1 style={{backgroundColor:'rgb(103, 184, 255)',height:'30px',fontSize:'18px',textAlign:'center',borderRadius:'5px'}}>Set Condition</h1>
    <p>Put a Condition</p>
    
    </div>);
};