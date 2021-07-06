import { useState, useEffect } from 'react';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import {
  IconButton,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import { useQuery } from 'react-query';
import { fetchCustomers } from '../../services/api';

export default function AppointmentFormContainer(props) {
  const classes = useStyles();
  const {
    visible,
    visibleChange,
    appointmentData,
    cancelAppointment,
    target,
    onHide,
  } = props;
  const [assignCustomer, setAssignCustomer] = useState(false);
  const [showCustomerLookupDropdown, setShowCustomerLookupDropdown] =
    useState(false);
  const [customerNameQuery, setCustomerNameQuery] = useState('');
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const getAppointmentData = () => props.appointmentData;
  const displayAppointmentData = { ...appointmentData, ...appointmentChanges };
  const isNewAppointment = appointmentData.id === undefined;

  const changeAppointment = ({ field, changes }) => {
    const nextChanges = { ...appointmentChanges, [field]: changes };
    setAppointmentChanges(nextChanges);
  };

  const commitAppointment = (type) => {
    const { commitChanges } = props;
    const appointment = { ...getAppointmentData(), ...appointmentChanges };
    const commit = {};
    if (type === 'deleted') {
      commit[type] = appointment.id;
    } else if (type === 'changed') {
      commit[type] = { [appointment.id]: appointment };
    } else {
      commit[type] = appointment;
    }
    commitChanges(commit);
    setAppointmentChanges({});
  };

  const applyChanges = isNewAppointment
    ? () => commitAppointment('added')
    : () => commitAppointment('changed');

  const textEditorProps = (field) => ({
    variant: 'outlined',
    onChange: ({ target: change }) =>
      changeAppointment({
        field,
        changes: change.value,
      }),
    value: displayAppointmentData[field] || '',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  const pickerEditorProps = (field) => ({
    className: classes.picker,
    // keyboard: true,
    ampm: false,
    value: displayAppointmentData[field],
    onChange: (date) =>
      changeAppointment({
        field: [field],
        changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
    inputVariant: 'outlined',
    format: 'MM/DD/YYYY HH:mm',
    onError: () => null,
  });

  const cancelChanges = () => {
    setAppointmentChanges({});
    visibleChange();
    cancelAppointment();
  };

  const toggleAssignCustomer = (e) => {
    if (assignCustomer) {
      //remove Customer if switch is off
      const changes = appointmentChanges;
      delete changes?.customer;
      setAppointmentChanges(changes);
    }
    setAssignCustomer(e.target.checked);
  };

  const { data: customersQueryResults, isLoading } = useQuery(
    ['customers', { query: customerNameQuery }],
    () => fetchCustomers(customerNameQuery)
  );
  useEffect(() => {
    const customerId = parseInt(appointmentData?.customer?.id);
    if (customerId) setAssignCustomer(true);
  }, [appointmentData]);

  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={target}
      id="appointment-scheduler-form"
      fullSize
      onHide={onHide}
    >
      <div>
        <div className={classes.header}>
          <IconButton className={classes.closeButton} onClick={cancelChanges}>
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField {...textEditorProps('title')} />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDateTimePicker
                label="Start Date"
                {...pickerEditorProps('startDate')}
              />
              <KeyboardDateTimePicker
                label="End Date"
                {...pickerEditorProps('endDate')}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.wrapper}>
            <FormControlLabel
              className={classes.noIconSpacing}
              control={
                <Switch
                  checked={assignCustomer}
                  onChange={toggleAssignCustomer}
                  name="assign-customer-switch"
                />
              }
              label="Assign customer"
            />
          </div>
          {assignCustomer && (
            <div className={classes.wrapper}>
              <PersonIcon className={classes.icon} color="action" />
              <Autocomplete
                className={classes.textField}
                onChange={(_0, customer) =>
                  changeAppointment({
                    field: 'customer',
                    changes: customer,
                  })
                }
                open={showCustomerLookupDropdown}
                onOpen={() => setShowCustomerLookupDropdown(true)}
                forcePopupIcon={false}
                onClose={() => setShowCustomerLookupDropdown(false)}
                getOptionSelected={(option, value) => option.id === value.id}
                disableClearable
                options={customersQueryResults?.customers || []}
                getOptionLabel={(customer) => customer.fullName}
                loading={isLoading}
                value={displayAppointmentData?.customer || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e) => setCustomerNameQuery(e.target.value)}
                    // error={invalidCustomerSelect}
                    // inputRef={CustomerInputRef}
                    label="Customer"
                    variant="outlined"
                    InputProps={{ ...params.InputProps }}
                  />
                )}
              />
            </div>
          )}
          {/* <div className={classes.wrapper}>
              <PersonIcon className={classes.icon} color="action" />
              <TextField {...textEditorProps('Customer')} />
            </div> */}
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
          {!isNewAppointment && (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                commitAppointment('deleted');
              }}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange();
              applyChanges();
            }}
          >
            {isNewAppointment ? 'Create' : 'Save'}
          </Button>
        </div>
      </div>
    </AppointmentForm.Overlay>
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
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
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
