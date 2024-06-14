import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'; // Custom styles
import { NavLink, Link } from "react-router-dom";
import TopNavbar from "../TopNavbar/TopNavbar.jsx"; // Adjust the import path

const getTenantIdFromUrl = () => {
  const pathArray = window.location.pathname.split('/');
  if (pathArray.length >= 2) {
    return pathArray[1];
  }
  return null;
};

const localizer = momentLocalizer(moment);

const myEventsList = [
  { title: 'New Leads', start: new Date(2024, 2, 2, 8, 0), end: new Date(2024, 2, 2, 9, 0), color: '#ffcc99' },
  { title: 'Call New Client', start: new Date(2024, 2, 2, 13, 0), end: new Date(2024, 2, 2, 14, 0), color: '#99ccff' },
  { title: 'Schedule presentation', start: new Date(2024, 2, 9, 13, 0), end: new Date(2024, 2, 9, 14, 0), color: '#ffcc00' },
  { title: 'Meeting with Alan', start: new Date(2024, 2, 11, 13, 0), end: new Date(2024, 2, 11, 14, 0), color: '#ff99cc' },
  { title: 'Client Meeting', start: new Date(2024, 2, 17, 13, 0), end: new Date(2024, 2, 17, 14, 0), color: '#66ccff' },
  { title: 'Weekly Meeting', start: new Date(2024, 2, 19, 16, 0), end: new Date(2024, 2, 19, 17, 0), color: '#cc99ff' },
  { title: 'Creative Workshop', start: new Date(2024, 2, 20, 21, 0), end: new Date(2024, 2, 20, 22, 0), color: '#66ccff' },
  { title: 'Create the report', start: new Date(2024, 2, 23, 21, 0), end: new Date(2024, 2, 23, 22, 0), color: '#ff9966' },
  { title: 'Creative Workshop', start: new Date(2024, 2, 26, 21, 0), end: new Date(2024, 2, 26, 22, 0), color: '#66ccff' },
];

const CustomEvent = ({ event }) => (
  <span style={{ backgroundColor: event.color, padding: '2px 5px', borderRadius: '3px', color: 'white' }}>
    {event.title}
  </span>
);

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
      <span className="rbc-btn-group">
        <button type="button" onClick={() => toolbar.onView('day')}>Day</button>
        <button type="button" onClick={() => toolbar.onView('week')}>Week</button>
        <button type="button" onClick={() => toolbar.onView('month')}>Month</button>
      </span>
    </div>
  );
};

const CalendarComponent = () => {
  const tenantId = getTenantIdFromUrl();

  return (
    <div className='calendar-page'>
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
            <NavLink to={`/${tenantId}/calendarform`} id="btn1"> +Create New</NavLink>
          </div>
        </div>
        <div className='calendar-container'>
          <Calendar
            localizer={localizer}
            events={myEventsList}
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

export default CalendarComponent;
