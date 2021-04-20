import React from 'react';

import CalendarScheduler from '../components//CalendarScheduler/Index';

const Overview = () => {
  return (
    <div style={{ marginBottom: '200px' }}>
      <h1>Overview</h1>
      <div className="info-box">
        <div className="info-box-header">
          <span>Title</span>
        </div>
        <div className="info-box-content">
          <CalendarScheduler />
        </div>
      </div>
    </div>
  );
};

export default Overview;
