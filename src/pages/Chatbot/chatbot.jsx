import React, { useState, useEffect } from 'react';
import './chatbot.css';
import OpenAI from "openai";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api.jsx";
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Picker from 'emoji-picker-react';

const Chatbot = () => {
  const { id } = useParams(); 

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [messageTemplates, setMessageTemplates] = useState({});
  const [messages, setMessages] = useState({});
  const [showSmileys, setShowSmileys] = useState(false); // State to toggle smiley menu

  
  const fetchContacts = async () => {
    try {
      const response = await axiosInstance.get('/contacts/', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts data:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const generateChatbotMessage = async () => {
    try {
      if (!selectedContact) {
        console.error('No contact selected');
        return;
      }
  
      const name = `${selectedContact.first_name} ${selectedContact.last_name}`;
      const prompts = [
        `Hey ${name}! 😊 Thinking Python for AI. Simple and powerful. What do you think, ${name}?`,
        `Hi ${name}! 😄 Python's great for AI. Let's make something cool!`,
      ];
  
      const randomIndex = Math.floor(Math.random() * prompts.length);
      const prompt = prompts[randomIndex];
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
        ],
      });
  
      const messageContent = response.choices[0].message.content.trim();
      setMessageTemplates(prevTemplates => ({
        ...prevTemplates,
        [selectedContact.id]: messageContent
      }));
    } catch (error) {
      console.error('Error generating WhatsApp message:', error);
    }
  };

  const handleGenerateMessage = async (e) => {
    e.preventDefault();
    await generateChatbotMessage();
  };

  const handleSend = () => {
    if (!messageTemplates[selectedContact.id] || !selectedContact) {
      console.error('Message template or contact not selected');
      return;
    }
  
    const newMessage = { sender: 'user', content: messageTemplates[selectedContact.id] };
    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage]
    }));
    console.log('Sending message to', selectedContact.first_name, ':', messageTemplates[selectedContact.id]);
  };

  const handleMailClick = () => {
    console.log('Mail icon clicked');
    // Add functionality for mail click here
  };

  const handleVoiceClick = () => {
    console.log('Voice icon clicked');
    // Add functionality for voice click here
  };

  const handleSearchClick = () => {
    console.log('Search icon clicked');
    // Add functionality for search click here
  };

  const filteredContacts = contacts.filter(contact =>
    contact.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.last_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleContactSelection = (contact) => {
    setSelectedContact(contact);
    if (!messages[contact.id]) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [contact.id]: []
      }));
    }
  };

  const handleToggleSmileys = () => {
    setShowSmileys(!showSmileys);
  };

  const handleSelectSmiley = (emoji) => {
    const newMessageTemplate = (messageTemplates[selectedContact?.id] || '') + emoji.emoji + ' ';
    setMessageTemplates(prevTemplates => ({
      ...prevTemplates,
      [selectedContact?.id]: newMessageTemplate
    }));
  };
  
  

  return (
    <div className="chatbot-container">
      <div className="chatbot-chat-header">
        <h1 className='chatbot-contact'>Contact</h1>
        <div className='chatbot-contain'>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchText}
            className='chatbot-search'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchIcon className="search-icon" style={{ width: '20px', height: '24px' }} />
        </div>
        <h1 className='chatbot-msg'>All messages</h1>
        {filteredContacts.map(contact => (
          <div
            key={contact.id}
            className="chatbot-contacts"
            onClick={() => handleContactSelection(contact)}
            style={{ cursor: 'pointer', padding: '5px' }}
          >
            {contact.first_name} {contact.last_name}
          </div>
        ))}
      </div>
      <div className="chatbot-messages-container1">
        {selectedContact && (
          <div className="contact-box">
            <div className="chat-header">
              <div className="chat-header-left">
                {selectedContact.first_name} {selectedContact.last_name}
              </div>
              <div className="chat-header-right">
                <div className='box-chatbot1'>
                  <MailIcon className="header-icon" style={{ width: '20px', height: '20px' }} />
                </div>
                <div className='box-chatbot1'>
                  <CallRoundedIcon className="header-icon" style={{ width: '20px', height: '20px' }} />
                </div>
               
                
                <button onClick={handleSearchClick} className="icon-button">
                  <SearchIcon className="header-icon" style={{width:'20px',height:'20px'}} />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="messages">
          {messages[selectedContact?.id]?.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <div className="left-icons">
            <div className='box-chatbot1'>
              <EmojiEmotionsIcon className="header-icon" style={{ width: '20px', height: '20px' }} onClick={handleToggleSmileys} />
              {showSmileys && (
                <Picker
                  onEmojiClick={handleSelectSmiley}
                />
              )}
            </div>
            <div className='box-chatbot1'>
              <EditIcon className="header-icon" style={{ width: '20px', height: '20px' }} />
            </div>
            <div className='box-chatbot1'>
              <CloudUploadIcon className="header-icon" style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <textarea
            id="message"
            name="message"
            value={messageTemplates[selectedContact?.id] || ''}
            onChange={(e) => setMessageTemplates(prevTemplates => ({
              ...prevTemplates,
              [selectedContact?.id]: e.target.value
            }))}
            placeholder="Type your message here..."
          />
          <div className="right-icons">
            <button onClick={handleSearchClick} className="icon-button">
              <SearchIcon className="header-icon" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
          <div className="chatbot-buttons">
            <button className="chatbot-generatemsg" onClick={handleGenerateMessage}>Generate Message</button>
            <button className='chatbot-sendmsg' onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
      <div className="chatbot-contact-section">
        <h1 className='chatbot-details'>Contact Details</h1>
        {selectedContact && (
          <div className="chatbot-contact-details">
            <div className="profile-info">
              {selectedContact.profileImage ? (
                <img src={selectedContact.profileImage} alt="Profile" className="profile-image" />
              ) : (
                <span className="account-circle">Profile Image</span>
              )}
              <div>
                <h2>{selectedContact.first_name} {selectedContact.last_name}</h2>
                
              </div>
                <div className="chatbot-contacts-details">
                <p className='chatbot-phone'> <CallRoundedIcon className="header-icon" style={{ width: '20px', height: '20px' }} />{selectedContact.phone}</p>
                <p className='chatbot-mail'><MailIcon className="header-icon" style={{ width: '20px', height: '20px' }} />{selectedContact.email}</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
