import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'; // Assuming you have your CSS file imported here
import { Link } from 'react-router-dom';
import TopNavbar from '../TopNavbar/TopNavbar.jsx';
import Calendarform from './Calendarform.jsx';
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from "../../api";
import CustomEvent from './CustomEvent';

const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1];
  }
  return null;
};

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const tenantId = getTenantIdFromUrl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = async (eventType) => {
    try {
      let endpoint = '';
      switch (eventType) {
        case 'Calls':
          endpoint = '/calls/';
          break;
        case 'Meetings':
          endpoint = '/meetings/';
          break;
        case 'Tasks':
          endpoint = '/tasks/';
          break;
        default:
          console.error('Invalid event type:', eventType);
          return;
      }
  
      const response = await axiosInstance.get(endpoint);
  
      const formattedEvents = response.data.map(event => ({
        id: event.id,
        title: eventType === 'Calls' ? (event.title || `Call ${event.id}`) : (eventType === 'Meetings' ? (event.subject || `Meeting ${event.id}`) : (event.subject || `Task ${event.id}`)),
        start: new Date(event.start_time || event.due_date),
        end: new Date(event.to_time || event.due_date),
        color: event.color || '#FFD700',
      }));
  
      setEvents(prevEvents => [...prevEvents, ...formattedEvents]);
    } catch (error) {
      console.error(`Error fetching ${eventType.toLowerCase()}:`, error);
    }
  };

  useEffect(() => {
    fetchEvents('Calls');
    fetchEvents('Meetings');
    fetchEvents('Tasks'); // Fetch tasks when component mounts
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={`calendar-page ${modalIsOpen ? 'blur' : ''}`}>
      <div className='calendar-side'>
        <Link to={`/${tenantId}/callpage`} id='back-inter-task' className='back-button'>
          Back
        </Link>
      </div>
      <div className='calendar-content'>
        <div className="calendar-nav">
          <TopNavbar />
        </div>
        <div className='calendar-header'>
          <div className='calendar-title'>
            <h1>Calendar</h1>
          </div>
          <div className="create-calendar">
            <button id="btn1" onClick={openModal}>+ Create New</button>
            <Calendarform isOpen={modalIsOpen} onRequestClose={closeModal} fetchEvents={fetchEvents} />
          </div>
        </div>
        <div className='calendar-container'>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '80vh', margin: '20px' }}
            components={{
              event: CustomEvent,
              toolbar: CustomToolbar
            }}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={Views.MONTH}
          />
        </div>
      </div>
    </div>
  );
};

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
    toolbar.onNavigate('prev', newDate);
  };

  const goToNext = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
    toolbar.onNavigate('next', newDate);
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        <b>{date.format('MMMM')}</b>
        <span> {date.format('YYYY')}</span>
      </span>
    );
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={toolbar.onToday}>Today</button>
        <button type="button" onClick={goToBack}>Back</button>
        <span className="rbc-toolbar-label">{label()}</span>
        <button type="button" onClick={goToNext}>Next</button>
      </span>
      <span className="rbc-btn-group1">
        <button className="rbc-btn-group2" type="button" onClick={() => toolbar.onView('day')}>Day</button>
        <button className="rbc-btn-group2" type="button" onClick={() => toolbar.onView('week')}>Week</button>
        <button className="rbc-btn-group2" type="button" onClick={() => toolbar.onView('month')}>Month</button>
      </span>
      <div className="rbc-toolbar-search">
        <SearchIcon className="search-icon" style={{ width: '24px', height: '24px' }} />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default CalendarComponent;
