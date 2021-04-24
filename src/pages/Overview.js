// import React from 'react';
import Cookies from 'js-cookie';

import CalendarScheduler from '../components/CalendarScheduler/basic/Index';
import Recurring from '../components/CalendarScheduler/featured/Index';
const Overview = () => {
  return (
    <div style={{ marginBottom: '200px' }}>
      <h1 className="title">Overview</h1>
      <div className="info-box">
        <div className="info-box-header">
          <span>Title</span>
        </div>
        <div className="info-box-content">
          <CalendarScheduler />
          {/* <Recurring /> */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
