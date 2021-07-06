import CalendarScheduler from '../../components/CalendarScheduler';
import { Box, Typography } from '@material-ui/core';

const Overview = () => {
  return (
    <div style={{ marginBottom: '200px' }}>
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>Dashboard</strong>
          </Typography>
        </Box>
      </Box>
      <Box bgcolor="white" boxShadow={2} borderRadius={3} py={6} px={3}>
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
          Scheduler
        </Box>

        <div className="info-box-section">
          Coming soon...🙌
          {/* <CalendarScheduler /> */}
        </div>
      </Box>
    </div>
  );
};

export default Overview;
