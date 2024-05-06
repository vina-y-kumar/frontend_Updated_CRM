import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './BulkImport.css';


const BulkImport = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [modelName, setModelName] = useState("");
  const [columns, setColumns] = useState([]);

  const [model, setModel] = useState('');

  const [columnMappingJson, setColumnMappingJson] = useState({});
  const [startrow, setStartRow] = useState(0);
  const validModelNames = ["Lead", "Contact", "Account", "calls", "meetings", "Opportunity"];
  const modelStructures = {
    Lead: {
      first_name: "",
      last_name: "",
      email: "",
      createdBy:"",
      assigned_to:"",
      // Add more fields as needed
    },
    Contact: {
      // Define fields for Contact model
      first_name: "",
      last_name: "",
      email: "",
      phone:"",
      createdBy:"", 
    },
    Account: {
      // Define fields for Account model
      Name:"",
      email:"",
      phone:""
    },
    // Define structures for other models
    meetings:{

      title: "",
      location: "",
      from_time: "",
      to_time: "",
      related_to: "",
      createdBy: "",
    },

    Opportunity:{
      name: "",
      createdBy: "",
      contacts: [''],
      closedOn:"",
      stage:"",
      probability :"",
      isActive:"",
    }
  };

  const handleGetColumns = async () => {
    try {
      const response = await axios.get('https://backendcrmnurenai.azurewebsites.net/excel-column/');
      setColumns(response.data.columns);
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };
  const handleUploadExcel = async () => {
    try {
      const formData = new FormData();
      formData.append('model', model);
      formData.append('file', excelFile);

      const response = await axios.post('http://127.0.0.1:8000/uploadexcel/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Excel uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading Excel:', error);
    }
  };

  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };
  useEffect(() => {
    // Parse URL to extract modal name
    const urlParams = new URLSearchParams(window.location.search);
    const modalNameParam = urlParams.get('model');
    if (modalNameParam) {
      setModelName(modalNameParam);
    }
  }, []);


  

  const getExcelColumnNames = () => {
    if (excelFile) {
      const formData = new FormData();
      formData.append('file', excelFile);
      formData.append('startrow', startrow);

      axios.post('http://127.0.0.1:8000/excel-column/', formData)
        .then((response) => {
          // Handle successful response
          console.log('Column names retrieved successfully:', response.data.columns);
          setColumns(response.data.columns);
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
      if (columns.length === 0) {
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
  const navigateToBulkImport = () => {
    history.push(`/bulk-import?model=${modelName}`);
  };


  return (
    <div>
      <div className='get'>
      <button onClick={getExcelColumnNames}>Get Columns</button>

      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
      </div>
      {excelFile && (
        <div>
          <p>Selected Excel file: {excelFile.name}</p>
          <button onClick={handleUploadExcel}>Upload Excel</button>
        </div>
      )}
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      {columns.length > 0 && (
        <div>
          <p>Columns:</p>
          <ul>
            {columns.map((column, index) => (
              <li key={index}>{column}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BulkImport;
