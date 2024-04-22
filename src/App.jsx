import { RouteWrapper } from "./router";
 import Reminder from './Reminder.jsx';
import React, { useState } from "react";
import { useEffect } from 'react';


const App = () => {
  
  
  const [reminderMessage, setReminderMessage] = useState("");
  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(storedReminders);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      reminders.forEach((reminder) => {
        if (reminder.triggerTime <= now) {
          showReminder(reminder.message);
          removeReminder(reminder.id);
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders]);
console.log('message is', reminderMessage)
  const showReminder = () => {
    setReminderMessage("Hello, world!");
    
  };
  return (
    <>
      <RouteWrapper />
      <Reminder reminderMessage={reminderMessage} setReminderMessage={setReminderMessage} />
      

      
    </>
  );
};

export default App;
