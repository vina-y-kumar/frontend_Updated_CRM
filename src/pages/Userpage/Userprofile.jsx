import React, { useState, useEffect } from "react";
import axiosInstance from "../../api.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import { useAuth } from "../../authContext";
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { useParams } from "react-router-dom";
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import "./Userprofile.css";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; 
import uploadToBlob from "../../azureUpload.jsx";

const getTenantIdFromUrl = () => {
  // Example: Extract tenant_id from "/3/home"
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1]; // Assumes tenant_id is the first part of the path
  }
  return null; // Return null if tenant ID is not found or not in the expected place
};

const UserProfile = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [profileImageFile, setProfileImageFile] = useState(null); 
  const [profileImageUrl, setProfileImageUrl] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/get-user/ee`);
        setUser(response.data);
        setEditedUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`/get-user/ee`);
      setUser(response.data);
      setEditedUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      let updatedUser = { ...editedUser }; // Create a copy of editedUser
    
      // Upload the profile image if it exists
      if (profileImageFile) {
        const formData = new FormData();
        formData.append('file', profileImageFile);
        const response = await axiosInstance.post('YOUR_UPLOAD_ENDPOINT', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Upload success:', response.data);
        updatedUser.profile_image = response.data.url; 
      }
      
      await axiosInstance.put(`/get-user/ee/`, updatedUser);
      
      setEditedUser(updatedUser);
      
      const notes = `User profile updated with new data: <describe the changes made>`;
      setIsEditing(false); 
      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProfileImageUrl(imageUrl);
  };

  useEffect(() => {
    if (!isEditing) {
      fetchUserData();
    }
  }, [isEditing]);
 
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('')
  const { id } = useParams();


 
   const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    
    if (selectedFile) {
      setFile(selectedFile);
      console.log('File state set:', selectedFile);
  
      try {
        // Upload the file to Azure Blob Storage
        console.log('Uploading file to Azure Blob Storage...');
      const fileUrl = await uploadToBlob(selectedFile);
        console.log('File uploaded to Azure, URL:', fileUrl);

       
  
        // Send a POST request to your backend with the file URL
        console.log('Sending POST request to backend...');
        const response = await axiosInstance.post('/documents/', {
          name: selectedFile.name,
          document_type: selectedFile.type,
          description: 'Your file description',
          file_url: fileUrl,
          entity_type: 7,
          entity_id: id,
          tenant : tenantId,
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
 

  const fetchProfileImageUrl = async () => {
    try {
      const response = await axiosInstance.get(`/documents/`); // Adjust the endpoint as needed
      console.log('GET request successful, response:', response.data[20]);
      setProfileImageUrl(response.data[20].file_url); // Assuming response.data.file_url contains the URL
    
    } catch (error) {
      console.error('Error fetching file URL:', error);
    }
  };

  useEffect(() => {
      fetchProfileImageUrl();
    
  }, [id]);

 
  

  return (
    <div className="user-profile-container">
      <div className="home_left_box1" style={{"top":"0rem"}}>
        <Sidebar />
      </div>
      <div>
      <div className="right_div" style={{marginLeft:'-80px'}}>
          <TopNavbar profileImageUrl={profileImageUrl} />
        </div>
        <div>
          <h2 className="user-profile-container1">User Profile</h2>
        </div>
        <div className="user-profile-wrapper">
          {isLoading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="profile-details">
              <div className="avatar-container">
                <div className="container-behind-avatar">
                  <div className='semi-half-circle'></div>
                  <div className='semi-half-circle2'></div>
                  <div className='semi-half-circle3'></div>
                  <div className='semi-half-circle4'></div>
                </div> 
                <label htmlFor="profile-image" className="avatar" onChange={handleFileChange}  onClick={() => document.getElementById("profile-image").click()}>
                  {profileImageUrl && <img src={profileImageUrl} alt="Profile" />}
                  <span className=' profile-user'>Profile</span>
                </label>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  style={{ display: "none" }}
                />
              </div>
              <div className="profile_font">
                <div className='use_mate'>
                  <div className="material-icons-container">
                    <InsertCommentRoundedIcon  style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }}/>
                  </div>
                  <div className="material-icons-container">
                    <MailOutlineRoundedIcon  style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }}/>
                  </div>
                  <div className="material-icons-container">
                    <CallRoundedIcon  style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }}/>
                  </div>
                </div>
                <div className="profile_data" style={{ margin: '20px', fontSize: '18px', marginLeft: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <BadgeRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      />
                    ) : (
                      <span className="user-info">{user.name}</span>
                    )}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <MailOutlineRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                    {isEditing ? (
                      <input
                        type="text"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      />
                    ) : (
                      <span className="user-info">{user.email}</span>
                    )}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <CallRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                    {isEditing ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editedUser.phoneNumber}
                        onChange={handleInputChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      />
                    ) : (
                      <span className="user-info">{user.phoneNumber}</span>
                    )}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <LocationOnRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={editedUser.address}
                        onChange={handleInputChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      />
                    ) : (
                      <span className="user-info">{user.address}</span>
                    )}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <InsertCommentRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                    {isEditing ? (
                      <input
                        type="text"
                        name="job_profile"
                        value={editedUser.job_profile}
                        onChange={handleInputChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      />
                    ) : (
                      <span className="user-info">{user.job_profile}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>No user data available</div>
          )}
          <div className="edit-profile-form">
            {isEditing ? (
              <>
                <button className="btn_username-save" onClick={handleSaveChanges}>Save</button>
                <button className="btn_username-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <button className="btn_username" onClick={() => setIsEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
