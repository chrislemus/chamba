/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import React, { useState, useEffect } from 'react';
import { startOfMonth, parseISO } from 'date-fns';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  DateNavigator,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { FlexibleSpace } from './FlexibleSpace';
import AppointmentFormContainer from './AppointmentFormContainer';
import ConfirmDeleteModal from './ConfirmDeleteModal';
// import { appointments } from './demo-data/task';

/* eslint-disable-next-line react/no-multi-comp */
export default function CalendarScheduler(props) {
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(parseISO('2021-07-01'));
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

  const toggleEditingFormVisibility = () => {
    setEditingFormVisible(!editingFormVisible);
  };
  const toggleConfirmDeleteModal = () => {
    setConfirmDeleteModalIsOpen(!confirmDeleteModalIsOpen);
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

  // const { mutate: onSubmit, status: formStatus } = useMutation(
  //   (invoice) => createInvoice({ ...invoice, customerId: customer?.id }),
  //   {
  //     onError: (error) => setValidationErrors(error.validationErrors),
  //     onSuccess: (data) =>
  //       router.push(`/dashboard/invoices/${data?.invoice?.id}`),
  //   }
  // );

  // const { mutate: onSubmit, status: formStatus } = useMutation(
  //   (updatedInvoice) => editInvoice(invoiceId, updatedInvoice),
  //   {
  //     onMutate: async (updatedInvoice) => {
  //       await queryClient.cancelQueries(['invoiceData', { invoiceId }]);
  //       const previousData = queryClient.getQueryData([
  //         'invoiceData',
  //         { invoiceId },
  //       ]);
  //       queryClient.setQueryData(['invoiceData', { invoiceId }], (oldData) => ({
  //         ...oldData,
  //         invoice: updatedInvoice,
  //       }));
  //       return previousData;
  //     },
  //     onError: (error, updatedInvoice, previousData) => {
  //       setValidationErrors(error.validationErrors);
  //       dispatch(alertModalError('unable to save changes'));
  //       return queryClient.setQueryData(
  //         ['invoiceData', { invoiceId }],
  //         previousData
  //       );
  //     },
  //     onSuccess: () => {
  //       dispatch(alertModalSuccess('invoice updated'));
  //       setValidationErrors([]);
  //     },
  //     onSettled: () =>
  //       queryClient.invalidateQueries(['invoiceData', { invoiceId }]),
  //   }
  // );
  // const { mutate: handleDelete } = useMutation(() => deleteInvoice(invoiceId), {
  //   onError: () => dispatch(alertModalError('unable to delete invoice')),
  //   onSuccess: () => {
  //     dispatch(alertModalSuccess('invoice deleted'));
  //     router.push('/dashboard/invoices');
  //   },
  // });

  const newEventBtnClick = () => {
    setEditingFormVisible(true);
    onEditingAppointmentChange(undefined);
    onAddedAppointmentChange({
      startDate: new Date(currentDate).setHours(startDayHour),
      endDate: new Date(currentDate).setHours(startDayHour + 1),
    });
  };

  //const defaultCalendarDate = '2021-07-01';
  console.log(currentDate);
  console.log('start of MONTH', startOfMonth(currentDate));
  return (
    <Scheduler data={data} height={660}>
      <ViewState
        defaultCurrentViewName="Month"
        defaultCurrentDate={currentDate}
        //currentDate={currentDate}
        onCurrentDateChange={(date) => setCurrentDate(date)}
      />
      <EditingState
        onCommitChanges={commitChanges}
        onEditingAppointmentChange={onEditingAppointmentChange}
        onAddedAppointmentChange={onAddedAppointmentChange}
      />
      <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
      <MonthView />
      <AllDayPanel />
      <Appointments />
      <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
      <Toolbar
        flexibleSpaceComponent={({ ...rest }) =>
          FlexibleSpace({ newEventBtnClick, ...rest })
        }
      />
      <DateNavigator />
      <ViewSwitcher />
      <AppointmentForm
        overlayComponent={appointmentForm}
        visible={editingFormVisible}
        onVisibilityChange={toggleEditingFormVisibility}
      />
      <DragDropProvider />
      <ConfirmDeleteModal
        confirmDeleteModalIsOpen={confirmDeleteModalIsOpen}
        toggleConfirmDeleteModal={toggleConfirmDeleteModal}
        commitDeletedAppointment={commitDeletedAppointment}
      />
    </Scheduler>
  );
}

export const appointments = [
  {
    id: 0,
    title: 'Watercolor Landscape',
    startDate: new Date(2021, 6, 23, 9, 30),
    endDate: new Date(2021, 6, 23, 11, 30),
    customerId: 1,
    location: 'Zoom',
    notes: 'Extra descriptive notes',
  },
  {
    id: 1,
    title: 'Monthly Planning',
    startDate: new Date(2021, 5, 28, 9, 30),
    endDate: new Date(2021, 5, 28, 11, 30),
    customerId: 1,
    location: 'Zoom',
    notes: 'Extra descriptive notes',
  },
  {
    id: 2,
    title: 'Recruiting students',
    startDate: new Date(2021, 6, 9, 12, 0),
    endDate: new Date(2021, 6, 9, 13, 0),
    customerId: 2,
    location: 'Zoom',
    notes: 'Extra descriptive notes',
  },
  {
    id: 3,
    title: 'Oil Painting',
    startDate: new Date(2021, 6, 18, 14, 30),
    endDate: new Date(2021, 6, 18, 15, 30),
    customerId: 2,
    location: 'Zoom',
    notes: 'Extra descriptive notes',
  },
  {
    id: 4,
    title: 'Open Day',
    startDate: new Date(2021, 6, 20, 12, 0),
    endDate: new Date(2021, 6, 20, 13, 35),
    customerId: 6,
    location: 'Zoom',
    notes: 'Extra descriptive notes',
  },
  {
    id: 8,
    title: 'Watercolor Workshop',
    startDate: new Date(2021, 6, 9, 11, 0),
    endDate: new Date(2021, 6, 9, 12, 0),
    customerId: 3,
    location: 'Zoom',
    notes: 'Extra descriptive notes',
  },
];
