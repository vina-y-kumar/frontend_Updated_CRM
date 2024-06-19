
import './vendors.css';
import React, { useEffect, useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Dropdown, Card, ListGroup } from "react-bootstrap";
import axiosInstance from "../../api";
import * as XLSX from "xlsx";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path


const getTenantIdFromUrl = () => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1];
    }
    return null;
  };

const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const tenantId = getTenantIdFromUrl();
    const modelName = "vendor";
  
    useEffect(() => {
      const fetchVendors = async () => {
        try {
          const response = await axiosInstance.get('/vendors');
          setVendors(response.data);
        } catch (error) {
          console.error("Error fetching vendors:", error);
        }
      };
      fetchVendors();
    }, []);
  
    const handleDownloadExcel = () => {
      const ws = XLSX.utils.json_to_sheet(vendors);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Vendor");
      XLSX.writeFile(wb, "vendor.xlsx");
    };
    



  return (
    <div >

      <div className="vendor_page">
     
      <div className="home_left_box1" style={{"top":"0rem"}}>
        <Sidebar />
      </div>
    
      <div>
      <div className="right_div" style={{marginLeft:'-80px'}}>
        <TopNavbar/>
        </div>
      <div className="vendor-merge">
     <div className="vendor-head">
        <h1>Vendors</h1>

        </div>
        <div className="excel_form-vendor">
        <div >
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="vendors-dropdown" className="excel-dropdown-menu6-vendor">
              Excel File
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button onClick={handleDownloadExcel}>Download Excel</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="create-vendor">
                <NavLink to={`/${tenantId}/createVendors`} id="btn-vendor"> +Create Vendors</NavLink>
          
              </div>
        </div>
    
        
     </div>

     

   
     <div className='table_vendor'> 
         
         <table >
           <thead>
             <tr   >

               <th  className="table-vendor-row" >Vendor Name</th>
               <th  className="table-vendor-row" >Email</th>
               <th  className="table-vendor-row">Phone</th>
               <th  className="table-vendor-row" >Website</th>
               <th  className="table-vendor-row" >Vendor Owner</th>
           
               <th  className="table-vendor-row">Action</th>
             </tr>
           </thead>
           <tbody>
           {vendors.map((vendor, index) => (
  <tr key={index}> 
   <td className="vendor-data1">
                    <Link to={`/${tenantId}/Vendorsinfo/${vendor.id}`}>
                      {vendor.vendor_name}
                    </Link>
                  </td>   
    <td className="vendor-data1">{vendor.email}</td>
    <td className="vendor-data1">{vendor.phone}</td>
    <td className="vendor-data1">{vendor.website}</td>
    <td className="vendor-data1">{vendor.vendor_owner}</td>
    <td className="vendor-data1">{vendor.action}</td>


  </tr>
))}

           </tbody>
         </table>
      

     </div>
      </div>
     
   
       
      </div>
     
      
   
    </div>
  )
}

export default Vendors
