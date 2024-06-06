import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './productinfo.css';
import uploadFileToAzure from "../../azureUpload.jsx";

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

export const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const tenantId = getTenantIdFromUrl();

  useEffect(() => {
    // Fetch product data by ID from an API or state
    // For now, using dummy data
    const productData = {
      id,
      name: `Product ${id}`,
      code: `00${id}`,
      active: id % 2 === 0 ? 'No' : 'Yes',
      owner: `Owner ${id}`,
      description: `Description for product ${id}`,
    };

    setProduct(productData);
  }, [id]);

  const handleBackClick = () => {
    navigate(`/${tenantId}/product`); // Assuming the route for the product page is '/products'
  };

  const handlefileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    
    if (selectedFile) {
      setFile(selectedFile);
      console.log('File state set:', selectedFile);
  
      try {
        // Upload the file to Azure Blob Storage
        console.log('Uploading file to Azure Blob Storage...');
      const fileUrl = await uploadFileToAzure(selectedFile);
        console.log('File uploaded to Azure, URL:', fileUrl);
  
        // Send a POST request to your backend with the file URL
        console.log('Sending POST request to backend...');
        const response = await axios.post('http://127.0.0.1:8000/documents/', {
          name: selectedFile.name,
          document_type: selectedFile.type,
          description: 'Your file description',
          file_url: fileUrl,
          entity_type: 'your_entity_type',
          entity_id: 'your_entity_id',
          tenant: tenantId,
        });
        console.log('POST request successful, response:', response.data);
  
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  }

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateSmiley2 = (color) => (
    <div className="colored-circle2" style={{ backgroundColor: color, color:"white" }}>
      <span className="material-icons" style={{ fontSize: "60px", fontFamily: "'Material Symbols Outlined'" }}>person</span>
    </div>
  );


  return (
    <div className="productpageinfo">
    <div className="product-info-page">
      <div className="product-info-sidebar">
        <button className="productinfo-back-button" onClick={handleBackClick}>Back</button>
        <h2>Related List</h2>
        <ul>
          <li>Notes</li>
          <li>Cadences</li>
          <li>Attachments</li>
          <li>Deals</li>
          <li>Emails</li>
          <li>Open Activities</li>
          <li>Closed Activities</li>
          <li>Inviting meetings</li>
          <li>Quotes</li>
          <li>Sales Orders</li>
          <li>Invoices</li>
          <li>Purchase Orders</li>
          <li>Cases</li>
          <li>Social</li>
        </ul>
      </div>
      <div className="product-info-content">
        <h1>Product Details</h1>
        <h2 className="owner1">{ProductInfo.owner}</h2>
        <h2 className="owner3">{ProductInfo.description}</h2>
        <div className="product-photo">
          {generateSmiley2(generateRandomColor())}
        </div>
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <a href={product.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="button-group">
          <div>
            <button className="button-overview">Overview</button>
          </div>
          <div>
            <button className="button-timeline">Timeline</button>
          </div>
        </div>
        <div className="product-details-box">
          <h2>Product Details</h2>
          <div className="product-detail-row">
            <span className="product-detail-label">Product Category:</span>
            <span className="product-detail-value">{product.category}</span>
          </div>
          <div className="product-detail-row">
            <span className="product-detail-label">Unit Price:</span>
            <span className="product-detail-value">${product.unitPrice}</span>
          </div>
          <div className="product-detail-row">
            <span className="product-detail-label">Vendor Name:</span>
            <span className="product-detail-value">{product.vendor}</span>
          </div>
          <div className="product-detail-row">
            <span className="product-detail-label">Quantity Ordered:</span>
            <span className="product-detail-value">{product.quantityOrdered}</span>
          </div>
          <div className="product-detail-row">
            <span className="product-detail-label">Quantity In Stock:</span>
            <span className="product-detail-value">{product.quantityInStock}</span>
          </div>
        </div>
        <div className="vendor-details-box">
        <h2>Vendor Details</h2>
        <div className="product-vendordetail-row">
          <span className="product-vendor-detail-label">Vendor Name:</span>
          <span className="product-vendor-detail-value">{product.vendor}</span>
        </div>
      </div>
      <div className="product-information-box">
        <h2>Product Information</h2>
        <div className="information-product">
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Product Owner:</span>
          <span className="product-informationdetail-value">{product.owner}</span>
        </div>
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Product Name:</span>
          <span className="product-informationdetail-value">{product.name}</span>
        </div>
        </div>
        <div className="information-product">
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Product Code:</span>
          <span className="product-informationdetail-value">{product.code}</span>
        </div>
        <div className="product-informationdetail-row">
        <span className="product-informationdetail-label">Vendor Name:</span>
          <span className="product-informationdetail-label">{product.vendor}</span>
        </div>
        </div>
        <div className="information-product">
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Product Active:</span>
          <span className="product-informationdetail-value">{product.active}</span>
        </div>
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Manufacturer:</span>
          <span className="product-informationdetail-value">{product.manufacturer}</span>
        </div>
        </div>
        <div className="information-product">
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Sale Start Date:</span>
          <span className="product-informationdetail-value">{product.saleStartDate}</span>
        </div>
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Sale End Date:</span>
          <span className="product-informationdetail-value">{product.saleEndDate}</span>
        </div>
        </div>
        <div className="information-product">
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Support Start Date:</span>
          <span className="product-informationdetail-value">{product.supportStartDate}</span>
        </div>
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Support End Date:</span>
          <span className="product-informationdetail-value">{product.supportEndDate}</span>
        </div>
        </div>
        <div className="information-product">
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Modified By:</span>
          <span className="product-informationdetail-value">{product.modifiedBy}</span>
        </div>
        <div className="product-informationdetail-row">
          <span className="product-informationdetail-label">Created By:</span>
          <span className="product-informationdetail-value">{product.createdBy}</span>
        </div>
        </div>
      </div>
      <div className="stock-information-box">
        <h2>Stock Information</h2>
        <div className="stock-product">
        <div className="stockdetail-row">
          <span className="stockdetail-label">Usage Unit:</span>
          <span className="stockdetail-value">{product.usageUnit}</span>
        </div>
        <div className="stockdetail-row">
          <span className="stockdetail-label">Reorder Level:</span>
          <span className="stockdetail-value">{product.reorderLevel}</span>
        </div>
        </div>
        <div className="stock-product">
        <div className="stockdetail-row">
          <span className="stockdetail-label">Quantity of Stock:</span>
          <span className="stockdetail-value">{product.quantityInStock}</span>
        </div>
        <div className="stockdetail-row">
          <span className="stockdetail-label">Quantity Ordered:</span>
          <span className="stockdetail-value">{product.quantityOrdered}</span>
        </div>
        </div>
        <div className="stock-product">
        <div className="stockdetail-row">
          <span className="stockdetail-label">Handler:</span>
          <span className="stockdetail-value">{product.handler}</span>
        </div>
        <div className="stockdetail-row">
          <span className="stockdetail-label">Quantity in Demand:</span>
          <span className="stockdetail-value">{product.quantityInDemand}</span>
        </div>
        </div>
        <div className="stockdetail-row">
          <span className="stockdetail-label">Description:</span>
          <span className="stockdetail-value">{product.description}</span>
        </div>
      </div>
      <div className="product-notes-box">
        <h2>Notes</h2>
        <textarea className="product-notes-textarea" placeholder="Enter your notes here..."></textarea>
      </div>
      <div className="product-attachment-section" id='Attachments'>
      <div className="product-attachments">Attachments</div>
      <div className="product-attachment-upload">
        <input type="file" id="attachment-input" onChange={handleFileChange} style={{ display: 'none' }} />
        <label htmlFor="attachment-input">
          <div className="product-clicktoupload">clicktoupload</div>
        </label>
      </div>
    </div>
    <div className="product-price-books-box">
        <h2>Price Books</h2>
        <div className="product-new-deals-button">
          <button className="product-button-new-deals">+New Deals</button>
        </div>
      </div>
      <div className="product-price-books-box">
        <h2>Open Actitivities</h2>
        <div className="product-new-deals-button">
          <button className="product-button-new-deals">+New Deals</button>
        </div>
      </div>
      <div className="product-price-books-box">
        <h2>Closed Activities</h2>
        <div className="product-new-deals-button">
          <button className="product-button-new-deals">+New Deals</button>
        </div>
      </div>
      <div className="product-price-books-box">
        <h2>Cases</h2>
        <div className="product-new-deals-button">
          <button className="product-button-new-deals">+New Deals</button>
        </div>
      </div>
      <div className="product-price-books-box">
        <h2>Solutions</h2>
        <div className="product-new-deals-button">
          <button className="product-button-new-deals">+New Deals</button>
        </div>
      </div>
      </div>
    </div>
  </div>  
  );
};

export default ProductInfo;