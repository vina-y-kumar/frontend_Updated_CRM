import React, { useState } from 'react';
import axios from 'axios';

const ComposeEmailComponent = ({
  accessToken,
  to,
  setTo,
  subject,
  setSubject,
  body,
  setBody,
}) => {
  const [attachments, setAttachments] = useState([]);

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const removeAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  const handleSendEmailWithAttachments = async () => {
    try {
      const trackingId = uuidv4();
      const trackingPixelUrl = `https://webappbaackend.azurewebsites.net/track_open/2/`;
      const emailBodyWithTracker = `${body}<img src="${trackingPixelUrl}" alt="" style="display:none;" />`;

      const boundary = 'boundary';
      const messageParts = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' + boundary + '"',
        '',
        '--' + boundary,
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 7bit',
        '',
        emailBodyWithTracker,
        '',
      ];

      for (let i = 0; i < attachments.length; i++) {
        const file = attachments[i];
        const fileContent = await file.arrayBuffer();
        const base64FileContent = btoa(String.fromCharCode(...new Uint8Array(fileContent)));

        messageParts.push(
          '--' + boundary,
          `Content-Type: ${file.type}; name="${file.name}"`,
          'Content-Transfer-Encoding: base64',
          `Content-Disposition: attachment; filename="${file.name}"`,
          '',
          base64FileContent,
          ''
        );
      }

      messageParts.push('--' + boundary + '--');

      const rawMessage = messageParts.join('\r\n');

      const response = await axios.post(
        'https://www.googleapis.com/gmail/v1/users/me/messages/send',
        {
          raw: btoa(rawMessage),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            },
            }
            );
            console.log('Email sent with attachments:', response.data);
            alert('Email sent successfully with attachments!');
          } catch (error) {
            console.error('Error sending email with attachments:', error);
            alert('Error sending email with attachments. Please try again.');
          }
          };
          
return (
  <div className='compose-email-container'>
  <h2>Compose Email</h2>
  <form>         
  <div>
    <label htmlFor="inputEmail">To:</label>
       <input
         type="email"
           id="inputEmail"
           value={to}
           onChange={(e) => setTo(e.target.value)}
       />
   </div>
   <div>
   <label htmlFor="inputSubject">Subject:</label>
   <input
    type="text"
     id="inputSubject"
     value={subject}
     onChange={(e) => setSubject(e.target.value)}
     />
    </div>
    <div>
    <label htmlFor="inputBody">Body:</label>
     <textarea
      id="inputBody"
       rows="5"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      ></textarea>
      </div>
      <br />
      <label>Attachments:</label>
      <input type="file" multiple onChange={handleAttachmentChange} />
        {attachments.length > 0 && (
      <ul>
      {attachments.map((file, index) => (
      <li key={index}>
      {file.name} - <button type="button" onClick={() => removeAttachment(index)}>Remove</button>
      </li>
        ))}
      </ul>
        )}
        <button type="button" className="send-email-button" onClick={handleSendEmailWithAttachments}>Send Email</button>
         </form>
         </div>
        );
       };
            
            // Utility function to generate UUID
   const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = (Math.random() * 16) | 0,
     v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
            });
            };
            
  export default ComposeEmailComponent;          
