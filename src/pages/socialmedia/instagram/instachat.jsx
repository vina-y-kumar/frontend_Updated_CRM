import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './LiveChat.css'; // Ensure you create this CSS file

const socket = io('https://hx587qc4-5173.inc1.devtunnels.ms/');
const getTenantIdFromUrl = () => {
    // Example: Extract tenant_id from "/3/home"
    const pathArray = window.location.pathname.split('/');
    if (pathArray.length >= 2) {
      return pathArray[1]; // Assumes tenant_id is the first part of the path
    }
    return null; // Return null if tenant ID is not found or not in the expected place
  };
  const tenantId=getTenantIdFromUrl();

const ChatBox = ({ messages, input, setInput, sendMessage }) => {
    
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender === 'bot' ? 'sent' : 'received'}`}
        >
          <pre>{msg.text}</pre>
        </div>
      ))}
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

const CommentsBox = ({
  comments,
  commentInput,
  setCommentInput,
  sendCommentReply,
  handleCommentClick,
  toggleReplies,
  showReplies,
}) => {
  return (
    <div className="comments-box">
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <div key={index}>
          <div
            className={`comment ${comment.sender === 'sent' ? 'sent' : 'received'}`}
            onClick={() => handleCommentClick(comment.commentId)}
          >
            <pre>{comment.text}</pre>
            <button onClick={() => toggleReplies(comment.commentId)}>
              {showReplies[comment.commentId] ? 'Hide Replies' : 'Show Replies'}
            </button>
          </div>
          {showReplies[comment.commentId] && (
            <div className="replies">
              {comment.replies.map((reply, idx) => (
                <div
                  key={idx}
                  className={`reply ${reply.sender === 'sent' ? 'sent' : 'received'}`}
                >
                  <pre>{reply.text}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <input
        type="text"
        placeholder="Reply to comment"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <button onClick={sendCommentReply}>Reply to Comment</button>
    </div>
  );
};

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [recId, setRecId] = useState('');
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentId, setCommentId] = useState('');
  const [showReplies, setShowReplies] = useState({});
  const [mediaId, setMediaId] = useState('');
  const [mediaIds, setMediaIds] = useState([]);
  const [instagramContacts,setInstagramContacts] = useState(['']);// Initialize as an empty array
  useEffect(() => {
    const fetchInstagramContacts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/whatsapp_convo_get/unique_insta_profiles/', {
          method: 'GET',
          headers: {
            'X-Tenant-Id': tenantId,  // Replace with your actual tenantId variable
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Instagram contacts');
        }

        const data = await response.json();
        setInstagramContacts(data);
        console.log('Instagram contacts:', data);

        // Process data as needed, e.g., update state or display in UI
        // Example: setInstagramContacts(data);

      } catch (error) {
        console.error('Error fetching Instagram contacts:', error);
      }
    };

    // Call fetchInstagramContacts when component mounts
    fetchInstagramContacts();

  }, []);
  const sendDataToBackend = async (instagramID, conversation) => {
    try {
       
      const formattedConversation = conversation
        .filter(msg => msg.text && msg.text.trim() !== '') // Ensure text exists and is not empty
        .map(msg => ({
          text: msg.text,
          sender: msg.sender,
        }));
        console.log("pay attention",formattedConversation);
  
      if (formattedConversation.length === 0) return; // No valid messages to send
      // Example POST request using fetch API
      const response = await fetch(`http://127.0.0.1:8000/whatsapp_convo_post/${instagramID}/?source=instagram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-Id': tenantId
        },
        body: JSON.stringify({
          contact_id: instagramID,
          conversations: formattedConversation,
          tenant:'ll', // Assuming conversation is the array of messages
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data to backend');
      }
  
      console.log('Data sent to backend successfully');
  
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  
  // Function to fetch conversation data for a given contact
  const fetchConversation = async (instagramID) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/whatsapp_convo_get/${instagramID}/?source=instagram`,{
        method: 'GET',
        headers: {
          'X-Tenant-Id': tenantId
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from backend');
      }
  
      const data = await response.json();
      setMessages(data); // Update conversation state with fetched data
  
      console.log('Data fetched from backend successfully:', data);
  
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };
  useEffect(() => {
    socket.on('new_message_insta', (data) => {
      if (data && data.message && data.message.text) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message.text, sender: 'user' }
        ]);
        setRecId(data.rec_id); // Set the recipient ID for replies
      }
    });

    socket.on('new_comment_insta', (data) => {
      console.log("Received comment data:", data);
      if (data && data.message) {
        setComments((prevComments) => [
          ...prevComments,
          { text: data.message, sender: 'received', commentId: data.commentID, replies: [], mediaID: data.mediaID }
        ]);
        setCommentId(data.commentID);
        setMediaId(data.mediaID);

        // Update mediaIds state to include the new mediaID if not already included
        setMediaIds((prevMediaIds) => {
          if (!prevMediaIds.includes(data.mediaID)) {
            return [...prevMediaIds, data.mediaID];
          }
          return prevMediaIds;
        });
      }
    });

    return () => {
      socket.off('new_message_insta');
      socket.off('new_comment_insta');
    };
  }, []); // Empty dependency array to ensure it runs once on mount

  const sendMessage = () => {
    if (input && recId) {
      socket.emit('send_message', { rec_id: recId, text: input });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: 'bot' }
      ]);
      setInput('');
    }
  };

  const sendCommentReply = () => {
    if (commentInput && commentId) {
      socket.emit('send_comment_reply', { comment_id: commentId, text: commentInput });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, replies: [...comment.replies, { text: commentInput, sender: 'sent' }] }
            : comment
        )
      );
      setCommentInput('');
    }
  };

  const handleCommentClick = (commentId) => {
    setCommentId(commentId);
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
  };

  const filterCommentsByMediaId = (id) => {
    setMediaId(id);
    setShowReplies({}); // Reset showReplies state to collapse all replies
  };

  return (
    <div className="live-chat">
     
      <div className="main-content" style={{display:'flex'}}>
        <div>
        <h1>Live Chat</h1>
        <ChatBox
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
         <button onClick={() => sendDataToBackend(recId, messages)}>Send data</button>
        </div>
        <div style={{display:'flex',marginLeft:'100px'}}>
         <div className="sidebar_comment"style={{padding:'10px'}} >
        <h2>Media IDs</h2>
        <ul>
          {mediaIds.map((id, index) => (
            <li key={index} onClick={() => filterCommentsByMediaId(id)}>
              Media ID: {id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CommentsBox
          comments={comments.filter(comment => comment.mediaID === mediaId)}
          commentInput={commentInput}
          setCommentInput={setCommentInput}
          sendCommentReply={sendCommentReply}
          handleCommentClick={handleCommentClick}
          toggleReplies={toggleReplies}
          showReplies={showReplies}
        />
       </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
