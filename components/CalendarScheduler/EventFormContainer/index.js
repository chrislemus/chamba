import { useState, useEffect } from 'react';

import CalendarPickers from './CalendarPickers';
import { IconButton, Button } from '@material-ui/core';
import { LocationOn, Notes, Close, Create } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { AppointmentForm as EventForm } from '@devexpress/dx-react-scheduler-material-ui';
import { TextField } from '../../react-hook-form-ui';
import { createEvent, editEvent, deleteEvent } from '../../../services/api';
import AssignCustomer from './AssignCustomer';
import { useQueryClient, useMutation } from 'react-query';
import { useForm, FormProvider } from 'react-hook-form';
import {
  alertModalSuccess,
  alertModalError,
} from '../../../actions/alertModalActions';
import ValidationErrors from '../../../ui/ValidationErrors';
import { useDispatch } from 'react-redux';

const mutationResponseMsgs = {
  create: {
    success: 'event created',
    error: 'unable to create event',
  },
  delete: {
    success: 'event deleted',
    error: 'unable to delete event',
  },
  update: {
    success: 'event updated',
    error: 'unable to save changes',
  },
};

export default function EventFormContainer({
  eventData,
  dispatch: calendarDispatch,
  state,
  target,
  onHide,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isNewEvent = eventData?.id === undefined;
  const queryClient = useQueryClient();
  const reactHookFormMethods = useForm({ shouldUnregister: true });
  const [validationErrors, setValidationErrors] = useState([]);
  const [assignCustomer, setAssignCustomer] = useState(false);
  const { handleSubmit, control, setValue, getValues } = reactHookFormMethods;

  useEffect(() => {
    if (eventData?.customer) setAssignCustomer(true);
  }, []);

  //===========================
  // Mutations
  //===========================

  const visibleChange = () => calendarDispatch(['toggleEditingFormVisibility']);

  const defaultMutationConfig = (type) => ({
    onMutate: async () => await queryClient.cancelQueries('events'),
    onError: (error) => {
      setValidationErrors(error.validationErrors);
      dispatch(alertModalError(mutationResponseMsgs[type].error));
    },
    onSuccess: () => {
      dispatch(alertModalSuccess(mutationResponseMsgs[type].success));
      setValidationErrors([]);
      visibleChange();
      calendarDispatch(['setAddedEvent', {}]);
    },
    onSettled: () => queryClient.invalidateQueries('events'),
  });

  const { mutate: onCreateEvent, status: formStatusCreateEvent } = useMutation(
    createEvent,
    { ...defaultMutationConfig('create') }
  );
  const { mutate: onDeleteEvent, status: formStatusDeleteEvent } = useMutation(
    deleteEvent,
    { ...defaultMutationConfig('delete') }
  );
  const { mutate: onUpdateEvent, status: formStatusUpdateEvent } = useMutation(
    editEvent,
    { ...defaultMutationConfig('update') }
  );
  //================= Mutations end

  const commitEvent = (type) => {
    const event = getValues();
    if (type === 'deleted') {
      onDeleteEvent(eventData?.id);
    } else if (type === 'changed') {
      onUpdateEvent({ eventId: eventData?.id, event });
    } else if (type === 'added') {
      onCreateEvent({ ...event });
    }
  };

  const textEditorProps = (field) => ({
    name: field,
    defaultValue: eventData?.[field],
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  const cancelChanges = () => {
    visibleChange();
    if (state.isNewEvent) {
      calendarDispatch(['cancelNewEventCreation']);
    }
  };

  return (
    <EventForm.Overlay
      visible={state.editingFormVisible}
      target={target}
      id="event-scheduler-form"
      fullSize
      onHide={onHide}
    >
      <div>
        <div className={classes.header}>
          <IconButton className={classes.closeButton} onClick={cancelChanges}>
            <Close color="action" />
          </IconButton>
        </div>
        <FormProvider {...reactHookFormMethods}>
          <form
            onSubmit={handleSubmit(() =>
              commitEvent(isNewEvent ? 'added' : 'changed')
            )}
            className={classes.form}
          >
            <ValidationErrors errors={validationErrors} />
            <div className={classes.content}>
              <div className={classes.wrapper}>
                <Create className={classes.icon} color="action" />
                <TextField
                  {...textEditorProps('title')}
                  rules={{ required: true }}
                />
              </div>
              <div className={classes.wrapper}>
                <CalendarPickers
                  control={control}
                  eventData={eventData}
                  getValues={getValues}
                  setValue={setValue}
                />
              </div>
              <AssignCustomer
                setValue={setValue}
                defaultValue={eventData?.customer}
                classes={classes}
                assignCustomer={assignCustomer}
                setAssignCustomer={(val) => setAssignCustomer(val)}
              />
              <div className={classes.wrapper}>
                <LocationOn className={classes.icon} color="action" />
                <TextField {...textEditorProps('location')} />
              </div>
              <div className={classes.wrapper}>
                <Notes className={classes.icon} color="action" />
                <TextField {...textEditorProps('notes')} multiline rows="6" />
              </div>
            </div>
            <div className={classes.buttonGroup}>
              {!isNewEvent && (
                <Button
                  color="secondary"
                  className={classes.button}
                  onClick={() => commitEvent('deleted')}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                {isNewEvent ? 'Create' : 'Save'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </EventForm.Overlay>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  noIconSpacing: {
    marginLeft: theme.spacing(4),
  },
  textField: {
    width: '100%',
  },
}));
