import React, { useState } from 'react';
import { Paper, Button } from '@material-ui/core';
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

import { clients, appointments } from '../../../demo-data/task';

const resources = [
  {
    fieldName: 'clientId',
    title: 'Clients',
    instances: clients,
  },
];

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: 'center', fontWeight: 'bold' }}
  />
);

export default function Demo(props) {
  // #FOLD_BLOCK
  const [data, setData] = useState(appointments);
  const [eventFormIsOpen, setEventFormIsOpen] = useState(false);
  // const [editingAppointment, setEditingAppointment] = useState(undefined);

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

  const toggleEventForm = () => {
    setEventFormIsOpen(!eventFormIsOpen);
  };

  const FlexibleSpace = ({ ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} style={{ flex: 'none' }}>
      {console.log({ ...restProps })}
      <div
        style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
      >
        <Button variant="contained" color="primary" onClick={toggleEventForm}>
          New Event
        </Button>
      </div>
    </Toolbar.FlexibleSpace>
  );
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

        <Toolbar
          toggleEventForm={toggleEventForm}
          flexibleSpaceComponent={FlexibleSpace}
        />
        <DateNavigator />

        <EditRecurrenceMenu />
        <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
        <AppointmentForm
        // overlayComponent={appointmentForm}
        // appointmentData={editingAppointment}
        // visible={eventFormIsOpen}
        // onVisibilityChange={toggleEditingFormVisibility}
        />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
}
