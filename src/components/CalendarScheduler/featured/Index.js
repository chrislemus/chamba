import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import TimeTableCell from './TimeTableCell';
import Appointments from './Appointments';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';

import ColorLens from '@material-ui/icons/ColorLens';
import { withStyles } from '@material-ui/core/styles';
import { owners, appointments } from '../../../demo-data/task';

const resources = [
  {
    fieldName: 'ownerId',
    title: 'Owners',
    instances: owners,
  },
];

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: 'center', fontWeight: 'bold' }}
  />
);

const styles = (theme) => ({
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

// #FOLD_BLOCK

// const TimeTableCell =

const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(
  ({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <div className={classes.flexContainer}>
        <ColorLens fontSize="large" htmlColor="#FF7043" />
        <Typography variant="h5" style={{ marginLeft: '10px' }}>
          Art School
        </Typography>
      </div>
    </Toolbar.FlexibleSpace>
  )
);

export default function Demo(props) {
  // #FOLD_BLOCK
  const [data, setData] = useState(appointments);

  // #FOLD_BLOCK
  const commitChanges = ({ added, changed, deleted }) => {
    let currentData = data;
    if (added) {
      const startingAddedId =
        currentData.length > 0 ? currentData[currentData.length - 1].id + 1 : 0;
      currentData = [...currentData, { id: startingAddedId, ...added }];
    }
    if (changed) {
      currentData = currentData.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      currentData = currentData.filter(
        (appointment) => appointment.id !== deleted
      );
    }
    setData(currentData);
  };

  return (
    <Paper>
      <Scheduler data={data}>
        <EditingState onCommitChanges={commitChanges} />
        <ViewState defaultCurrentDate="2018-07-17" />

        <MonthView
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />

        <Appointments />
        <Resources data={resources} />

        <Toolbar flexibleSpaceComponent={FlexibleSpace} />
        <DateNavigator />

        <EditRecurrenceMenu />
        <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
        <AppointmentForm />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
}
