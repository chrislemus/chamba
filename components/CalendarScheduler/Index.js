/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import React, { useReducer } from 'react';
import { parseISO, startOfWeek, formatISO } from 'date-fns';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { fetchEvents } from '../../services/api';
import { useQuery } from 'react-query';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DateNavigator,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { FlexibleSpace } from './FlexibleSpace';
import EventFormContainer from './EventFormContainer';

const startDayHour = 9;
const endDayHour = 19;

const initialState = {
  currentDate: parseISO('2021-06-01'),
  editingFormVisible: false,
  editingEvent: undefined,
  previousEvent: undefined,
  addedEvent: {},
  isNewEvent: false,
};

function reducer(state, action) {
  const [type, payload] = action;
  switch (type) {
    case 'updateCurrentDate':
      return { ...state, currentDate: payload };
    case 'toggleEditingFormVisibility':
      return { ...state, editingFormVisible: !state.editingFormVisible };
    case 'setEditingEvent':
      return { ...state, editingEvent: payload };
    case 'setAddedEvent':
      return { ...state, addedEvent: payload };
    case 'cancelNewEventCreation':
      return { ...state, editingEvent: state.previousEven, newEvent: false };
    case 'newEventHandler':
      return {
        ...state,
        editingFormVisible: true,
        editingEvent: undefined,
        addedEvent: {
          startDate: new Date(state.currentDate).setHours(startDayHour),
          endDate: new Date(state.currentDate).setHours(startDayHour + 1),
        },
      };
    case 'onAddedEventChange':
      return {
        ...state,
        addedEvent: payload,
        previousEvent:
          state.editingEvent !== undefined
            ? { ...state.editingEvent }
            : state.previousEvent,
        editingEvent: {
          editingEvent: undefined,
          isNewEvent: true,
        },
      };
    default:
      throw new Error();
  }
}

/* eslint-disable-next-line react/no-multi-comp */
export default function CalendarScheduler() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchEventsReqBody = {
    date: formatISO(startOfWeek(state.currentDate)),
    days: 45,
  };
  const { data } = useQuery(['events', fetchEventsReqBody], () =>
    fetchEvents(fetchEventsReqBody)
  );
  const events = data?.events;
  const newEventHandler = () => dispatch(['newEventHandler']);

  const onEditingEventChange = (editingEvent) => {
    dispatch(['setEditingEvent', { ...editingEvent }]);
  };
  const eventForm = connectProps(EventFormContainer, () => {
    const { editingEvent, addedEvent } = state;
    const eventData = editingEvent
      ? events?.find(({ id }) => id === editingEvent.id)
      : addedEvent;
    return { eventData, dispatch, state };
  });

  return (
    <Scheduler data={events || []} height={660}>
      <ViewState
        defaultCurrentViewName="Month"
        defaultCurrentDate={state.currentDate}
        onCurrentDateChange={(date) => dispatch(['updateCurrentDate', date])}
      />
      <EditingState
        onEditingAppointmentChange={onEditingEventChange}
        onAddedAppointmentChange={(addedEvent) =>
          dispatch(['onAddedEventChange', addedEvent])
        }
      />
      <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
      <MonthView />
      <AllDayPanel />
      <Appointments />
      <AppointmentTooltip showOpenButton showCloseButton />
      <Toolbar
        flexibleSpaceComponent={({ ...rest }) =>
          FlexibleSpace({ newEventHandler, ...rest })
        }
      />
      <DateNavigator />
      <ViewSwitcher />
      <AppointmentForm
        overlayComponent={eventForm}
        visible={state.editingFormVisible}
        onVisibilityChange={() => dispatch(['toggleEditingFormVisibility'])}
      />
    </Scheduler>
  );
}
