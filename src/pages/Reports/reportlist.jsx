import React from 'react';
import './report.css';

const ReportList = ({ title, items }) => {
  return (
    <div className="reports-list">
      <h3>{title}</h3>
      <ul className="reports-list-items">
        {items.map((item, index) => (
          <li key={index} className="reports-list-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;