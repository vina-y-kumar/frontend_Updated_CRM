import React, { useState } from 'react';
import axios from 'axios';
import './BulkImport.css';

const BulkImport = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [modelName, setModelName] = useState("");
  const [columnNames, setColumnNames] = useState([]);
  const [columnMappingJson, setColumnMappingJson] = useState({});
  const [startrow, setStartRow] = useState(4);
  const validModelNames = ["Lead", "Contact", "Account", "calls", "meetings", "Opportunity"];
  const modelStructures = {
    Lead: {
      first_name: "",
      last_name: "",
      email: "",
      // Add more fields as needed
    },
    Contact: {
      // Define fields for Contact model
    },
    Account: {
      // Define fields for Account model
    },
    // Define structures for other models
  };

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
    // Reset column names and mapping when a new file is selected
    setColumnNames([]);
    setColumnMappingJson({});
  };

  const getExcelColumnNames = () => {
    if (excelFile) {
      const formData = new FormData();
      formData.append('file', excelFile);
      formData.append('startrow', startrow);

      axios.post('http://127.0.0.1:8000/excel-column/', formData)
        .then((response) => {
          // Handle successful response
          console.log('Column names retrieved successfully:', response.data.columns);
          setColumnNames(response.data.columns);
        })
        .catch((error) => {
          // Handle error
          console.error('Error retrieving column names:', error);
        });
    }
  };

  const handleModelNameChange = (columnName, modelName) => {
    const newMapping = { ...columnMappingJson };
    newMapping[columnName] = modelStructures[modelName];
    setColumnMappingJson(newMapping);
  };

  const handleUpload = () => {
    if (excelFile && modelName) {
      // Check if column names are retrieved before uploading
      if (columnNames.length === 0) {
        console.error('Column names are not retrieved yet');
        return;
      }

      const formData = new FormData();
      formData.append('file', excelFile);
      formData.append('column_mappings_json', JSON.stringify(columnMappingJson));
      formData.append('model_name', modelName);

      axios.post('http://127.0.0.1:8000/uploadexcel/', formData)
        .then((response) => {
          // Handle successful response
          console.log('Data imported successfully:', response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error importing data:', error);
        });
    }
  };

  return (
    <div className="bulk-import-container">
      <div className="bulk-import-content">
        <h1 className='BulkImport'>Bulk Import</h1>
        <div>
          <input type="file" onChange={handleFileChange} className="bulk-import-input" id="file-input" />
          <button onClick={getExcelColumnNames} className="bulk-import-button">Get Column Names</button>

          {modelName ? (
            <button onClick={handleUpload} className="bulk-import-button">Upload</button>
          ) : (
            <select value={modelName} onChange={(e) => setModelName(e.target.value)} className="bulk-import-select">
              <option value="">Select Model</option>
              {validModelNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          )}
        </div>
        <div>
          <h2 className="mapping">Column Mapping:</h2>
          <ul>
            {columnNames.map((columnName, index) => (
              <li key={index}>
                {columnName}
                <select value={columnMappingJson[columnName]} onChange={(e) => handleModelNameChange(columnName, e.target.value)}>
                  <option value="">Select Model Field</option>
                  {Object.keys(modelStructures[modelName]).map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BulkImport;
