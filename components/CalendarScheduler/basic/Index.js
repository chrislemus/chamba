/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import React, { useState, useEffect } from 'react';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Resources,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  DateNavigator,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { Button } from '@material-ui/core';
import AppointmentFormContainer from './AppointmentFormContainer';
import ConfirmDeleteModal from './ConfirmDeleteModal';
// import { appointments } from '../demo-data/appointments';
import { clients, priorities, appointments } from '../demo-data/task';

const resources = [
  {
    fieldName: 'clientId',
    title: 'Clients',
    instances: clients,
  },
  {
    fieldName: 'priority',
    title: 'Priority',
    instances: priorities,
  },
];

/* eslint-disable-next-line react/no-multi-comp */
const CalendarScheduler = (props) => {
  const [data, setData] = useState(appointments);
  const [currentDate] = useState('2018-06-27');
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
  const [editingAppointment, setEditingAppointment] = useState(undefined);
  const [previousAppointment, setPreviousAppointment] = useState(undefined);
  const [addedAppointment, setAddedAppointment] = useState({});
  const [startDayHour] = useState(9);
  const [endDayHour] = useState(19);
  const [isNewAppointment, setIsNewAppointment] = useState(false);

  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment({ ...editingAppointment });
  };

  const onAddedAppointmentChange = (addedAppointment) => {
    setAddedAppointment({ ...addedAppointment });
    if (editingAppointment !== undefined) {
      setPreviousAppointment({ ...editingAppointment });
    }
    setEditingAppointment({
      editingAppointment: undefined,
      isNewAppointment: true,
    });
  };

  const toggleEditingFormVisibility = () => {
    setEditingFormVisible(!editingFormVisible);
  };

  const toggleConfirmDeleteModal = () => {
    setConfirmDeleteModalIsOpen(!confirmDeleteModalIsOpen);
  };

  const commitDeletedAppointment = () => {
    const nextData = data.filter(
      (appointment) => appointment.id !== deletedAppointmentId
    );
    setDeletedAppointmentId(null);
    setData(nextData);

    toggleConfirmDeleteModal();
  };
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
      setDeletedAppointmentId(deleted);
      toggleConfirmDeleteModal();
    }
    setAddedAppointment({});
    setData(currentData);
  };
  const appointmentForm = connectProps(AppointmentFormContainer, () => {
    const currentAppointment =
      data.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        setEditingAppointment(previousAppointment);
        setIsNewAppointment(false);
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges,
      visibleChange: toggleEditingFormVisibility,
      onEditingAppointmentChange,
      cancelAppointment,
    };
  });

  useEffect(() => {
    appointmentForm.update();
  });

  const FlexibleSpace = ({ ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} style={{ flex: 'none' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setEditingFormVisible(true);
            onEditingAppointmentChange(undefined);
            onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          New Event
        </Button>
      </div>
    </Toolbar.FlexibleSpace>
  );

  return (
    <Scheduler data={data} height={660}>
      <ViewState defaultCurrentViewName="Month" currentDate={currentDate} />
      <EditingState
        onCommitChanges={commitChanges}
        onEditingAppointmentChange={onEditingAppointmentChange}
        onAddedAppointmentChange={onAddedAppointmentChange}
      />
      <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
      <MonthView />
      <AllDayPanel />
      <EditRecurrenceMenu />
      <Appointments />
      <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
      <Toolbar flexibleSpaceComponent={FlexibleSpace} />
      <DateNavigator />
      <ViewSwitcher />
      <AppointmentForm
        // overlayComponent={appointmentForm} *can update view later
        visible={editingFormVisible}
        onVisibilityChange={toggleEditingFormVisibility}
      />
      <DragDropProvider />
      <Resources data={resources} palette="indigo" />
      <ConfirmDeleteModal
        confirmDeleteModalIsOpen={confirmDeleteModalIsOpen}
        toggleConfirmDeleteModal={toggleConfirmDeleteModal}
        commitDeletedAppointment={commitDeletedAppointment}
      />
    </Scheduler>
  );
};

export default CalendarScheduler;
