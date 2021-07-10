import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { isAfter } from 'date-fns';
import MomentUtils from '@date-io/moment';
import { CalendarToday } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';

export default function CalendarPickers({
  control,
  eventData,
  getValues,
  setValue,
}) {
  const classes = useStyles();

  const getDefaultValue = (fieldName) =>
    eventData?.[fieldName] && new Date(eventData[fieldName]);

  const datePickerProps = {
    className: classes.picker,
    ampm: false,
    inputVariant: 'outlined',
    format: 'MM/DD/YYYY HH:mm',
    onError: () => null,
  };

  const endDateValidator = (fieldValue) => {
    const startDate = getValues('startDate');
    return isAfter(fieldValue, startDate);
  };

  return (
    <>
      <CalendarToday className={classes.icon} color="action" />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Controller
          control={control}
          name={'startDate'}
          defaultValue={getDefaultValue('startDate')}
          render={({ field: { onChange, value } }) => (
            <KeyboardDateTimePicker
              label={'Start Date'}
              value={value}
              onChange={(momentJsDate) => {
                let startDate = momentJsDate.toDate();
                const endDate = momentJsDate.toDate();
                endDate.setHours(startDate.getHours() + 1);
                onChange(startDate);
                //endDateTime changes when startDate is updated for better UX
                setValue('endDate', endDate);
              }}
              {...datePickerProps}
            />
          )}
        />
        <Controller
          control={control}
          name={'endDate'}
          defaultValue={getDefaultValue('endDate')}
          rules={{
            validate: {
              endDate: endDateValidator,
            },
          }}
          render={({ field: { onChange, value }, fieldState: { invalid } }) => (
            <KeyboardDateTimePicker
              label={'End Date'}
              value={value}
              error={invalid}
              helperText={invalid && 'End Date must be AFTER Start Date'}
              onChange={(date) => onChange(date.toDate())}
              {...datePickerProps}
            />
          )}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
}));
