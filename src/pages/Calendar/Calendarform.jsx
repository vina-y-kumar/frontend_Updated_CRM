import React, { useState } from 'react';
import Modal from 'react-modal';
import axiosInstance from "../../api.jsx";

Modal.setAppElement('#root');

const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1];
  }
  return null;
};

const Calendarform = ({ isOpen, onRequestClose, fetchEvents }) => {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('Calls');
  const [from_time, setStartTime] = useState('19:27');
  const [to_time, setEndTime] = useState('21:30');
  const [date, setDate] = useState('2024-05-09');
  const [color, setColor] = useState('#FFD700');
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [createdBy, setCreatedBy] = useState('7');
  const [participant1, setParticipant1] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let endpoint = '';
      let data = {
        from_time: `${date}T${from_time}:00Z`,
        to_time: `${date}T${to_time}:00Z`,
        description,
        createdBy: parseInt(createdBy),
        tenant: parseInt(getTenantIdFromUrl()),
        color,
      };
  
      switch (eventType) {
        case 'Calls':
          endpoint = '/calls/';
          data.related_to = title; // Use the title for 'related_to'
          break;
        case 'Meetings':
          endpoint = '/meetings/';
          data.title = title;
          if (participant1) data.participants = parseInt(participant1);
          break;
        case 'Tasks':
          endpoint = '/tasks/';
          data.subject = title;
          data.due_date = date;
          break;
        default:
          console.error('Invalid event type:', eventType);
          return;
      }
  
      console.log('Submitting:', data); // Debugging line
  
      await axiosInstance.post(endpoint, data);
  
      fetchEvents(); // Fetch all events after adding a new one
      onRequestClose();
  
      // Reset form fields
      setTitle('');
      setStartTime('19:27');
      setEndTime('21:30');
      setDate('2024-05-09');
      setColor('#FFD700');
      setDescription('');
      setCreatedBy('');
      setParticipant1('');
  
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="form-modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <button onClick={onRequestClose} className="close-button">
          &times;
        </button>
        <h2>Create new Schedule</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Enter the title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the task"
            />
          </label>
          <label>
            Type of Event
            <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option value="Calls">Calls</option>
              <option value="Meetings">Meetings</option>
              <option value="Tasks">Tasks</option>
            </select>
          </label>
          <label>
            Time
            <input
              type="time"
              value={from_time}
              onChange={(e) => setStartTime(e.target.value)}
            />
            To
            <input
              type="time"
              value={to_time}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Event Color
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label>
            Add Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Input text"
            />
          </label>
          <label>
            Created By
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Enter creator's ID"
            />
          </label>
          {eventType === 'Meetings' && (
            <label>
              Participant 1 ID
              <input
                type="text"
                value={participant1}
                onChange={(e) => setParticipant1(e.target.value)}
                placeholder="Enter participant ID"
              />
            </label>
          )}
          <button type="submit">Save and Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default Calendarform;
