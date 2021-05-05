import CalendarScheduler from '../components/CalendarScheduler/basic/Index';
const Overview = () => {
  return (
    <div style={{ marginBottom: '200px' }}>
      <h1 className="title">Overview</h1>
      <div className="info-box">
        <div className="info-box-header">
          <span>Title</span>
        </div>
        <div className="info-box-section">
          <CalendarScheduler />
          {/* <Recurring /> */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
