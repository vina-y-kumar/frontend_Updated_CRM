
import { Handle, Position } from 'reactflow';
import React, { useState, useCallback } from 'react';
import './customnode.css';
const handleStyle = { left: 0 };

export const CustomNode = ({ data, handleNodeDelete, onNodeClick }) => {
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [contentHistory, setContentHistory] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // Array to store uploaded images

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setContentHistory((prevContent) => [...prevContent, option]);
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImages((prevImages) => [...prevImages, e.target.result]);
    };

    reader.readAsDataURL(imageFile);
  };

  const renderContent = (content) => {
    switch (content) {
      case 'message':
        return (
          <div key="message">
            <input type="text" placeholder="Enter your message..." />
            <button>Send</button>
          </div>
        );
      case 'image':
        return (
          <div key="image">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button>Upload Image</button>
            {uploadedImages.length > 0 && (
              <div>
                {uploadedImages.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt="Uploaded Image" />
                ))}
              </div>
            )}
          </div>
        );
      case 'document':
        return (
          <div key="document">
            <input type="file" accept=".pdf,.docx,.xlsx" />
            <button>Upload Document</button>
          </div>
        );
      case 'audio':
        return (
          <div key="audio">
            <input type="file" accept="audio/*" />
            <button>Upload Audio</button>
          </div>
        );
      case 'video':
        return (
          <div key="video">
            <input type="file" accept="video/*" />
            <button>Upload Video</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 style={{ backgroundColor: 'red', height: '30px', fontSize: '18px', textAlign: 'center', borderRadius: '5px' }}>
        Send Message
      </h1>
      <div>
        <button className="send-message-button" onClick={() => handleOptionClick('message')}>
          Message
        </button>
        <button className="send-message-button" onClick={() => handleOptionClick('image')}>
          Image
        </button>
        <button className="send-message-button" onClick={() => handleOptionClick('document')}>
          Document
        </button>
        <br />
        <button className="send-message-button" onClick={() => handleOptionClick('audio')}>
          Audio
        </button>
        <button className="send-message-button" onClick={() => handleOptionClick('video')}>
          Video
        </button>
      </div>
      {contentHistory.map((content) => renderContent(content))}
      <Handle type="source" position={Position.Right} id="a" style={{}} isConnectable={isConnectable} />
    </div>
  );
};

const AskQuestionPopup = ({ onSave, onCancel }) => {
  const [question, setQuestion] = useState('');
  const [answerVariants, setAnswerVariants] = useState(['']);

  const handleAddAnswer = () => {
    setAnswerVariants([...answerVariants, '']);
  };

  const handleAnswerChange = (index, value) => {
    const updatedVariants = [...answerVariants];
    updatedVariants[index] = value;
    setAnswerVariants(updatedVariants);
  };

  const handleSave = () => {
    onSave({ question, answerVariants });
    setQuestion('');
    setAnswerVariants(['']);
  };

  return (
    <div className="askQuestionpopup">
      <h2>Ask a Question</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <h3>Answer Variants:</h3>
      {answerVariants.map((variant, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Enter answer variant ${index + 1}`}
          value={variant}
          onChange={(e) => handleAnswerChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleAddAnswer}>Add Answer Variant</button>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export const AskQuestion = ({ data, isConnectable }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [askbutton,setaskButtons]=useState([]);
  const [selectedValue, setSelectedValue] = useState(data.selectedOption || ''); 
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState();
  const [editedOptions, setEditedOptions] = useState()
  const [showPopup, setShowPopup] = useState(false);
  
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
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    // Update data with the selected value
    data.selectedOption = event.target.value;
    setIsOpen(false); 
    if (event.target.value === "edit") {
      setIsEditing(true); // Set isEditing to true when "Edit" is selected
      setShowPopup(true); // Show the popup when "Edit" is selected
    } else {
      setShowPopup(false); // Hide the popup for other options
    }
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedOptions];
    newOptions[index] = value;
    setEditedOptions(newOptions);
  };

  const addOption = () => {
    setEditedOptions([...editedOptions, '']);
  };

  const deleteOption = (index) => {
    const newOptions = [...editedOptions];
    newOptions.splice(index, 1);
    setEditedOptions(newOptions);
  };

  const handleSaveQuestion = (data) => {
    // Handle saving the question data here
    console.log('Question:', data.question);
    console.log('Answer Variants:', data.answerVariants);
    // Optionally, close the popup
    setShowPopup(false);
  };

  const handleCancel = () => {
    // Handle canceling the operation
    setShowPopup(false);
  };

  

  return (<div>
     <div className="dropdown" style={{ display: 'flex', alignItems:'center'}}>
    <h1 style={{backgroundColor:'orange',height:'30px',fontSize:'18px',textAlign:'center',borderRadius:'5px'}}>Ask Question</h1>
    <p>{data.p}</p>
      <div className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="dots"></div>
        <div className="dots"></div>
        <div className="dots"></div>
      </div>
      {isOpen && (
      <select value={selectedValue} onChange={handleSelectChange} >
      <option value=""></option>
        <option value="edit">Edit</option>
        <option value="copy">Copy</option>
        <option value="delete">Delete</option> 
      </select>
      )
    }
     {selectedValue === "edit" && isEditing && showPopup && (
  <AskQuestionPopup
    onSave={handleSaveQuestion}
    onCancel={handleCancel}
  />
)}
      
      </div>
      
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
const Popup = ({ variable1, handleVariable1Change, conditionType, handleConditionTypeChange, variable2, handleVariable2Change, handleEditSave, handleEditCancel }) => (
  <div className="setCondition-popup">
    <div className="setCondition-popup-content">
      <div className="input-group">
        <label htmlFor="variable1">Variable 1:</label>
        <input id="variable1" type="text" value={variable1} onChange={handleVariable1Change} />
      </div>
      <div className="input-group">
        <label htmlFor="conditionType">Condition Type:</label>
        <select id="conditionType" value={conditionType} onChange={handleConditionTypeChange}>
          <option value="Equal to">Equal to</option>
          <option value="Not Equal To">Not Equal To</option>
          <option value="Contains">Contains</option>
          <option value="Does not contain">Does not contain</option>
          <option value="Starts With">Starts With</option>
          <option value="Does not start with">Does not start with</option>
          <option value="Greater Than">Greater Than</option>
          <option value="Less Than">Less Than</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="variable2">Variable 2:</label>
        <input id="variable2" type="text" value={variable2} onChange={handleVariable2Change} />
      </div>
      <button className= " save" onClick={handleEditSave}>Save</button>
      <button className='cancel' onClick={handleEditCancel}>Cancel</button>
    </div>
  </div>
);
export const SetCondition = ({ data, isConnectable }) => {
  const [variable1, setVariable1] = useState('');
  const [conditionType, setConditionType] = useState('');
  const [variable2, setVariable2] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [selectedValue, setSelectedValue] = useState(data.selectedOption || ''); 
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleVariable1Change = (e) => {
    setVariable1(e.target.value);
  };

  const handleConditionTypeChange = (e) => {
    setConditionType(e.target.value);
  };

  const handleVariable2Change = (e) => {
    setVariable2(e.target.value);
    setIsValid(validateCondition(variable1, conditionType, e.target.value));
  };

  const validateCondition = (var1, condition, var2) => {
    // Convert variables to lowercase for case-insensitive comparison
    const value1 = var1.toLowerCase();
    const value2 = var2.toLowerCase();
  
    switch (condition) {
      case 'Equal to':
        return value1 === value2;
      case 'Not Equal To':
        return value1 !== value2;
      case 'Contains':
        return value1.includes(value2);
      
      default:
        return false; 
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    // Update data with the selected value
    data.selectedOption = event.target.value;
    setIsOpen(false); 
    if (event.target.value === "edit") {
      handleEditClick(); 
    }
    
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    setIsEditing(false);
    // Here you can perform any action you want after saving the edited values
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    // Here you can handle canceling the edit, such as resetting the values to their original state
  };

  return (<div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', backgroundColor: 'rgb(103, 184, 255)' }}>
    <h1 style={{ backgroundColor: 'rgb(103, 184, 255)', height: '30px', fontSize: '18px', textAlign: 'center', borderRadius: '5px' }}>Set Condition</h1>
      <p>{data.p}</p>
      <div className="dropdown">
      <div className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="dots"></div>
        <div className="dots"></div>
        <div className="dots"></div>
      </div>
      {isOpen && (
      <select value={selectedValue} onChange={handleSelectChange} >
      <option value=""></option>
        <option value="edit">Edit</option>
        <option value="copy">Copy</option>
        <option value="delete">Delete</option> 
      </select>
      )
    }
      </div>
    </div>
    <p>Put a Condition</p> 
    <>
      {selectedValue === "edit" && isEditing && (
        <Popup
          variable1={variable1}
          handleVariable1Change={handleVariable1Change}
          conditionType={conditionType}
          handleConditionTypeChange={handleConditionTypeChange}
          variable2={variable2}
          handleVariable2Change={handleVariable2Change}
          handleEditSave={handleEditSave}
          handleEditCancel={handleEditCancel}
        />
      )}
    </>

    
      <Handle type="source" position={Position.Top} id={`button`} style={{ backgroundColor: isValid ? 'green' : 'red' }} />
      <Handle type="target" position={Position.Bottom} id={`button`} style={{ backgroundColor: isValid ? 'red' : 'green' }} />
    
    </div>);
}; 
