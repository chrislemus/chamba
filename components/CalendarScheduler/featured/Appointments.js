import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
});

const Appointment = withStyles(styles, {
  name: 'Appointment',
})(({ classes, ...restProps }) => (
  <Appointments.Appointment {...restProps} className={classes.appointment} />
));

const AppointmentContent = withStyles(styles, {
  name: 'AppointmentContent',
})(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
));

export default function AppointmentsWrapper() {
  return (
    <Appointments
      appointmentComponent={Appointment}
      appointmentContentComponent={AppointmentContent}
    />
  );
}
