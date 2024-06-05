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
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path


const UserProfile = () => {
  const { userId } = useAuth(); 
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({}); // State to hold edited user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/get-user/ee`);
        setUser(response.data); 
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false); 
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSaveChanges = async () => {
    try {
      await axiosInstance.put(`/get-user/ee`, editedUser);
      const response = await axiosInstance.get(`/get-user/ee`);
      setUser(response.data);
      setIsEditing(false); 
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
    // Perform upload logic here
  };

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

        {isLoading ? ( // Show loading indicator while data is being fetched
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
              <label htmlFor="profile-image" className="avatar">
                <img src={user.profileImageUrl} alt="Profile" />
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
              <div className="profile_data">
                <div>
                  <BadgeRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                  <span className="user-info">{user.name}</span>
                </div>
                <div>
                  <MailOutlineRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                  <span className="user-info">{user.email}</span>
                </div>
                <div>
                  <CallRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                  <span className="user-info">{user.phoneNumber}</span>
                </div>
                <div>
                  <LocationOnRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                  <span className="user-info">{user.address}</span>
                </div>
                <div>
                  <InsertCommentRoundedIcon style={{ width: '24px', height: '24px', fill: '#6D31EDFF' }} />
                  <span className="user-info">{user.job_profile}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>No user data available</div> // Show message if no user data is found
        )}
        <div className="edit-profile-form">
          {isEditing ? (
            <>
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
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
