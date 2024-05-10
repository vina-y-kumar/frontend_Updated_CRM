
import React, { useState,useEffect } from 'react';
import './SendEmail.css';
import OpenAI from "openai";
import { useParams } from "react-router-dom";


const SendEmail = () => {
  const { id } = useParams(); 

  const [recipientName, setRecipientName] = useState('');
  const [subject, setSubject] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isEditingCustomMessage, setIsEditingCustomMessage] = useState(false);
  


  
 
  const [contacts, setSelectedContact] = useState("");

 


  
  useEffect(() => {

  }, [contacts]);
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://backendcrmnurenai.azurewebsites.net/contacts/`

      );
      const data = await response.json();
      setSelectedContact(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  
  

  const generateEmailTemplate = async () => {
   
    try {
      const response1 = await fetch(
        `https://backendcrmnurenai.azurewebsites.net/contacts/${id}`


      );
      const contacts = await response1.json(subject);
      setSelectedContact(contacts);
      // Check if the contact object is valid
      // if (!contacts || typeof contacts !== 'object') {
      //   throw new Error('Invalid contacts object');
      // }
      console.log('***********',contacts)
      // Extract required fields with default values if missing
      const name = contacts.first_name && contacts.last_name ? `${contacts.first_name} ${contacts.last_name}` : 'there';
      const description = contacts.description || 'your project';
      const address = contacts.address || '123 Unknown Street, Unknown City, Unknown Country';
      const createdBy = contacts.createdBy || 'Unknown User'; // Default value if createdBy is missing
      const emailSubject = subject;

      const prompt = `Subject: ${emailSubject}\n\nHi ${name},\n\n I hope this is your address ${address} and this is the  project${description} you working on. Thank you for reaching out to us regarding your project. We appreciate the opportunity to assist you. Here are the details:\n\nName: ${name}\nAddress: ${address}\nDescription: ${description}\n\nWe are looking forward to discussing this further with you. Please let us know your availability so we can schedule a meeting.\n\nBest regards,\n${name}`;
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          // { role: "system", content: `Hi ${name},\n\n` },
          // { role: "system", content: `Address: ${address}\n\n` },
          //   { role: "system", content: `Description: ${description}\n\n` },

        ],
      });
  
      const generatedText = response.choices[0].message.content.trim();
      console.log('&&&&&&&&&&',  generatedText)
      return generatedText;
      
    } catch (error) {
      console.error('Error generating email template:', error);
      return 'Error generating email template';
    }
  };

  
  
 


  
 
  
  // Handle generating email template
  const handleGenerateTemplate = async (e) => {
    e.preventDefault();
    const template = await generateEmailTemplate(id);
    setEmailTemplate(template);
  };

 

  // Handle sending the email
  const handleSendEmail = (e) => {
    e.preventDefault();
    console.log('Sending email:', emailTemplate);
  };

  return (
    <div className="send-email-container">
      <h1 className='compose'>Compose Email</h1>
      <form className="email-form">
        <label htmlFor="recipient">Recipient:</label>
        <input 
          type="text" 
          id="recipient" 
          name="recipient" 
          value={recipientName} 
          onChange={(e) => setRecipientName(e.target.value)} 
          required 
        />

        <label htmlFor="subject">Subject:</label>
        <input 
          type="text" 
          id="subject1" 
          name="subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          required 
        />

        {isEditingCustomMessage ? (
          <div>
            <label htmlFor="customMessage">Custom Message:</label>
            <textarea 
              id="customMessage" 
              name="customMessage" 
              rows="5" 
              value={customMessage} 
              onChange={(e) => setCustomMessage(e.target.value)} 
            />
          </div>
        ) : (
          <div className='message2'>
            <label htmlFor="message">Message:</label>
            <textarea 
              id="message4" 
              name="message" 
              rows="6" 
              value={emailTemplate} 
              readOnly 
            />
          </div>
        )}

        <div className="button-container1">
          <button className='generatetemp' onClick={handleGenerateTemplate}>Generate Template</button>
          <button className='isedit' onClick={() => setIsEditingCustomMessage(!isEditingCustomMessage)}>
            {isEditingCustomMessage ? 'Use Template' : 'Edit Message'}
          </button>
          <button className='editsend' onClick={handleSendEmail}>Send</button>
        </div>
      </form>
    </div>
  );
}

export default SendEmail;