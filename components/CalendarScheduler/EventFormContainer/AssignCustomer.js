import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from 'react-query';
import { fetchCustomers } from '../../../services/api';
import {
  TextField as MuiTextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

export default function AssignCustomer({
  setValue,
  defaultValue,
  assignCustomer,
  setAssignCustomer,
}) {
  const classes = useStyles();
  const [customerNameQuery, setCustomerNameQuery] = useState('');
  const [customersDropdownIsOpen, setCustomersDropdownIsOpen] = useState(false);

  const toggleAssignCustomer = (e) => {
    if (assignCustomer) setValue('customerId', null);
    setAssignCustomer(e.target.checked);
  };

  const onChangeHandler = (_0, customer) => {
    setValue('customerId', customer?.id);
  };

  const { data, isLoading } = useQuery(
    ['customers', { query: customerNameQuery }],
    () => fetchCustomers(customerNameQuery)
  );

  return (
    <>
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
            onChange={onChangeHandler}
            open={customersDropdownIsOpen}
            onOpen={() => setCustomersDropdownIsOpen(true)}
            forcePopupIcon={false}
            onClose={() => setCustomersDropdownIsOpen(false)}
            getOptionSelected={(option, value) => option.id === value.id}
            disableClearable
            options={data?.customers || []}
            getOptionLabel={(customer) => customer.fullName}
            loading={isLoading}
            defaultValue={defaultValue}
            renderInput={(params) => (
              <MuiTextField
                {...params}
                onChange={(e) => setCustomerNameQuery(e.target.value)}
                label="Customer"
                variant="outlined"
                InputProps={{ ...params.InputProps }}
              />
            )}
          />
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
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
