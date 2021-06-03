// import CalendarScheduler from '../components/CalendarScheduler/basic/Index';
import { useState } from 'react';
const Overview = () => {
  const [charLimit, setCharLimit] = useState(0);
  return (
    <div style={{ marginBottom: '200px' }}>
      <h1 className="title">Overview</h1>
      <div className="info-box">
        <div className="info-box-header">
          <span>Scheduler</span>
        </div>

        <div className="info-box-section">
          Coming soon...🙌
          {/* <CalendarScheduler /> */}
          {/* <Recurring /> */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
