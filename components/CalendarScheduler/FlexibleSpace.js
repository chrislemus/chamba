import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { Button } from '@material-ui/core';

export const FlexibleSpace = ({ newEventHandler, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} style={{ flex: 'none' }}>
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
    >
      <Button color="primary" variant="contained" onClick={newEventHandler}>
        New Event
      </Button>
    </div>
  </Toolbar.FlexibleSpace>
);
