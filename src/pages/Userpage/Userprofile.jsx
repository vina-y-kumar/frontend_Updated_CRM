import React, { useState, useEffect } from "react";
import axiosInstance from "../../api.jsx";
import { Sidebar } from "../../components/Sidebar/index.jsx";
import { useAuth } from "../../authContext";
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import "./Userprofile.css";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; 

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

  return (
    <div className="user-profile-container">
      <div className="home_left_box4">
        <Sidebar />
      </div>
      <div>
        <div className="right_div">
          <TopNavbar/>
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
                <label htmlFor="profile-image" className="avatar" onClick={() => document.getElementById("profile-image").click()}>
                  {profileImageUrl && <img src={profileImageUrl} alt="Profile" />}
                  <span className=' profile-user'>Profile</span>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div className="profile_font">
                <div className='use_mate' >
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
                <div className="profile_data"  style={{ margin: '20px', fontSize: '18px',  marginLeft: '20px' }}>
                  <div   style={{ marginBottom: '16px' }}>
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
                <button  className="btn_username-save" onClick={handleSaveChanges}>Save</button>
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
