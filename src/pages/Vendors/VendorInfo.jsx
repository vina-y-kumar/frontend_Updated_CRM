import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import "./vendors.jsx";
import axiosInstance from "../../api.jsx";
import './vendors.css';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'; // Importing the icon
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path




const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; 
  }
  return null;
};
const VendorInfo = () => {

  const tenantId = getTenantIdFromUrl();
  const [vendor, setVendor] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [vendorInfo, setVendorInfo] = useState({
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
  const { id } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [photoColor, setPhotoColor] = useState('');

  useEffect(() => {
      const fetchVendorData = async () => {
        try {
          const response = await axiosInstance.get(`/vendor/${id}`);
        
          setVendorInfo(response.data);
        } catch (error) {
          console.error("Error fetching account data:", error);
        }
      };
  
      fetchVendorData();
    }, [id]);
    const handleScrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };
  

    const relatedListItems = [
      "Notes",
      "Cadences",
      "Attachments",
      "Deals",
      "Open Activities",
      "Closed Activities",
      "Invited Meetings",
      "Products",
      "Cases",
      "Quotes",
      "Sales Orders",
      "Purchase Orders",
      "Emails",
      "Invoices",
    ];
    const handleChange = (event) => {
      setVendorInfo({
        ...vendorInfo,
        [event.target.name]: event.target.value,
      });
    };
    const handleAddNote = (event) => {
      event.preventDefault();
      const newNote = {
        id: new Date().getTime(),
        text: vendorInfo.Notes,
      };
      setAddTaskTable({
          ...vendorInfo,
          RecentNotes: [newNote, ...vendorInfo.RecentNotes],
          Notes: "",
        });
      };
      const toggleAdditionalDetails = () => {
        setVendorInfo(!vendorInfo);
      };
      const handleAddMeeting = (event) => {
        event.preventDefault();
        const newMeeting = {
          CadenceName: vendorInfo.CadenceName,
          Modules: vendorInfo.Modules,
          CreatedDate: vendorInfo.CreatedDate,
          CreatedBy: vendorInfo.createdBy,
        };
        setMeetings([...meetings, newMeeting]);
        setVendorInfo({
          ...vendorInfo,
          CadenceName: "",
          Modules: "",
          CreatedDate: "",
          createdBy: "",
        });
        setIsModalOpen(false);
      };
      const handleCloseTask = () => {
        setIsModalOpen(true);
      };
      const handleCancelCloseTask = () => {
        setIsModalOpen(false);
      };
     
      const handleConfirmCloseTask = () => {
        setIsCompleted(true); // Mark the task as completed
        setIsModalOpen(false);
      };

      const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
      const generateSmiley310 = () => (
        <div className="colored-circle301" style={{ backgroundColor: photoColor, color:"white" }}>
          <span className="material-icons" style={{ fontSize: "50px", fontFamily: "'Material Symbols Outlined'" }}>person</span>
        </div>
      );
      
  return (
    <div>

<div className="vendorinfo_page">
<div className="vendor_info">
<div className="relatedList-vendor">
              <Link to={`/${tenantId}/vendors`}> Back</Link>
            </div>
       <div className="sidebar-vendor">
        <ul>
          {relatedListItems.map((item) => (
            <li key={item}>
              <a href={`#${item}`} onClick={() => handleScrollToSection(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
       

</div>


<div>
<div className="right_div">
        <TopNavbar/>
        </div>

 <div className="right_div_head">
 <div>
    <h1 className="vendinfo-head">Vendor Details</h1>
  </div>
  <div className="photo100">
            {generateSmiley310()}
            <div className='pic_btn1'>
             {/* <FileUploadRoundedIcon className="44" /> */}
              <button className="upload_button13">Upload Image</button>
            </div>
          </div>
          <div className="button-group-vendor" >
              <div>
              <button className="button-overview-vendor">Overview</button>
              </div>
         <div>
         <button className="button-timeline-vendor">Timeline</button>
         </div>
         
          </div> 

          <div className="vendor_infobox1">
            <ul className="vendor_box_data1">
              <li className="vendor_box_data">Email :
              <span className='vend_boxdata'>{vendorInfo.email}</span> </li>
              <li className="vendor_box_data">Phone :<span className='vend_boxdata'>{vendorInfo.phone}</span> </li>
              <li className="vendor_box_data">Website :<span className='vend_boxdata'>{vendorInfo.website}</span> </li>
              <li className="vendor_box_data">Category : <span className='vend_boxdata'>{vendorInfo.category}</span></li>
              <li className="vendor_box_data">GL Account : <span className='vend_boxdata'>{vendorInfo.category}</span></li>
            </ul>

          </div>
          <div className='vendor_infobox2'>
            <h1 className="product_detail">Product Details </h1>
            <p className="product_detail-data">{vendorInfo.category}</p>

          </div>
          <div  className='vendor_infobox3'>
         
            <div className="hidedetail">
              <button onClick={toggleAdditionalDetails}>
                {vendorInfo ? "Hide Details" : "Show Details"}
              </button>
              <h1  className="vendor_detail">Vendor Information</h1>
            </div>
          

            <div className="showdetails1" >
              <div className="showdetailsdata1">
             
                <div>
                <ui>
             <li className="vendor_box_data">Vendor Owner :<span className='vend_boxdata'>{vendorInfo.vendor_owner}</span> </li>
             <li className="vendor_box_data">Phone : <span className='vend_boxdata'>{vendorInfo.phone}</span></li>
             <li className="vendor_box_data">Website : <span className='vend_boxdata'>{vendorInfo.website}</span></li>
             <li className="vendor_box_data">Category : <span className='vend_boxdata'>{vendorInfo.category}</span></li>



             </ui>
                </div>
                <div>
                <ui>
             <li className="vendor_box_data">Vendor Name :<span className='vend_boxdata'>{vendorInfo.vendor_name}</span> </li>
             <li className="vendor_box_data">Email :<span className='vend_boxdata'> {vendorInfo.email}</span></li>
             <li className="vendor_box_data">GL account : <span className='vend_boxdata'>{vendorInfo.website}</span></li>
             <li className="vendor_box_data">Created By :<span className='vend_boxdata'> {vendorInfo.createdBy}</span></li>



             </ui>
                </div>
            
             
               
            
             
             
            </div>
          
          </div>
          </div>
          <div className='vendor_infobox4'>
          <h1  className="vendor_detail-address">Address Information</h1>
          <div className="vendor_detail-merge">
          <div>
            <ul>
            <li className="vendor_box_data">Street :<span className='vend_boxdata'>{vendorInfo.street}</span> </li>
            <li className="vendor_box_data">State :<span className='vend_boxdata'>{vendorInfo.state}</span> </li>
            <li className="vendor_box_data">Country : <span className='vend_boxdata'>{vendorInfo.country}</span></li>
            </ul>

          </div>
          <div>
            <ul>
            <li className="vendor_box_data">City : <span className='vend_boxdata'>{vendorInfo.city}</span></li>
            <li className="vendor_box_data">Zip Code : <span className='vend_boxdata'>{vendorInfo.zipcode}</span></li>
          
            </ul>

          </div>
          </div>
         
          </div>
          <div className='vendor_infobox5'>
          <h1  className="vendor_detail-address">Description Information</h1>
          <div className="vend-description">{vendorInfo.description}</div>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Notes</h1>
              <div>
                  <button className="vendor-notes-button"> Recent Notes</button>

                  <ul className="recent-notes-list">
                  
                  </ul>
                  <form onSubmit={handleAddNote}>
                <textarea
                  name="Notes"
                  value={vendorInfo.Notes}
                  onChange={handleChange}
                  className="notes-textarea-vendor"
                  placeholder="Add Notes........"
                ></textarea>
                
              </form>
                </div>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Cadences</h1>
              <div className="addcadencebtn-vend">
              <button onClick={() => setIsModalOpen(true)}>+Add Cadence</button>

              </div>

            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Attachments</h1>
              <div class="attachment-upload1vend">
                <input type="file" id="attachment-input" />
                <label for="attachment-input">
                  <div className="clicktoupload1">clicktoupload</div>
                </label>
              </div>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Products</h1>
              {/* <table>
        <thead  className='table_vend'>
          <tr>
            <th>Product Name</th>
            <th>Product Code</th>
            <th>Product Active</th>
          </tr>
        </thead>
        <tbody>
          <td>Cookies</td>
          <td>334455</td>
          <td>yes</td>
          </tbody>
      </table> */}
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Perchase Orders</h1>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Contacts</h1>
              <div className="Assignnewvend">
              <div className="assign1vend">
                {" "}
                <button>Assign</button>
              </div>
              <div className="assign2vend">
                {" "}
                <button>+New</button>
              </div>
            </div>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Open Activities</h1>
              <div className="addcadencebtn-vend">
              <button onClick={() => setIsModalOpen(true)}>+Add New Activity</button>

              </div>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Email</h1>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Closed Activities</h1>
            </div>
            <div className="vendor_infobox5">
              <h1 className="vendor_detail-notes">Survey</h1>
              <div className="Assignnewvend">
              <div className="assign1vend">
                {" "}
                <button>Assign</button>
              </div>
              <div className="assign2vend">
                {" "}
                <button>+New</button>
              </div>
            </div>
            </div>
 </div>
</div>
</div>

    </div>
  )
}

export default VendorInfo
