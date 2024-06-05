
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Header } from "../../components/Header";
import Select from "react-select";
import axiosInstance from "../../api.jsx";
import './vendors.css';
import './vendors.jsx';
import { useAuth } from "../../authContext.jsx";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'; // Importing the icon
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path
import { Navbar } from "react-bootstrap";


const getTenantIdFromUrl = () => {
    // Example: Extract tenant_id from "/3/home"
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; // Return null if tenant ID is not found or not in the expected place
  };

const Vendorsform = () => {


    const tenantId=getTenantIdFromUrl();
    const {userId}=useAuth();
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
    };

    const [photoColor, setPhotoColor] = useState('');

    useEffect(() => {
      setPhotoColor(generateRandomColor());
    }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts
  

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [vendorOptions, setVendorOptions] = useState([]);
    const [vendorData, setVendorData] = useState({
        vendor_name: "",
        vendor_owner: "",
        email: "",
        phone: "",
        website: "",     
        state:"",
        city:"",
        country:"",
        description:"",
        street:"",
        zipcode:"",
        category:"",
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axiosInstance.post('/vendors', vendorData);
          console.log("Form submitted:", response.data);
        } catch (error) {
          console.error("Error submitting form:", error);
          // Optionally, handle errors or display error message to the user
        }
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVendorData({ ... vendorData, [name]: value });
      };
      const handleCancel = () => {
    
        const isConfirmed = window.confirm("Are you sure you want to cancel? Any unsaved data will be lost.");
        
      
        if (isConfirmed) {
          console.log("Cancel button clicked");
         
          window.location.href = `../${tenantId}/vendors`;
        }
      };
      const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
      const generateSmiley31 = () => (
        <div className="colored-circle31" style={{ backgroundColor: photoColor, color:"white" }}>
          <span className="material-icons" style={{ fontSize: "50px", fontFamily: "'Material Symbols Outlined'" }}>person</span>
        </div>
      );
      
      
      const handleSaveAsDraft = () => {
        // Implement save as draft logic here
        console.log("Save as Draft button clicked");
      
      };
      const handleSubmitForm = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        handleSubmit(event);
      };

  return (
  <div>
      <div className="toppp">
      <TopNavbar/>
      </div>
      <div className="vendor_form_page">
       
      <div className="relatedvendor_back">
             <Link className='task_back' to={`/${tenantId}/vendors`}>Back</Link>
           </div>
          
         
           <div>
          
          
  
           <div>
          
  
         
           <div>
          
            
         <h1 className="create_form_vendor"  >Create Vendors</h1>
     </div>
     <div className="photo100">
            {generateSmiley31()}
            <div className='pic_btn1'>
            <FileUploadRoundedIcon  className="upload_icon133"   />
            <button className="upload_button1">Upload Image</button>
            </div>
         
          </div>
          
     
     <div>
     <div className='btnsss_vendor'>
                 <button type="button" onClick={handleCancel} className="btn-submit_cancel_vendor">Cancel</button>
                 <button type="button"   onClick={handleSaveAsDraft}  className="btn-submit_save_vendor">Save as Draft</button>
                 <button type="submit"  onClick={handleSubmitForm} className="btn-submit_submit_vendor">Submit</button>
               </div>
     </div>
           </div>
     
     
     
             <div className='form-vendor'>
             
             <form onSubmit={handleSubmit}>
             <div>
              <h1 className='ad-vendor_ad' >Vendor Information</h1>
           </div>
           <div className="front_section-vendor" >
             <div className="left-section-vendor">
               <label   className='vendor_sub' htmlFor="vendor_owner">Vendor Owner</label>
               <input 
                 type="text" 
                 id="vendor_owner" 
                 className="form-control-remind"
     
                 name="vendor_owner" 
                 value={vendorData.vendor_owner} 
                 onChange={handleInputChange} 
                 placeholder="Enter vendor Owner"
     
               />
               <label className='vendor_sub' htmlFor="phone">Phone :</label>
               <input 
                 type="text" 
                 id="phone" 
                 className="form-control-vendor"
     
                 name="phone" 
                 value={vendorData.phone} 
                 onChange={handleInputChange} 
                 placeholder="Enter phone number"
     
               />
               <label className='vendor_sub' htmlFor="website">Website :</label>
               <input 
                 type="text" 
                 id="website"
                 className="form-control-vendor"
      
                 name="website" 
                 value={vendorData.website} 
                 onChange={handleInputChange} 
                 placeholder="Enter website"
     
               />
               <label className='vendor_sub' htmlFor="category">GL Account :</label>
               <input 
                 type="text" 
                 id="category"
                 className="form-control-vendor"
      
                 name="category" 
                 value={vendorData.category} 
                 onChange={handleInputChange} 
                 placeholder="Enter account"
     
               />
        
  
             </div>
             <div className="right-section-vendor">
               <label htmlFor="vendor_name" className='vendor_sub'>Vendor Name:</label>
               <input 
                 type="text" 
                 id="vendor_name" 
                 className="form-control-vendor"
                 name="vendor_name" 
                 value={vendorData.vendor_name} 
                 onChange={handleInputChange} 
                 placeholder="Enter vendor_name"
     
               />
               <label htmlFor="email" className='vendor_sub'>Email :</label>
               <input 
                 type="text" 
                 id="email" 
                 name="email"
                 className="form-control-vendor" 
                 value={vendorData.email} 
                 onChange={handleInputChange} 
                 placeholder="Enter email"
     
               />
               <label htmlFor="category" className='vendor_sub'>Catagory :</label>
               <input 
                 type="text" 
                 id="category" 
                 className="form-control-vendor"
                 name="category" 
                 value={vendorData.category} 
                 onChange={handleInputChange} 
                 placeholder="Enter category"
     
               />
                 <label htmlFor="email" className='vendor_sub'>Email Opt Out :</label>
               <input 
                 type="text" 
                 id="email" 
                 className="form-control-vendor"
                 name="email" 
                 value={vendorData.email} 
                 onChange={handleInputChange} 
                 placeholder="Enter email opt "
     
               />
             </div>
           </div>
           <div>
              <h1 className="ad-vendor">Address Information</h1>
           </div>
           <div className="second_vendor_form">
           <div className="front_section-vendor" >
             <div className="left-section-vendor">
               <label   className='vendor_sub' htmlFor="street">Street</label>
               <input 
                 type="text" 
                 id="street" 
                 className="form-control-vendor"
     
                 name="street" 
                 value={vendorData.street} 
                 onChange={handleInputChange} 
                 placeholder="Enter street"
     
               />
               <label className='vendor_sub' htmlFor="state">State :</label>
               <input 
                 type="text" 
                 id="state" 
                 className="form-control-vendor"
     
                 name="state" 
                 value={vendorData.state} 
                 onChange={handleInputChange} 
                 placeholder="Enter state"
     
               />
             
        
  
             </div>
             <div className="right-section-vendor">
               <label htmlFor="city" className='vendor_sub'>City :</label>
               <input 
                 type="text" 
                 id="city" 
                 className="form-control-vendor"
                 name="city" 
                 value={vendorData.city} 
                 onChange={handleInputChange} 
                 placeholder="Enter city"
     
               />
               <label htmlFor="zipcode" className='vendor_sub'>Zip code :</label>
               <input 
                 type="text" 
                 id="zipcode" 
                 name="zipcode"
                 className="form-control-vendor" 
                 value={vendorData.zipcode} 
                 onChange={handleInputChange} 
                 placeholder="Enter zipcode"
     
               />
               <label htmlFor="country" className='vendor_sub'>Country :</label>
               <input 
                 type="text" 
                 id="country" 
                 className="form-control-vendor"
                 name="country" 
                 value={vendorData.country} 
                 onChange={handleInputChange} 
                 placeholder="Enter country"
     
               />
              
             </div>
           </div>
  
           </div>
          
           <div>
           <label   className='ad-vendor-des' htmlFor="description">Description:</label>
               <input 
                 type="text" 
                 id="description" 
                 className="form-vend-desc"
     
                 name="description" 
                 value={vendorData.description} 
                 onChange={handleInputChange} 
                 placeholder="Enter description"
     
               />
              </div>
              <div className="tanent-vendor">
  <div>
  <label   className='ad-vendor-ten' htmlFor="tenantId">Tanent:</label>
               <input 
                 type="text" 
                 id="tenantId" 
                 className="form-vend-tanent"
     
                 name="tenantId" 
                 value={tenantId}
                 onChange={handleInputChange} 
               
     
               />   
  </div>
              </div>
     
           <button className="submit-vendor" type="submit">Submit</button>
         </form>
             </div>
           </div>
         
         
       </div>
  </div>
  )
}

export default Vendorsform
