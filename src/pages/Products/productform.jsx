import React, { useState } from 'react';
import './productform.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productImage: '',
    productOwner: '',
    productCode: '',
    productActive: false,
    productCategory: '',
    salesEndDate: '',
    supportEndDate: '',
    productName: '',
    vendorName: '',
    manufacturer: '',
    salesStartDate: '',
    supportStartDate: '',
    unitPrice: '',
    tax: '',
    commissionRate: '',
    usageUnit: '',
    quantityInStock: '',
    handler: '',
    qtyOrdered: '',
    reorderLevel: '',
    quantityInDemand: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
      <div className="product-forms-page">
      <h1 className="product-form-heading">Create Product</h1>
      <div className="form-buttons-container">
        <button type="submit" className="product-form-button product-form-button-save">Save</button>
        <button type="button" className="product-form-button product-form-button-secondary">Save and New</button>
        <button type="button" className="product-form-button product-form-button-secondary">Cancel</button>
      </div>
      <form className="product-form-container" onSubmit={handleSubmit}>
      <h2 className="product-form-section-heading">Product Image</h2>
      <div className="product-header">
      <input type="file" name="productImage" className="product-form-input" onChange={handleChange} />
      </div>
      <div className="product-form-heading1">
      <h2 className="product-form-information-heading">Product Information</h2>
      </div>
      <div className="product-forms">
      <div className="form-group col-md-6 ">
                                <label htmlFor="Name" className='product_anual_ownership'>Product Owner:</label>
                                <input
                                  type="text"
                                  className="form-control_account1"
                                  id="Name"
                                  name="Name"
                                  value={formData.productOwner}
                                  onChange={handleChange}
                                  placeholder="Enter Account Owner"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="productname" className='product_anual_name'>Product Name:</label>
                                <input
                                  type="text"
                                  className="form-control_email"
                                  id="product name"
                                  name="product name"
                                  value={formData.productName}
                                  onChange={handleChange}
                                  placeholder="Enter product name"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="ProductCode" className='product_code'>Product Code:</label>
                                <input
                                  type="text"
                                  className="form-control_product-code"
                                  id="ProductCode"
                                  name="ProducrCode"
                                  value={formData.productCode}
                                  onChange={handleChange}
                                  placeholder="Enter Product Code"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="VendorName" className='vendor-name'>Vendor Name:</label>
                                <input
                                  type="text"
                                  className="form-control_vendor-name"
                                  id="VendorName"
                                  name="VendorName"
                                  value={formData.vendorName}
                                  onChange={handleChange}
                                  placeholder="Enter Vendor Name"
                                />
                              </div>
                        <div className="form-group col-md-6">
                                <label htmlFor="ProductActive" className='product-active'>Product Active:</label>
                                <input
                                  type="checkbox"
                                  className="form-control_product-active"
                                  id="ProductActive"
                                  name="ProductActive"
                                  checked={formData.productActive}
                                  onChange={handleChange}
                                  placeholder="Enter Product Active"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="Manufacturer" className='manufacturer'>Manufacturer:</label>
                                <input
                                  type="text"
                                  className="form-control_manufacturer"
                                  id="Manufacturer"
                                  name="Manufacturer"
                                  value={formData.manufacturer}
                                  onChange={handleChange}
                                  placeholder="Enter Manufacturer"
                                />
                              </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="ProductCategory"className='product_category'>Product Category: </label>
                                <input
                                  type="text"
                                  className="form-control_product-category"
                                  id="ProductCategory"
                                  name="ProductCategory"
                                  value={formData.productCategory}
                                  onChange={handleChange}
                                  placeholder="Enter product category"
                                />
                                </div>
                      <div className="form-group col-md-6">
                                <label htmlFor="SalesStartDate" className='SalesStartDate'>Sales Start Date:</label>
                                <input
                                  type="date"
                                  className="form-control_salesstartdate"
                                  id="SalesStartDate"
                                  name="SalesStartDate"
                                  value={formData.salesStartDate}
                                  onChange={handleChange}
                                />
                                </div>
                                <div className="form-group col-md-6">
                                <label htmlFor="SupportStartDate" className='SalesStartDate'>Support Start Date:</label>
                                <input
                                  type="date"
                                  className="form-control_salesstartdate"
                                  id="SupportStartDate"
                                  name="SupportStartDate"
                                  value={formData.supportStartDate}
                                  onChange={handleChange}
                                />
                                </div>
                                <div className="form-group col-md-6">
                                <label htmlFor="SupportEndDate" className='SalesStartDate'>Support End Date:</label>
                                <input
                                  type="date"
                                  className="form-control_salesstartdate"
                                  id="SupportEndDate"
                                  name="SupportEndDate"
                                  value={formData.supportEndDate}
                                  onChange={handleChange}
                                />
                                </div>
                                </div>

                          
      </form>
      </div>
  );
};


export default ProductForm;