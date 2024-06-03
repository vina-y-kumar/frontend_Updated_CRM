import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="product-Sidebar">
        <Link to="">Back</Link>
      </div>
    <div className="product-form-container">
      <h1 className="product-form-heading">Create Product</h1>
      <div className="form-buttons-container">
        <button type="submit" className="product-form-button product-form-button-submit">Submit</button>
        <button type="button" className="product-form-button product-form-button-savedraft">Save as Draft</button>
        <button type="button" className="product-form-button product-form-button-cancel">Cancel</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="product-section">
          <h2 className="product-section-heading">Product Image</h2>
          <div className="product-header">
            <input type="file" name="productImage" className="product-form-input" onChange={handleChange} />
          </div>
        </div>
  
        <div className="product-section">
          <div className="product-section-heading">
            <h2>Product Information</h2>
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
                                 </div>
                    </form>
  </div>
  <div className="price-information">
  <div className="price-information-heading">
    <h2>Price Information</h2>
  </div>
  <div className="price-forms">
    <div className="form-group col-md-6">
      <label htmlFor="unitPrice">Unit Price:</label>
      <input
        type="text"
        className="form-control_unit-price"
        id="unitPrice"
        name="unitPrice"
        value={formData.unitPrice}
        onChange={handleChange}
        placeholder="Enter Unit Price"
      />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="commissionRate">Commission Rate:</label>
      <input
        type="text"
        className="form-control_commission-rate"
        id="commissionRate"
        name="commissionRate"
        value={formData.commissionRate}
        onChange={handleChange}
        placeholder="Enter Commission Rate"
      />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="tax">Tax:</label>
      <input
        type="text"
        className="form-control_tax"
        id="tax"
        name="tax"
        value={formData.tax}
        onChange={handleChange}
        placeholder="Enter Tax"
      />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="taxable">Taxable:</label>
      <input
        type="checkbox"
        className="form-control_taxable"
        id="taxable"
        name="taxable"
        checked={formData.taxable}
        onChange={handleChange}
      />
    </div>
   
  </div>
</div>
<div className="stock-information">
  <div className="stock-information-heading">
    <h2>Stock Information</h2>
  </div>
  <div className="stock-forms">
    <div className="form-group">
      <label htmlFor="usageUnit">Usage Unit:</label>
      <input
        type="text"
        className="form-control_usage-unit"
        id="usageUnit"
        name="usageUnit"
        value={formData.usageUnit}
        onChange={handleChange}
        placeholder="Enter Usage Unit"
      />
    </div>
    <div className="form-group">
      <label htmlFor="quantityInStock">Quantity in Stock:</label>
      <input
        type="text"
        className="form-control_quantity-in-stock"
        id="quantityInStock"
        name="quantityInStock"
        value={formData.quantityInStock}
        onChange={handleChange}
        placeholder="Enter Quantity in Stock"
      />
    </div>
    <div className="form-group">
      <label htmlFor="handler">Handler:</label>
      <input
        type="text"
        className="form-control_handler"
        id="handler"
        name="handler"
        value={formData.handler}
        onChange={handleChange}
        placeholder="Enter Handler"
      />
    </div>
    <div className="form-group">
      <label htmlFor="qtyOrdered">Qty Ordered:</label>
      <input
        type="text"
        className="form-control_qty-ordered"
        id="qtyOrdered"
        name="qtyOrdered"
        value={formData.qtyOrdered}
        onChange={handleChange}
        placeholder="Enter Qty Ordered"
      />
    </div>
    <div className="form-group">
      <label htmlFor="reorderLevel">Reorder Level:</label>
      <input
        type="text"
        className="form-control_reorder-level"
        id="reorderLevel"
        name="reorderLevel"
        value={formData.reorderLevel}
        onChange={handleChange}
        placeholder="Enter Reorder Level"
      />
    </div>
    <div className="form-group">
      <label htmlFor="quantityInDemand">Quantity in Demand:</label>
      <input
        type="text"
        className="form-control_quantity-in-demand"
        id="quantityInDemand"
        name="quantityInDemand"
        value={formData.quantityInDemand}
        onChange={handleChange}
        placeholder="Enter Quantity in Demand"
      />
    </div>
  </div>
</div>
<div className="description-information">
  <div className="description-information-heading">
    <h2>Description Information</h2>
  </div>
  <div className="description-forms">
    <div className="form-group">
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        className="form-control_description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter Description"
      ></textarea>
    </div>
  </div>
</div>

</div>
  );
};


export default ProductForm;