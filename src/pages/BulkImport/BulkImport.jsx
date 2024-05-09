import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BulkImport.css';

const BulkImport = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [modelName, setModelName] = useState('');
  const [columns, setColumns] = useState([]);
  const [startrow, setStartRow] = useState(4);
  const [columnMappings, setColumnMappings] = useState({});
  const [requiredColumns, setRequiredColumns] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const validModelNames = ["Lead", "Contact", "Account", "calls", "meetings", "Opportunity"];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modelNameParam = urlParams.get('model');
    if (modelNameParam && validModelNames.includes(modelNameParam)) {
      setModelName(modelNameParam);
    }
  }, []);

  const handleUploadExcel = async () => {
    try {
      const formData = new FormData();
      formData.append('model_name', modelName); 
      formData.append('file', excelFile); 
      formData.append('column_mappings_json', JSON.stringify(columnMappings));

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
    setColumns([]);
    setSelectedValues({});
  };

  const getExcelColumnNames = () => {
    if (excelFile) {
      const formData = new FormData();
      formData.append('file', excelFile);
      formData.append('startrow', startrow);

      axios
        .post('https://backendcrmnurenai.azurewebsites.net/excel-column/', formData)
        .then((response) => {
          const columnNames = response.data.columns.map(column => {
            if (typeof column === 'string') {
              return column.toLowerCase();
            } else {
              return ''; // or any default value
            }
          });
          setColumns(columnNames);
          initializeColumnMappings(columnNames);
        })
        .catch((error) => {
          console.error('Error retrieving column names:', error);
        });
    }
  };

  const initializeColumnMappings = (columns) => {
    const mappings = {};
    const requiredCols = [];

    columns.forEach((column) => {
      const lowercaseColumn = column.toLowerCase();
      if (validColumn(lowercaseColumn)) {
        const columnName = getColumnMapping(lowercaseColumn);
        requiredCols.push(columnName);
        mappings[columnName] = '';
      }
    });
    setColumnMappings(mappings);
    setRequiredColumns(requiredCols);
  };

  const validColumn = (column) => {
    return column.includes('first_name') || 
           column.includes('last_name') || 
           column.includes('email') ||
           column.includes('phone') ||
           column.includes('createdby');
  };

  const getColumnMapping = (column) => {
    switch (column) {
      case 'first_name':
      case 'last_name':
      case 'email':
      case 'phone':
      case 'createdby':
        return column;
      default:
        return '';
    }
  };

  const handleEntityChange = (e, column) => {
    const { value } = e.target;
    setSelectedValues(prevState => ({
      ...prevState,
      [column]: value
    }));
    setColumnMappings(prevMappings => ({
      ...prevMappings,
      [column]: value
    }));
  };

  return (
    <div className="bulk-import-container">
      <div>
        <p className='modalName'>Model Name: {modelName}</p>
      </div>
      {excelFile && (
        <div>
          <p>Selected Excel file: {excelFile.name}</p>
          <button className="uploadexcel" onClick={handleUploadExcel}>Upload Excel</button>
        </div>
      )}

      <input type='file' accept='.xlsx,.xls' onChange={handleFileChange} />
      <div className='get'>
        <button className='getcolumn' onClick={getExcelColumnNames}>Get Columns</button>
      </div>
      {columns.length > 0 && (
        <div className='Entities'>
          <p>Map Columns to Entities:</p>
          <ul>
            {columns.map((column, index) => (
              <li key={index}>
                {column}
                <select value={selectedValues[column] || ''} onChange={(e) => handleEntityChange(e, column)}>
                  <option value=''> Select Entity</option>
                  <option value='first_name'>First Name</option>
                  <option value='last_name'>Last Name</option>
                  <option value='email'>Email</option>
                  <option value='phone'>Phone</option>
                  <option value='createdBy'>Created By</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      )}
      {requiredColumns.length > 0 && (
        <div>
          <p>Required Columns for Creating Contacts:</p>
          <ul className='creatingcontact'>
            {requiredColumns.map((column, index) => (
              <li className="creatingcontactList"key={index}>{column}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BulkImport;
