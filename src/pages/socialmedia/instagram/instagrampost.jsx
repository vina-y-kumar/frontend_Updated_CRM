import React, { useState, useEffect } from 'react';
import { Sidebar } from "../../../components/Sidebar";
import EmojiPicker from 'emoji-picker-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import './instagrampost.css';

const InstagramPost = () => {
  const [text, setText] = useState('');
  const [dragging, setDragging] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const maxLetters = 2200;
  const [caption, setCaption] = useState('');
  const [letterCount, setLetterCount] = useState(0);
  const [comment, setComment] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [files, setFile] = useState(null);
  const [isCommentVisible, setIsCommentVisible] = useState(true);
  const [isPromoteVisible, setIsPromoteVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    addFiles(newFiles);
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    addFiles(newFiles);
  };

  const addFiles = (newFiles) => {
    if (files.length + newFiles.length > 10) {
      alert("You can only upload up to 10 files.");
      return;
    }
    const validFiles = newFiles.filter(file => file.type === 'image/png' || file.type === 'image/jpeg');
    setFile([...files, ...validFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFile(updatedFiles);
  };
 

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    const mentionMatch = value.match(/@(\w+)$/);
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
    } else {
      setMentionQuery('');
    }
  };

  const handleSuggestionClick = (user) => {
    const mentionRegex = /@\w*$/;
    const newText = text.replace(mentionRegex, `@${user} `);
    setText(newText);
    setShowSuggestions(false);
    setMentionQuery('');
  };

  const onCaptionChange = (e) => {
    const value = e.target.value;

    if (value.length <= maxLetters) {
      setCaption(value);
      setLetterCount(value.length);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setCaption(prevCaption => prevCaption + emojiObject.emoji);
    setShowPicker(false); // Close the picker after selecting an emoji
  };

  const handleUploadOptionClick = async (option) => {
    setShowUploadOptions(false);
    switch (option) {
      case 'Upload Image(s)':
        await handleUploadImage();
        break;
      case 'Upload Video':
        await handleUploadVideo();
        break;
      case 'Bynder':
        await handleBynderUpload();
        break;
      case 'Design on Canva':
        await handleDesignOnCanva();
        break;
      case 'Dropbox':
        await handleDropboxUpload();
        break;
      case 'Google Drive':
        await handleGoogleDriveUpload();
        break;
      case 'Shared Media':
        await handleSharedMediaUpload();
        break;
      case 'Asset Library':
        await handleAssetLibraryUpload();
        break;
      default:
        break;
    }
  };

  const handleUploadImage = async () => {
    // Implement your image upload logic here
    alert('Image upload functionality');
  };

  const handleUploadVideo = async () => {
    // Implement your video upload logic here
    alert('Video upload functionality');
  };

  const handleBynderUpload = async () => {
    // Implement Bynder upload logic here
    alert('Bynder upload functionality');
  };

  const handleDesignOnCanva = async () => {
    // Implement design on Canva logic here
    alert('Design on Canva functionality');
  };

  const handleDropboxUpload = async () => {
    // Implement Dropbox upload logic here
    alert('Dropbox upload functionality');
  };

  const handleGoogleDriveUpload = async () => {
    // Implement Google Drive upload logic here
    alert('Google Drive upload functionality');
  };

  const handleSharedMediaUpload = async () => {
    // Implement shared media upload logic here
    alert('Shared media upload functionality');
  };

  const handleAssetLibraryUpload = async () => {
    // Implement asset library upload logic here
    alert('Asset library upload functionality');
  };


  const handleFileUpload = () => {
    // Logic to handle file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      // Handle the uploaded file
      alert('File upload successful: ' + file.name);
    };
    input.click();
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddCampaign = () => {
    alert('Add campaign functionality');
    // Logic to add a new campaign
  };
  const handleConnectAdManager = () => {
    alert('Connect Ad Manager functionality');
    // Logic to connect ad manager
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSchedulePost = () => {
    // Logic to handle scheduling the post
    console.log('Scheduled Date:', selectedDate);
    console.log('Scheduled Time:', selectedTime);
  };

  return (
    <div className="Insta_post">
      <div className="sidebar_container_for_insta">
       <Sidebar/>
      </div>
      <div className="Insta-header">
        <h1 className='meeting_head'>Instagram</h1>
          <div className="Instapost_main_left">
          <div className="post-container">
            <div className="Instapost_content">
              <textarea
                value={text}
                onChange={handleChange}
              />
              {showSuggestions && (
                <ul className="suggestions">
                  {suggestions.map(user => (
                    <li key={user} onClick={() => handleSuggestionClick(user)}>
                      {user}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="upload-media-container">
      <h2 className="upload-media-heading">Upload Media</h2>
      <p className="upload-media-description">
        Share photos and videos on Instagram. Posts can’t exceed 10 photos or videos.
      </p>
      <div
        className={`upload-media-box ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>➤ Upload files here</p>
        <p>Supported format: PNG, JPG</p>
        <div className="upload-actions">
          <label className="upload-button">
            Browse files
            <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={handleImageUpload} />
          </label>
        </div>
      </div>

              {files && files.length > 0 && (
          <div className="attached-media">
            <h3>Attached Media</h3>
            <div className="media-grid">
              {files.map((file, index) => (
                <div key={index} className="media-item">
                  <img src={URL.createObjectURL(file)} alt={`file preview ${index + 1}`} />
                  <button onClick={() => removeFile(index)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
            <div className="caption-box">
      <textarea
        value={caption}
        onChange={onCaptionChange}
        placeholder="Type your caption here..."
      />
      <div className="caption-options">
        <div className="emoji-picker-component">
          <span className="emoji-icon" onClick={() => setShowPicker(!showPicker)}>😊</span>
          {showPicker && (
            <div className="emoji-picker-dropdown">
              <EmojiPicker onEmojiClick={(event, emojiObject) => handleEmojiClick(emojiObject)} />
            </div>
          )}
        </div>
        <div className="upload-option-component">
          <span className="upload-camera-option" onClick={() => setShowUploadOptions(!showUploadOptions)}>📷</span>
          {showUploadOptions && (
            <ul className="upload-options-dropdown">
              {['Upload Image(s)', 'Upload Video', 'Bynder', 'Design on Canva', 'Dropbox', 'Google Drive', 'Shared Media', 'Asset Library'].map(option => (
                <li key={option} onClick={() => handleUploadOptionClick(option)}>{option}</li>
              ))}
            </ul>
          )}
        </div>
        <div className={`letter-count ${letterCount > maxLetters ? 'exceeded' : ''}`}>
          {letterCount} / {maxLetters}
        </div>
      </div>
    </div>
    </div>  
          </div>  
          <div className="instagram-option-box">
          <div className="first-comment-box">
            <div className="comment-heading">Instagram First Comment</div>
            <div className="toggle-comment-visibility" onClick={() => setIsCommentVisible(!isCommentVisible)}>
          {isCommentVisible ? '⬆️' : '⬇️'} 
        </div>
              {isCommentVisible && (
            <div className="comment-input">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment here..."
              />
            </div>
            )}
          </div>
          <div className="insta-campaign">
        <h2>Add Campaign</h2>
       <div className="campaign-box">
          <p>Track and report on your social marketing campaigns with the Campaign Planner, notes and more.</p>
          <hr />
          <button onClick={handleAddCampaign} className="add-campaign-button">Add a campaign</button>
        </div>
        <div className="promote-option-box">
        <div className="promote-heading">
          Promote
          <div className="toggle-promote-visibility" onClick={() => setIsPromoteVisible(!isPromoteVisible)}>
            {isPromoteVisible ? '⬆️' : '⬇️'}
          </div>
        </div>
        {isPromoteVisible && (
          <div className="promote-content">
            <p>Promote this post to a larger audience by connecting an ad account.</p>
            <button onClick={handleConnectAdManager} className="connect-ad-manager-button">Connect Ad Manager</button>
          </div>
        )}
      </div>
      </div> 
    <div className="schedule-post-box">
      <h2>Schedule a Post</h2>
      <div className="date-time-box">
        <div className="date-picker-box">
          <label>Date:</label>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="time-picker-box">
          <label>Time:</label>
          <TimePicker value={selectedTime} onChange={handleTimeChange} />
        </div>
      </div>
      <div>
        <button onClick={handleSchedulePost}>Schedule Post</button>
      </div>
    </div>
      </div>
      </div>
        </div>
  );
};

export default InstagramPost;
